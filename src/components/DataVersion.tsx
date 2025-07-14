import styles from './DataVersion.module.css';

type DataVersionProps = {
  version: string;
  lastModified?: string;
};

const DataVersion = (props: DataVersionProps) => {
  const { version, lastModified } = props;

  return (
    <div className={styles.dataInfo}>
      <div>
        <div>{`Data version: ${version}`}</div>
        {lastModified && <div>{`Last modified: ${lastModified}`}</div>}
      </div>
    </div>
  );
};

export default DataVersion;
