import React from "react";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";

const CartItems = ({cart}) => {
  return (
    <div>
      <div className="titles">
        <h3 className="product-title">Product</h3>
        <h3 className="price">Price</h3>
        <h3 className="quantity">Quantity</h3>
        <h3 className="total">Total</h3>
      </div>
      <div className="cart-items">
        {cart.cartItems?.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      <CartSummary cart={cart} />
    </div>
  );
};

export default CartItems;
