import image1 from './image/makeup.png';
import image2 from './image/bags.png';
import image3 from './image/clothing.png';

export const images: Record<string, string>[] = [
  {image: image1, href: '/collections/clothing'},
  {image: image2, href: '/collections/bags'},
  {image: image3, href: '/collections/accessories-makeup'},
];

export const imageByIndex = (index: number): string =>
  images[index % images.length].image;
export const hrefByIndex = (index: number): string =>
  images[index % images.length].href;
