import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import Section from '~/components/Section';
import Fursuits from '~/subcomponents/Fursuits/Fursuits';
import BubbleTitle from '~/subcomponents/BubbleTitle/BubbleTitle';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Canine Arcade | ${data?.collection.title ?? ''} Collection`},
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle: 'fursuits', ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Fursuits not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <Section bg="light" isHero={true}>
      <div className="page m-t-5">
        <header className="m-b-5">
          <BubbleTitle title="Fursuit Gallery" />
          {/* <p className="body-copy-1 btm-5">{collection.description}</p> */}
        </header>
        <Pagination connection={collection.products}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <>
              <PreviousLink>
                {isLoading ? (
                  'Loading...'
                ) : (
                  <span className="load-more">↑ Load previous</span>
                )}
              </PreviousLink>
              <Fursuits fursuits={nodes} />
              <br />
              <NextLink>
                {isLoading ? (
                  'Loading...'
                ) : (
                  <span className="load-more">Load more ↓</span>
                )}
              </NextLink>
            </>
          )}
        </Pagination>
      </div>
    </Section>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    id
    handle
    title
    description
    featuredImage {
      id
      altText
      url
      width
      height
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
