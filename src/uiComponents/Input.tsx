import type { ChangeEvent, ReactNode } from 'react';
import Icon from '../assets/icons/Icon';
import styles from './Input.module.css';

type InputProps = {
  icon?: string;
  value?: string;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

const Input = (props: InputProps) => {
  const { icon, value, onChange } = props;

  return (
    <>
      <input type="text" placeholder={'Search'} value={value} className={styles.input} onChange={onChange} />
      <Icon name={icon} className={styles.icon} />
    </>
  );
};

export default Input;
