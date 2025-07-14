import { useContext } from 'react';
import { GlobalContext } from '../globalContext';
import styles from './Errors.module.css';

export type Error = {
  code?: number;
  message: string;
};

const Errors = () => {
  const {
    globalState: { errors }
  } = useContext(GlobalContext);

  return (
    <div className={styles.errors}>
      {errors.map(
        (error: Error, index: number) =>
          error && <p key={`error-${index}`}>{`Error: -${error.code}- ${error.message}`}</p>
      )}
    </div>
  );
};

export default Errors;
