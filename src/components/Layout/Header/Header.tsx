import React from "react";
import styles from "./Header.module.scss";

import image from "../../../assets/photos/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";

const Header = (props: { onShowCart: () => void }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Order Food App</h1>
        <HeaderCardButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="A table full of foods" />
      </div>
    </>
  );
};

export default Header;
