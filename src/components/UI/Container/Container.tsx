import { ContainerProps } from "../../../types/components/UI/container";
import styles from './Container.module.css';

export const Container = ({children} : ContainerProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}