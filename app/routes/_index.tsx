import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import EmblaCarousel from '~/subcomponents/Carousel/Carousel';
import type {EmblaOptionsType} from 'embla-carousel-react';
import ProductPanel from '~/subcomponents/ProductPanel/ProductPanel';
import Card from '~/subcomponents/Card/Card';
import Footer from '~/components/Footer';
import 'flexboxgrid/css/flexboxgrid.min.css';
import Section from '~/components/Section';

export const meta: MetaFunction = () => {
  return [{title: 'Canine Arcade'}, {description: 'Cute fings'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const {collection} = await storefront.query(HOMEPAGE_FEATURED);
  const homepageCollection = collection.products;

  return defer({featuredCollection, homepageCollection});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="home">
      <RecommendedProducts products={data.homepageCollection} />
    </div>
  );
}

const OPTIONS: EmblaOptionsType = {skipSnaps: true};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

function RecommendedProducts({products}: {products: any}) {
  return (
    <div className="recommended-products">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <Section>
        <h2 className="header-1">Featured</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(products) => (
              <div className="row text-center">
                {products.edges.map(({node: product}: any) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </Section>
      <ProductPanel />
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;

const HOMEPAGE_FEATURED = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "Featured") {
      products(first: 4) {
        edges {
          node {
            ...RecommendedProduct
          }
        }
      }
    }
  }
` as const;
