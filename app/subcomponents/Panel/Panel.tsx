import styles from './Panel.module.css';

type PanelProps = {
  name: string;
};

const Panel = ({name}: PanelProps) => {
  return <div className={styles.panel}>{name}</div>;
};

export default Panel;
