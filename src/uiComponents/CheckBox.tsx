import styles from './CheckBox.module.css';

type CheckBoxProps = {
  id: string;
  label: string;
  onChange?: () => void;
  isChecked?: boolean;
};

const CheckBox = (props: CheckBoxProps) => {
  const { id, label, isChecked, onChange } = props;

  return (
    <label htmlFor={id} className={styles.container}>
      {label}
      <input type="checkbox" id={id} name={id} checked={isChecked} onChange={onChange} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default CheckBox;
