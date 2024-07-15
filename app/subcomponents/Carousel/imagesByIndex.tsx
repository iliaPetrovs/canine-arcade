import image1 from './image/image1.png';
import image2 from './image/image2.png';
import image3 from './image/image3.png';

export const images: Record<string, string>[] = [
  {image: image1, href: '/collections/accessories-makeup'},
  {image: image2, href: '/collections/bags'},
  {image: image3, href: '/collections/clothing'},
];

export const imageByIndex = (index: number): string =>
  images[index % images.length].image;
export const hrefByIndex = (index: number): string =>
  images[index % images.length].href;
