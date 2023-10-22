import styles from "./Button.module.scss";

interface ButtonProps {
  type: "primary" | "secondary";
  size?: "normal" | "large";
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { type, size, onClick, disabled, children } = props;

  return (
    <button
      className={[styles.button, styles[type ?? "primary"], styles[size ?? "normal"]].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
