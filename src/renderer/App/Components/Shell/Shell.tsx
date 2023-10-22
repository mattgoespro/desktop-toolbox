import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setTitle } from "redux/Title/actions";
import { selectTitle } from "redux/Title/selectors";
import Title from "shared/Title/Title";
import styles from "./Shell.module.scss";
import { useCallback } from "react";

export function Shell() {
  const dispatch = useDispatch();

  const setAppTitle = useCallback((title: string) => {
    console.log("Set title to", title);
    dispatch(setTitle({ title: title }));
  }, []);

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
        <Title className={styles.title} title={selectTitle()} />
        <Outlet />
      </div>
    </div>
  );
}
