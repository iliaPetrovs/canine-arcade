import classNames from 'classnames';
import styles from './Arrow.module.css';

type ArrowProps = {
  position: string[];
};
const Arrow = ({position}: ArrowProps) => {
  return (
    <div
      className={classNames(styles.arrowCta, {
        [styles.left]: position.includes('left'),
        [styles.right]: position.includes('right'),
      })}
    />
  );
};

export default Arrow;
