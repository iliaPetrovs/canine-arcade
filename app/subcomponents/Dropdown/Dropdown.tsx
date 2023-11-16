import {Menu, Transition} from '@headlessui/react';

import styles from './Dropdown.module.css';
import classNames from 'classnames';
import type {Maybe} from '@shopify/hydrogen-react/storefront-api-types';
import {BiCaretDown, BiCaretUp} from 'react-icons/bi';

type DropdownItem = {
  id: string;
  resourceId?: Maybe<string> | undefined;
  tags?: string[];
  title: string;
  type: string;
  url?: Maybe<string> | undefined;
  items: Omit<DropdownItem, 'items'>[];
};

type DropdownProps = {
  item: DropdownItem;
  publicStoreDomain: string;
  primaryDomainUrl: string;
};

const Dropdown = ({
  item,
  publicStoreDomain,
  primaryDomainUrl,
}: DropdownProps) => {
  return (
    <Menu key={item.id}>
      {({open}) => (
        <div
          className={classNames(styles.dropdownContainer, {
            [styles.active]: open,
          })}
        >
          <Menu.Button className={classNames(styles.dropdownButton)}>
            <span className={styles.dropdownTitle}>
              {item.title} {open ? <BiCaretUp /> : <BiCaretDown />}
            </span>
          </Menu.Button>
          <Transition
            className={styles.absolute}
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <Menu.Items className={classNames(styles.headerItemDropdown)}>
              {item.items.map((subItem) => {
                if (!item.url) return null;

                // if the url is internal, we strip the domain
                const url =
                  item.url.includes('myshopify.com') ||
                  item.url.includes(publicStoreDomain) ||
                  item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;
                return (
                  <Menu.Item key={subItem.id}>
                    {({active}) => (
                      <a
                        className={classNames(styles.dropdownItem, {
                          [styles.active]: active,
                        })}
                        href={url}
                      >
                        {subItem.title}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default Dropdown;
