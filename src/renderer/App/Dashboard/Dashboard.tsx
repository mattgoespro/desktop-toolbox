import styles from "./Dashboard.module.scss";
import PDFToImageConverter from "./PDFToImageConverter/PDFToImageConverter";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className="utility-apps">
        <PDFToImageConverter />
      </div>
    </div>
  );
}
