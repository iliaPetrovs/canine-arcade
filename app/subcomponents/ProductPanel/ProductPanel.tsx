import React from 'react';
import Panel from '../Panel/Panel';
import styles from './ProductPanel.module.css';

const collections = ['Bags', 'Clothing', 'Accessories'];

const ProductPanel = () => {
  return (
    <div className={styles.container}>
      {collections.map((collection) => (
        <Panel key={collection} name={collection} />
      ))}
    </div>
  );
};

export default ProductPanel;
