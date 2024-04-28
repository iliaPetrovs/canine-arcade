import classNames from 'classnames';
import React from 'react';

import styles from './BubbleTitle.module.css';

type BubbleTitleProps = {
  title: string;
  small?: boolean;
  color?: 'dark' | 'light';
  stretch?: boolean;
};

const BubbleTitle = ({
  title,
  small = false,
  color = 'dark',
  stretch = false,
}: BubbleTitleProps) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.stretch]: stretch,
      })}
    >
      <h1
        className={classNames(
          'text-center',
          styles.title,
          small ? 'header-4' : 'header-1',
          {
            [styles.dark]: color === 'dark',
            [styles.light]: color === 'light',
          },
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default BubbleTitle;
