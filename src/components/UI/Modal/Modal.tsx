import React from "react";
import styles from "./Modals.module.scss";

import { createPortal } from "react-dom";

type ModalProps = {
  children?: React.ReactNode;
  onCloseCart?: () => void;
};
const BackDrop = (props: { onCloseCart?: () => void }) => {
  return <div className={styles.backdrop} onClick={props.onCloseCart}></div>;
};

const Overlay = (props: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles["slide-down"]}>{props.children}</div>
    </div>
  );
};
const Modal = (props: ModalProps) => {
  const backDropRoot = document.getElementById("backdrop-root") as HTMLElement;
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return (
    <>
      {createPortal(<BackDrop onCloseCart={props.onCloseCart} />, backDropRoot)}
      {createPortal(<Overlay>{props.children}</Overlay>, modalRoot)}
    </>
  );
};

export default Modal;
