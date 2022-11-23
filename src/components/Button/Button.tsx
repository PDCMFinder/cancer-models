import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button className={styles.Button}>{props?.label}</button>;
};

export default Button;
