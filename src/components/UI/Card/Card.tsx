import React from "react";
import styles from "./Card.module.scss";

type CardProps = {
  className?: string;
  children?: React.ReactNode;
};
const Card = (props: CardProps) => {
  return (
    <div className={styles.card + " " + props.className}>{props.children}</div>
  );
};
export default Card;
