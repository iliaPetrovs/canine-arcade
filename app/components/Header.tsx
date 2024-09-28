import {Await, NavLink} from '@remix-run/react';
import React, {Suspense} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import styles from './Header.module.css';
import classNames from 'classnames';
import Dropdown from '~/subcomponents/Dropdown/Dropdown';
import banner from './img/banner.png';
import {CiShoppingCart, CiSearch, CiGlass} from 'react-icons/ci';
import {IoCloseOutline} from 'react-icons/io5';
import {GiHamburgerMenu} from 'react-icons/gi';
import Banner from './Banner';
import Cart from '~/routes/cart';
import type {MenuItem} from '@shopify/hydrogen/storefront-api-types';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const {publicStoreDomain} = useRootLoaderData();
  const mobileNavContentRef = React.useRef<HTMLDivElement>(null);
  const cartContentRef = React.useRef<HTMLDivElement>(null);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((cur) => !cur);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((cur) => !cur);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  React.useEffect(() => {
    if (isMobileNavOpen || isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMobileNavOpen, isCartOpen]);

  const fursuitMenu = {
    id: 'gid://shopify/MenuItem/461609500728',
    resourceId: null,
    tags: [],
    title: 'Fursuits',
    type: 'HTTP',
    url: '/fursuits',
    items: [
      {
        id: 'fursuit-pricing',
        resourceId: null,
        tags: [],
        title: 'Pricing',
        type: 'HTTP',
        url: '/pricing',
        items: [],
      },
      {
        id: 'fursuit-gallery',
        resourceId: null,
        tags: [],
        title: 'Gallery',
        type: 'HTTP',
        url: '/fursuits',
        items: [],
      },
      {
        id: 'fursuit-gallery',
        resourceId: null,
        tags: [],
        title: 'Terms',
        type: 'HTTP',
        url: '/fursuit-terms',
        items: [],
      },
    ],
  };
  const primaryDomainUrl = header.shop.primaryDomain.url;

  const newMenu = {
    ...menu,
    items: [...(menu?.items || []), fursuitMenu],
  };

  return (
    <>
      <Banner />
      <header className={classNames('header', styles.header)}>
        {/* <div className={styles.daddyStripe}>
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
          <div className={styles.stripe} />
        </div> */}
        <NavLink
          className={styles.headerLogo}
          prefetch="intent"
          to="/"
          style={activeLinkStyle}
          end
        >
          <img
            className={styles.banner}
            src={banner}
            alt="Hyena cartoon holding a sewing needle with a thread coming out, underlining the words 'Canine Arcade'"
          />
        </NavLink>
        <div className={styles.navbar}>
          <HeaderMenu
            menu={newMenu}
            viewport="desktop"
            primaryDomainUrl={primaryDomainUrl}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
        <div className={styles.cartDesktop}>
          <CartToggle toggleCart={toggleCart} cart={cart} />
        </div>
        <div className={classNames(styles.navbar, styles.headerCta)}>
          <HeaderCtas
            isLoggedIn={isLoggedIn}
            cart={cart}
            toggleOpen={toggleMobileNav}
            toggleCart={toggleCart}
          />
        </div>
        <MobileNav
          isMobileNavOpen={isMobileNavOpen}
          toggleMobileNav={toggleMobileNav}
          mobileNavContentRef={mobileNavContentRef}
          closeMobileNav={closeMobileNav}
          newMenu={newMenu}
          publicStoreDomain={publicStoreDomain}
          primaryDomainUrl={primaryDomainUrl}
        />
        <HeaderCart
          cartContentRef={cartContentRef}
          closeCart={closeCart}
          isCartOpen={isCartOpen}
        />
      </header>
    </>
  );
}

function MobileNav({
  isMobileNavOpen,
  toggleMobileNav,
  mobileNavContentRef,
  closeMobileNav,
  newMenu,
  publicStoreDomain,
  primaryDomainUrl,
}: {
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  mobileNavContentRef: React.RefObject<HTMLDivElement>;
  closeMobileNav: () => void;
  newMenu: HeaderProps['header']['menu'];
  publicStoreDomain: string;
  primaryDomainUrl: string;
}) {
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 967) {
        closeMobileNav();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavContentRef.current &&
        !mobileNavContentRef.current.contains(event.target as Node)
      ) {
        closeMobileNav();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames(styles.mobileNav, {
        [styles.open]: isMobileNavOpen,
      })}
    >
      <div ref={mobileNavContentRef} className={styles.mobileNavContent}>
        <div className={styles.mobileNavContentWrapper}>
          <div className={styles.invisibleBlock} />
          <button
            className={classNames(styles.mobileNavHamburger, {
              [styles.open]: !isMobileNavOpen,
            })}
            onClick={toggleMobileNav}
          >
            <IoCloseOutline />
          </button>
          {/* Add your mobile navigation links here */}
          <nav className={styles.mobileNavLinksWrapper}>
            <NavLink end prefetch="intent" style={activeLinkStyle} to="/">
              Home
            </NavLink>
            {(newMenu || FALLBACK_HEADER_MENU).items.map((item) => {
              if (!item.url) return null;

              // if the url is internal, we strip the domain
              const url =
                item.url.includes('myshopify.com') ||
                item.url.includes(publicStoreDomain) ||
                item.url.includes(primaryDomainUrl)
                  ? new URL(item.url).pathname
                  : item.url;
              return !item.items.length ? (
                <NavLink
                  className={styles.mobileNavLink}
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to={url}
                  onClick={closeMobileNav}
                >
                  {item.title}
                </NavLink>
              ) : (
                <Dropdown
                  item={item}
                  publicStoreDomain={publicStoreDomain}
                  primaryDomainUrl={primaryDomainUrl}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

function HeaderCart({
  isCartOpen,
  closeCart,
  cartContentRef,
}: {
  isCartOpen: boolean;
  closeCart: () => void;
  cartContentRef: React.RefObject<HTMLDivElement>;
}) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartContentRef.current &&
        !cartContentRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames(styles.cart, {
        [styles.open]: isCartOpen,
      })}
    >
      <div ref={cartContentRef} className={styles.cartContent}>
        <div className={styles.cartContentWrapper}>
          <button
            className={classNames(styles.cartButton, {
              [styles.open]: !isCartOpen,
            })}
            onClick={closeCart}
          >
            <IoCloseOutline />
          </button>
          <Cart />
        </div>
      </div>
    </div>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: string;
}) {
  const className = `header-menu-${viewport}`;

  return (
    <nav
      className={classNames(className, styles.navbarProduct)}
      role="navigation"
    >
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return !item.items.length ? (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        ) : (
          <Dropdown
            item={item}
            publicStoreDomain={publicStoreDomain}
            primaryDomainUrl={primaryDomainUrl}
          />
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
  toggleOpen,
  toggleCart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'> & {
  toggleOpen?: () => void;
  toggleCart?: () => void;
}) {
  return (
    <nav className={styles.headerCtas} role="navigation">
      {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink> */}
      {/* <SearchToggle /> */}
      <CartToggle toggleCart={toggleCart} cart={cart} />
      <button onClick={toggleOpen} className={styles.mobileNavHamburgerClosed}>
        <GiHamburgerMenu />
      </button>
    </nav>
  );
}

function SearchToggle() {
  return (
    <a className="header-search" href="#search-aside">
      <CiSearch />
    </a>
  );
}

function CartBadge({
  count,
  toggleCart,
}: {
  count: number;
  toggleCart?: () => void;
}) {
  return (
    <button onClick={toggleCart} className={styles.toggleCartButton}>
      <CiShoppingCart /> <span className="cart-count">{count}</span>
    </button>
  );
}

function CartToggle({
  cart,
  toggleCart,
}: Pick<HeaderProps, 'cart'> & {toggleCart?: () => void}) {
  return (
    <Suspense fallback={<CartBadge toggleCart={toggleCart} count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge toggleCart={toggleCart} count={0} />;
          return (
            <CartBadge
              toggleCart={toggleCart}
              count={cart.totalQuantity || 0}
            />
          );
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
