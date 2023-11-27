import {Link} from '@remix-run/react';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';
import ProductImage from '../Image/ProductImage';
import {Money} from '@shopify/hydrogen-react';

import styles from './Card.module.css';

type CardProps = {
  product: Product;
};

const Card = ({product}: CardProps) => {
  return (
    <Link
      key={product.id}
      className={styles.product}
      to={`/products/${product.handle}`}
    >
      <ProductImage
        altText={product.images.nodes[0].altText || 'Product'}
        href={product.images.nodes[0].url}
      />
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
};

export default Card;
