import styles from "./PdfToImageConverter.module.scss";

export default function PdfToImageConverter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["file-select"]}></div>
    </div>
  );
}
