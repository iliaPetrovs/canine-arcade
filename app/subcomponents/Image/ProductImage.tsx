import styles from './ProductImage.module.css';

type ProductImageProps = {
  altText?: string;
  href: string;
};
const ProductImage = ({altText, href}: ProductImageProps) => {
  return (
    <div className={styles.wrapper}>
      <img alt={altText} src={href} />
    </div>
  );
};

export default ProductImage;
