import React, { useState } from "react";
import "./App.css";

import Header from "./components/Layout/Header/Header";
import Meals from "./components/Layout/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const handleShowCart = () => {
    setCartIsShown(true);
  };
  const handleHideCart = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={handleHideCart} />}
      <Header onShowCart={handleShowCart} />
      <Meals />
    </CartProvider>
  );
}

export default App;
