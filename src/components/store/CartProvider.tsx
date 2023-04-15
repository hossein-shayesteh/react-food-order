import React, { useReducer } from "react";

import cartContext from "./CartContext";
import { AddItemType } from "./Types";

const defaultCartState: {
  items: AddItemType[];
  totalAmount: number;
} = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (
  prevState: typeof defaultCartState,
  action:
    | { type: "ADD"; item: AddItemType }
    | { type: "REMOVE"; id: string }
    | { type: "CLEAR" }
) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      +prevState.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props: { children: React.ReactNode }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const handleAddItemToCart = (item: AddItemType) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const handleRemoveItemFromCart = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const handleClearItemsFromCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cardContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
    clearItems: handleClearItemsFromCart,
  };
  return (
    <cartContext.Provider value={cardContext}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartProvider;
