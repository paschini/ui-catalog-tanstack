import styles from './Count.module.css';

type CountProps = {
  total: number;
};

const Count = (props: CountProps) => {
  const { total } = props;

  return (
    <div className={styles.text}>{total === 1 ? <span>{`${total} item`}</span> : <span>{`${total} items`}</span>}</div>
  );
};

export default Count;
