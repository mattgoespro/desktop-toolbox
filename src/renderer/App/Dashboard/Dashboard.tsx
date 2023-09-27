import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { UtilityCard } from "./UtilityCard/UtilityCard";

export default function Dashboard() {
  return (
    <div className={styles["dashboard-app"]}>
      <div className={styles.dashboard}>
        <UtilityCard
          title="PDF to Image Converter"
          description="Convert PDFs to images"
          link="/pdf-to-image-converter"
        ></UtilityCard>
      </div>
      <Outlet />
    </div>
  );
}
