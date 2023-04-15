import React, { forwardRef } from "react";
import styles from "./Checkout.module.scss";

type CheckoutInputType = {
  validity: Boolean;
  label: string;
  children: React.ReactNode;
};

const CheckoutInput = forwardRef<HTMLInputElement, CheckoutInputType>(
  (props, ref) => {
    return (
      <div
        className={`${styles.control} ${!props.validity && styles.invalid} `}
      >
        <label htmlFor={props.label}>{props.children}</label>
        <div>
          <input type="text" id={props.label} ref={ref} />
          {!props.validity && (
            <p className={styles.warning}>*please enter a valid name!</p>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutInput;
