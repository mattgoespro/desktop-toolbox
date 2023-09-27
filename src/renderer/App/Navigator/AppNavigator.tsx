import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { setTitle } from "../Redux/Title/actions";
import { selectTitle } from "../Redux/Title/selectors";
import Title from "../Shared/Title/Title";
import styles from "./AppNavigator.module.scss";

export function AppNavigator() {
  const title = useSelector(selectTitle);
  const location = useLocation();

  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    dispatch(setTitle({ title: null }));
  };

  return (
    <div className={styles.navigator}>
      <div>
        <Title title={title} />
        {["", "/"].includes(location.pathname) && (
          <Link to="/" className={styles["btn-back"]} onClick={onBackButtonClick}>
            Back
          </Link>
        )}
      </div>
      <div className={styles["page-content"]}>
        <div></div>
        <Outlet />
      </div>
    </div>
  );
}
