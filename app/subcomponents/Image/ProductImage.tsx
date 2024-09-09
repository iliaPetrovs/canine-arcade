import {useState} from 'react';
import styles from './ProductImage.module.css';
import classNames from 'classnames';

type ProductImageProps = {
  altText?: string;
  href: string;
};
const ProductImage = ({altText, href}: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        {isLoading && <div className={styles.skeletonImage} />}
        <img
          alt={altText}
          src={href}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={classNames({[styles.imageLoading]: isLoading})}
        />
      </div>
    </div>
  );
};

export default ProductImage;
