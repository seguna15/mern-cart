import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart } from '../../slices/cartSlice';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }

  return (
    <div className="cart-item">
      <div className="cart-product">
        <img src={cartItem.image} alt={cartItem.name} />
        <div>
          <h3>{cartItem.name}</h3>
          <p>{cartItem.desc}</p>
          <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
        </div>
      </div>
      <div className="cart-product-price">${cartItem.price}</div>
      <div className="cart-product-quantity">
        <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
        <div className="count">{cartItem.cartQuantity}</div>
        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
      </div>
      <div className="cart-product-total-price">
        ${cartItem.price * cartItem.cartQuantity}
      </div>
    </div>
  );
}

export default CartItem