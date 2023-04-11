import React, { useContext } from "react";
import styles from "./Cart.module.scss";

import Modal from "../UI/Modal/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import { AddItemType } from "../store/CartContext";

const Cart = (props: { onCloseCart: () => void }) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasOrders = cartContext.items.length > 0;

  const handleAddCartItem = (item: AddItemType) => {
    cartContext.addItem(item);
  };
  const handleRemoveCartItem = (id: string) => {
    cartContext.removeItem(id);
  };

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <div className={styles["cart-items"]}>
        <ul>
          {cartContext.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={handleRemoveCartItem.bind(null, item.id)}
              onAdd={handleAddCartItem.bind(null, item)}
            />
          ))}
        </ul>
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasOrders && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
