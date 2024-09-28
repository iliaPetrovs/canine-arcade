import React from 'react';
import styles from './PricingGrid.module.css';
import BubbleTitle from '../BubbleTitle/BubbleTitle';
import classNames from 'classnames';
import {RxCross2} from 'react-icons/rx';

const PricingGrid = () => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-lg-6 text-center">
          <BubbleTitle title="Fursuit Commissions" />
          <p className={styles.status}>Commission status: closed</p>
        </div>
        <div className="col-xs-12 col-lg-offset-1 col-lg-5">
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <div className={styles.imageHeader}>
                <div className={styles.cross}>
                  <RxCross2 />
                </div>
              </div>
              <img
                alt=""
                className={styles.image}
                src="https://cdn.shopify.com/s/files/1/0813/0602/6289/files/Ilia.jpg?v=1705285228"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(styles.pricing, 'row')}>
        <div className={styles.pricingWrapper}>
          <div className="col-xs-12 col-lg-6">
            <div className={styles.pricingInfo}>
              <p className="m-t-3">
                Commissions for custom fursuits are currently closed - but you
                can stay up to date with commission openings and premades for
                sale via Twitter announcements and my{' '}
                <a href="https://t.me/caninearcade">Telegram channel</a>.
                <br />
                <br />I am extremely careful and picky with my suits, often
                taking months to perfect them, using unique methods that take
                long but produce impressively high quality results. I will
                always redo elements and take time making sure that everything
                is absolutely perfect - because of this, I can not accurately
                predict when I will finish current suits and next open for
                commissions, but I only take on 1-2 suits at a time. To see my
                current queue,{' '}
                <a href="https://trello.com/b/JXvvV37m/current-projects">
                  view my Trello.
                </a>
              </p>
              <p className={styles.prices}>Current starting prices</p>
              <BubbleTitle
                title="Head Only: £4000"
                small={true}
                color={'light'}
                stretch
              />
              <br />
              <BubbleTitle
                title="Partial: £5000"
                small={true}
                color={'light'}
                stretch
              />
              <br />
              <BubbleTitle
                title="Fullbody: £9000"
                small={true}
                color={'light'}
                stretch
              />
              <br />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6"></div>
        </div>
      </div>
    </>
  );
};

export default PricingGrid;
