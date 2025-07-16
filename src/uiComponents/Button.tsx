import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  type?: 'danger' | 'shadowed' | 'button';
  isActive?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  const { type, isActive, disabled, children, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        (type?.length || 0) > 0
          ? styles[type || 'button']
          : isActive
            ? `${styles.button} ${styles.active}`
            : styles.button
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
