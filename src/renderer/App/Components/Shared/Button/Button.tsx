import styles from "./Button.module.scss";

interface ButtonProps {
  type: "primary" | "secondary";
  size?: "small" | "normal" | "large";
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Button(props: ButtonProps) {
  const { className, type, size, onClick, disabled, children } = props;

  return (
    <button
      className={[
        className,
        styles.button,
        styles[type ?? "primary"],
        styles[size ?? "normal"]
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
