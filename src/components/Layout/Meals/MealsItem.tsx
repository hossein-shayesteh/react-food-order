import React, { useContext } from "react";
import styles from "./MealsItem.module.scss";

import Card from "../../UI/Card/Card";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../store/CartContext";
import { AddItemType } from "../../store/CartContext";

const MealsItem = (props: AddItemType) => {
  const cartContext = useContext(CartContext);
  const handleAddToCart = (enteredAmount: number) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: enteredAmount,
      price: props.price,
      description: props.description,
    });
  };
  return (
    <Card className={styles.meal}>
      <li>
        <div>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>${props.price}</div>
        </div>
        <div>
          <MealsItemForm onAddToCart={handleAddToCart} />
        </div>
      </li>
    </Card>
  );
};
export default MealsItem;
