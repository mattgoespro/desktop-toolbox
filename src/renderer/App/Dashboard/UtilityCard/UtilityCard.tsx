import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTitle } from "../../Redux/Title/actions";
import styles from "./UtilityCard.module.scss";

interface UtilityCardProps {
  title: string;
  description: string;
  link: string;
}

export function UtilityCard(props: UtilityCardProps) {
  const dispatch = useDispatch();

  const onCardClick = () => {
    dispatch(
      setTitle({
        title: props.title
      })
    );
  };

  return (
    <Link to={props.link} onClick={onCardClick}>
      <div className={styles.wrapper}>
        <h2>{props.title}</h2>
        <div className={styles.description}></div>
      </div>
    </Link>
  );
}
