import styles from "./Title.module.scss";

interface TitleProps {
  [key: string]: string;
  title: string;
  subtitle?: string;
}

export default function Title(props: TitleProps) {
  const { title, subtitle, ...rest } = props;

  return <h1 className={[rest.className, styles.title].join(" ")}>{title}</h1>;
}
