import React from 'react';
import styles from './Header.module.css';

const Banner = () => {
  return (
    <div className={styles.announcementBanner}>
      <p>Please be aware that orders may take up to 2 weeks to ship!</p>
    </div>
  );
};

export default Banner;
