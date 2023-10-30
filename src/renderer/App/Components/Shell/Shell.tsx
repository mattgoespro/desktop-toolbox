import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styles from "./Shell.module.scss";
import { useState } from "react";
import Title from "shared/Title/Title";

export function Shell() {
  const dispatch = useDispatch();
  const [appTitle, setAppTitle] = useState("");

  return (
    <div className={styles.shell}>
      <div className={styles.nav}>
        <Link
          className={styles["nav-link"]}
          to="image-to-icon"
          relative="route"
          onClick={() => setAppTitle("Image to Icon")}
        >
          Image to Icon
        </Link>
        <Link
          className={styles["nav-link"]}
          to="pdf-to-image"
          relative="route"
          onClick={() => setAppTitle("PDF to Image")}
        >
          PDF to Image
        </Link>
      </div>
      <div className={styles["shell-content"]}>
        <Title className={styles.title} title={appTitle} />
        <Outlet />
      </div>
    </div>
  );
}
