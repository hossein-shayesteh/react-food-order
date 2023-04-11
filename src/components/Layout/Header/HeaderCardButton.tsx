import React, { useContext } from "react";
import styles from "./HeaderCardButton.module.scss";

import CartIcon from "../../../assets/photos/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCardButton = (props: { onClick?: () => void }) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (currentNumber: number, item: any) => {
      return currentNumber + item.amount;
    },
    0
  );
  return (
    <button
      className={styles.button + " " + styles.bump}
      onClick={props.onClick}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCardButton;
