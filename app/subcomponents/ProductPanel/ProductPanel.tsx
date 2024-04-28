import React, {useState} from 'react';
import Panel from '../Panel/Panel';
import styles from './ProductPanel.module.css';

export type PanelCollection = {
  name: string;
  collectionName: string;
  href: string;
};

const collections: PanelCollection[] = [
  {
    name: 'Bags',
    collectionName: 'Bags',
    href: 'https://cdn.shopify.com/s/files/1/0813/0602/6289/files/4DF4A5C1-DA27-4300-A8B4-924CC9B1C9F6.jpg?v=1700131741',
  },
  {
    name: 'Clothing',
    collectionName: 'Clothing',
    href: 'https://cdn.shopify.com/s/files/1/0813/0602/6289/files/IMG_2730.jpg?v=1699529842',
  },
  {
    name: 'Accessories',
    collectionName: 'Accessories-makeup',
    href: 'https://cdn.shopify.com/s/files/1/0813/0602/6289/files/295976357_637258367408641_8353955608237342295_n.jpg?v=1692032830',
  },
];

const ProductPanel = () => {
  const [activeIdx, setActiveId] = useState(1);
  return (
    <div className={styles.container}>
      {collections.map((collection, index) => (
        <Panel
          key={collection.name}
          collection={collection}
          handleClick={(idx) => setActiveId(idx)}
          isActive={activeIdx === index}
          index={index}
          currentIdx={activeIdx}
        />
      ))}
    </div>
  );
};

export default ProductPanel;
