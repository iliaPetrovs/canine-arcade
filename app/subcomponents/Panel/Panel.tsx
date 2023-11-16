// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import styles from './Panel.module.css';
import Arrow from '../Arrow/Arrow';

type PanelProps = {
  collection: {
    name: string;
    href: string;
  };
  handleClick: (index: number) => void;
  isActive: boolean;
  index: number;
  currentIdx: number;
};

const Panel = ({
  collection: {name, href},
  handleClick,
  isActive,
  index,
  currentIdx,
}: PanelProps) => {
  const getArrowPos = () => {
    if (index === 0 || (currentIdx === 2 && index === 1)) {
      return ['left'];
    }

    if (index === 1 && currentIdx === 0) {
      return ['right'];
    }

    return ['right'];
  };
  return (
    <div
      className={classNames(styles.panel, {
        [styles.active]: isActive,
      })}
      onClick={() => handleClick(index)}
    >
      <h3 className={classNames({[styles.hidden]: !isActive})}>{name}</h3>
      <img src={href} alt="" />
      <div className={styles.cover} />
      {!isActive && (
        <div
          className={classNames(styles.arrowWrapper, {
            [styles.right]: index === 0 || (index === 1 && currentIdx === 2),
            [styles.left]: (index === 1 && currentIdx === 0) || index === 2,
          })}
        >
          <Arrow position={getArrowPos()} />
        </div>
      )}
    </div>
  );
};

export default Panel;
