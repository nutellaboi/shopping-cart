import React from "react";
import useLocalStorage from "./useLocalStorage";
import ProductList from "./components/productList";
import Cart from "./components/cart";
import "./App.css";

const App = () => {
  // custom hook to manage cartItems in localStorage
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <ProductList addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        total={calculateTotal(cartItems)}
      />
    </div>
  );
};

export default App;
