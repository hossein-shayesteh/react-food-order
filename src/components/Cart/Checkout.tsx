import React, { useRef, useState } from "react";
import styles from "./Checkout.module.scss";

import CheckoutInput from "./CheckoutInput";
import { CheckoutUserDataType } from "../store/Types";

//helper functions for validation
const notEmpty = (value: string) => value !== "";
const moreThanFiveChars = (value: string) => value.trim().length >= 5;

const Checkout = (props: {
  onCancel: () => void;
  onConfirm: (orderData: CheckoutUserDataType) => void;
}) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  // form refs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const confirmHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostalCode = postalCodeInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;
    // IsValid
    const enteredNameIsValid = notEmpty(enteredName);
    const enteredAddressIsValid = notEmpty(enteredStreet);
    const enteredPostalCodeIsValid = moreThanFiveChars(enteredPostalCode);
    const enteredCityIsValid = notEmpty(enteredCity);
    //form validity
    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    if (!formIsValid) {
      return;
    } else {
      // submit form data
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode,
      });
    }
  };
  const CheckoutFormData = [
    {
      validity: formInputValidity.name,
      label: "name",
      ref: nameInputRef,
      title: "Your Name",
    },
    {
      validity: formInputValidity.street,
      label: "street",
      ref: streetInputRef,
      title: "Street",
    },
    {
      validity: formInputValidity.postalCode,
      label: "postal",
      ref: postalCodeInputRef,
      title: "Postal Code",
    },
    {
      validity: formInputValidity.city,
      label: "city",
      ref: cityInputRef,
      title: "City",
    },
  ];
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      {CheckoutFormData.map((data) => (
        <CheckoutInput
          validity={data.validity}
          label={data.label}
          ref={data.ref}
        >
          {data.title}
        </CheckoutInput>
      ))}
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
