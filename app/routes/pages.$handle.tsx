import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import Card from '~/subcomponents/Card/Card';
import Line from '~/subcomponents/Line/Line';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Canine Arcade`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {collection} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  const {collection: page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!collection) {
    throw new Response('Not Found', {status: 404});
  }

  return {collection, page};
}

export default function Page() {
  const {
    collection: {
      products: {edges},
    },
    page,
  } = useLoaderData<typeof loader>();

  return (
    <div className="page">
      <header>
        <h1 className="header-1">{page.title}</h1>
        <p className="body-copy-1">{page.description}</p>
      </header>
      <Line />
      <div className="row text-center">
        {edges.map(({node}) => (
          <Card key={node.title} product={node} />
        ))}
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
query Products ($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
  collection(handle: "Clothing") {
    products(first: 20) {
      edges {
        node {
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
      }
    }
  }
}
` as const;

const PAGE_QUERY = `#graphql
query Collection($handle: String!) {
  collection(handle: $handle) {
    description
    id
    image {
      altText
      url
    }
    title
  }
}
  ` as const;
