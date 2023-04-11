import { createContext } from "react";

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
});
export default cartContext;

export type AddItemType = {
  id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
};

export type CartContextType = {
  items: AddItemType;
  totalAmount: number;
  addItem: (item: AddItemType) => void;
  removeItem: (id: string) => void;
};
