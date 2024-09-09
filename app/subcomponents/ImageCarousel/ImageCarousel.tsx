import {Image} from '@shopify/hydrogen-react';

import styles from './ImageCarousel.module.css';

export type CarouselImage = {
  url: string;
  altText: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  handleClick: (image: CarouselImage) => void;
};

const ImageCarousel = ({images, handleClick}: ImageCarouselProps) => {
  return (
    <div className={styles.carousel}>
      {images.map((image, index) => (
        <Image
          onClick={() => handleClick(image)}
          alt={image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          key={index}
          sizes="(min-width: 45em) 50vw, 100vw"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
