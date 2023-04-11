import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

type InputProps = { label: string; input: any };
const Input = forwardRef((props: InputProps, ref) => {
  return (
    <div className={styles.input}>
      <label>
        {props.label}
        <input {...props.input} ref={ref} />
      </label>
    </div>
  );
});
export default Input;
