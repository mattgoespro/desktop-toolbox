import React from "react";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <div>
      <h1 className={styles.dashboard}>Dashboard</h1>
      <div className="dashboard">
        <div className="utility-apps"></div>
      </div>
    </div>
  );
}
