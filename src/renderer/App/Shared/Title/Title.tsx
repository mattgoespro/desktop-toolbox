import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  subtitle?: string;
}

export default function Title(props: TitleProps) {
  return (
    <div className={styles.wrapper}>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}
