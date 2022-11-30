import React, { useState } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClickText?: string;
}

const Button = (props: ButtonProps) => {
  const [buttonText, setButtonText] = useState(props?.text);

  const handleOnClick = () => {
    setButtonText(props?.onClickText || "I've been clicked");
  };

  return (
    <button onClick={handleOnClick} className={styles.Button}>
      {buttonText}
    </button>
  );
};

export default Button;
