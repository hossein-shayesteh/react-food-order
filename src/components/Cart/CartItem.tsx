import React from "react";
import styles from "./CartItem.module.scss";

const CartItem = (props: {
  name: string;
  amount: number;
  price: number;
  onRemove: (id: any) => void;
  onAdd: (item: any) => void;
}) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.amount}>{price}</span>
          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
