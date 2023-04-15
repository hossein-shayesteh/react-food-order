export type AddItemType = {
  id: string;
  name: string;
  price: number;
  amount: number;
  description: string;
};
export type CheckoutUserDataType = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
};
export type UserConfirmOrderDataType = {
  foods: {
    id: string;
    name: string;
    price: number;
    amount: number;
    description: string;
  }[];
  name: string;
  street: string;
  city: string;
  postalCode: string;
};
