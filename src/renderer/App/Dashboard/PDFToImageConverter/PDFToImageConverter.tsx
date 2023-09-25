import Title from "../../Shared/Title/Title";
import styles from "./PDFToImageConverter.module.scss";

export default function PDFToImageConverter() {
  return (
    <div className={styles.wrapper}>
      <Title title="PDF to Image Converter" />
      <div className="pdf-to-image-converter">
        <div className="utility-apps"></div>
      </div>
    </div>
  );
}
