import image1 from './image/mawbanner.avif';
import image2 from './image/image2.jpeg';
import image3 from './image/image1.jpeg';

export const images: Record<string, string>[] = [
  {image: image1, href: '/products/wolf-maw-ita-bag'},
  {image: image2, href: '/ello'},
  {image: image3, href: '/wot'},
];

export const imageByIndex = (index: number): string =>
  images[index % images.length].image;
export const hrefByIndex = (index: number): string =>
  images[index % images.length].href;
