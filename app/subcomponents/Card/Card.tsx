import {Link} from '@remix-run/react';
import ProductImage from '../Image/ProductImage';
import {Money} from '@shopify/hydrogen-react';

import styles from './Card.module.css';
import classNames from 'classnames';

type CardProps = {
  product: any;
};

const Card = ({product}: CardProps) => {
  return (
    <Link
      key={product.id}
      className={classNames('col-xs-6 col-lg-3 m-b-3', styles.product)}
      to={`/products/${product.handle}`}
      prefetch="intent"
    >
      <ProductImage
        altText={
          (product.featuredImage || product.images.nodes[0]).altText ||
          'Product'
        }
        href={
          (
            product?.featuredImage ||
            product.featuredImage ||
            product.images.nodes[0]
          )?.url
        }
      />
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
};

export default Card;
