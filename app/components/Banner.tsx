import React from 'react';
import styles from './Header.module.css';

const Banner = () => {
  return (
    <div className={styles.announcementBanner}>
      <p>
        Please note that I am in Japan until February - all orders placed before
        then will be refunded!
      </p>
    </div>
  );
};

export default Banner;
