// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import styles from './Panel.module.css';
import Arrow from '../Arrow/Arrow';
import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import type {PanelCollection} from '../ProductPanel/ProductPanel';

const mobileCutoff = 967;

type PanelProps = {
  collection: PanelCollection;
  handleClick: (index: number) => void;
  isActive: boolean;
  index: number;
  currentIdx: number;
};

const Panel = ({
  collection: {name, collectionName, href},
  handleClick,
  isActive,
  index,
  currentIdx,
}: PanelProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const getArrowPos = () => {
    if (index === 0 || (currentIdx === 2 && index === 1)) {
      return ['left'];
    }

    if (index === 1 && currentIdx === 0) {
      return ['right'];
    }

    return ['right'];
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < mobileCutoff);
    window.addEventListener('resize', (event: Event) => {
      setIsMobile((event.target as Window).innerWidth < mobileCutoff);
    });

    window.removeEventListener('resize', () => {});
  }, []);

  const handleContainerClick = () => {
    if (isActive || isMobile) {
      navigate(`/pages/${collectionName.toLowerCase()}`);
    }
    handleClick(index);
  };
  return (
    <div
      className={classNames(styles.panel, {
        [styles.active]: isActive,
      })}
      onClick={() => handleContainerClick()}
    >
      <h3 className={classNames({[styles.hidden]: !isActive})}>{name}</h3>
      <img src={href} alt="" />
      <div className={styles.cover} />
      {!isActive && !isMobile && (
        <div
          className={classNames(styles.arrowWrapper, {
            [styles.right]: index === 0 || (index === 1 && currentIdx === 2),
            [styles.left]: (index === 1 && currentIdx === 0) || index === 2,
          })}
        >
          <Arrow position={getArrowPos()} />
        </div>
      )}
      {/* TODO later
      {isMobile && (
        <>
          <div className={classNames(styles.arrowWrapper, styles.right)}>
            <Arrow position={['left']} />
          </div>
          <div className={classNames(styles.arrowWrapper, styles.left)}>
            <Arrow position={['right']} />
          </div>
        </>
      )} */}
    </div>
  );
};

export default Panel;
