import { DOMAttributes, ReactNode } from "react";

type TitleProps = {
  title: string;
  subtitle?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export default function Title(props: TitleProps) {
  return <h1>{props.title}</h1>;
}
