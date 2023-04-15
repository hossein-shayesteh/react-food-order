import React from "react";
import styles from "./Card.module.scss";

type CardPropsType = {
  className?: string;
  children?: React.ReactNode;
};
const Card = (props: CardPropsType) => {
  return (
    <div className={styles.card + " " + props.className}>{props.children}</div>
  );
};
export default Card;
