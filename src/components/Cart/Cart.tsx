import React, { useContext, useState } from "react";
import styles from "./Cart.module.scss";

import CartContext from "../store/CartContext";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import postRequest from "../hooks/postRequest";
import { CheckoutUserDataType } from "../store/Types";
import { AddItemType } from "../store/Types";

const Cart = (props: { onCloseCart: () => void }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "notSubmit" | "submitting" | "submitted"
  >("notSubmit");

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasOrders = cartContext.items.length > 0;

  const handleAddCartItem = (item: AddItemType) => {
    cartContext.addItem(item);
  };
  const handleRemoveCartItem = (id: string) => {
    cartContext.removeItem(id);
  };
  const handleOrder = () => {
    setIsCheckingOut(true);
  };
  const handleCheckoutCancel = () => {
    setIsCheckingOut(false);
  };

  const handleSubmitOrder = async (orderData: CheckoutUserDataType) => {
    const userConfirmOrderData = { ...orderData, foods: cartContext.items };

    setSubmitStatus("submitting");

    await postRequest(
      "https://react-food-order-4054b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      userConfirmOrderData
    ).catch((e) => {
      console.log(e);
    });
    setSubmitStatus("submitted");
    cartContext.clearItems();
  };

  const modalItems = (
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
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasOrders && (
        <button className={styles.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {!isCheckingOut && modalItems}
      {isCheckingOut && (
        <Checkout
          onConfirm={handleSubmitOrder}
          onCancel={handleCheckoutCancel}
        />
      )}
      {!isCheckingOut && modalActions}
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order!</p>;
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {submitStatus === "notSubmit" && modalContent}
      {submitStatus === "submitting" && isSubmittingModalContent}
      {submitStatus === "submitted" && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
