import React, { useRef } from "react";
import styles from "./MealsItemForm.module.scss";

import Input from "../../UI/Card/Input";

const MealsItemForm = (props: {
  onAddToCart: (enteredAmount: number) => void;
}) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredAmount = Number(amountInputRef.current?.value);
    // small validation for form
    if (enteredAmount < 1 || enteredAmount > 5) return;
    props.onAddToCart(enteredAmount);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label={"Amount"}
        ref={amountInputRef}
        input={{
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type={"submit"}>Add</button>
    </form>
  );
};
export default MealsItemForm;
