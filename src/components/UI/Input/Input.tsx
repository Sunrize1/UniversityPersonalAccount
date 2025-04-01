import { inputProps } from "../../../types/components/UI/input"
import styles from './Input.module.css';
import typography from '../../../styles/typography.module.css';

export const Input = ({label, ...rest}: inputProps) => {
    return (
    <div className={styles.textField + ' ' + typography.p2}>
      <label className={styles.labelText}>{label}</label>
      <div className={styles.content}>
        <input className={styles.inputText} type="text" placeholder="Введите текст" />
      </div>
    </div>
    )
}
