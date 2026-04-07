import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.loader} data-testid="loader">
      <div className={styles.spinner} />
      <span className={styles.text}>Загрузка котиков...</span>
    </div>
  );
}
