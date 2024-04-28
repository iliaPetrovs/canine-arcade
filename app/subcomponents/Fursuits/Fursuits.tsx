import React from 'react';

import styles from './Fursuits.module.css';
import classNames from 'classnames';

type Fursuit = {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
    altText?: string;
  };
};

type FursuitsProps = {
  fursuits: Fursuit[];
};

const Fursuits = ({fursuits}: FursuitsProps) => {
  return (
    <div className="row">
      {[...fursuits, ...fursuits, ...fursuits, ...fursuits].map(
        (fursuit, index) => (
          <div
            key={fursuit.id}
            className={classNames('col-xs-12 col-lg-5 text-center m-b-5', {
              'col-lg-offset-1': index % 2 === 0,
            })}
          >
            <div key={fursuit.id} className={styles.container}>
              <div className={styles.wrapper}>
                <div className="image-container">
                  <img
                    className={styles.image}
                    src={fursuit.featuredImage?.url}
                    alt={fursuit.featuredImage?.altText || fursuit.title}
                  />
                </div>
                <h2 className="header-2 capitalize m-b-0">{fursuit.title}</h2>
                <p className={styles.description}>{fursuit.description}</p>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Fursuits;
