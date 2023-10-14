import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Shell.module.scss";
import { useDispatch } from "react-redux";
import { setTitle } from "../../Redux/Title/actions";
import { selectTitle } from "../../Redux/Title/selectors";
import Title from "../../Shared/Components/Title/Title";

export function Shell() {
  const dispatch = useDispatch();
  const title = selectTitle();

  function setAppTitle(title: string) {
    dispatch(setTitle({ title: title }));
  }

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
        </Link>{" "}
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
        <Title title={title} />
        <Outlet />
      </div>
    </div>
  );
}
