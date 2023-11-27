import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Canine Arcade`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {collection} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!collection) {
    throw new Response('Not Found', {status: 404});
  }

  return collection;
}

export default function Page() {
  const {
    products: {edges},
  } = useLoaderData<typeof loader>();

  return (
    <div className="page">
      <header>
        <h1>Hello</h1>
      </header>
      <main>
        {edges.map(({node}) => (
          <div>{node.title}</div>
        ))}
      </main>
    </div>
  );
}

const PAGE_QUERY = `#graphql
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
