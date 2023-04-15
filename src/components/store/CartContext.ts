import { createContext } from "react";
import { AddItemType } from "./Types";

const cartContext = createContext({
  items: [
    {
      id: "",
      name: "",
      price: 0,
      amount: 0,
      description: "",
    },
  ],
  totalAmount: 0,
  addItem: (item: AddItemType) => {},
  removeItem: (id: string) => {},
  clearItems: () => {},
});
export default cartContext;
