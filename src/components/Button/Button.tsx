import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
}

const Button = (props: ButtonProps) => {
  return <button className={styles.Button}>{props?.text}</button>;
};

export default Button;
