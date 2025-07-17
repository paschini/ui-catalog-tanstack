import { ReactNode, useState } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  type?: 'danger' | 'shadowed' | 'button';
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

const Button = (props: ButtonProps) => {
  const { type, disabled, children, onClick, isActive } = props;

  const [isPressed, setIsPressed] = useState(false);

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
      onMouseUp={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      aria-pressed={isPressed}
    >
      {children}
    </button>
  );
};

export default Button;
