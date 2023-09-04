import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart} from '../../slices/cartSlice';
import PayButton from './PayButton';

const CartSummary = ({ cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  const handleClearCart = () => {
    dispatch(clearCart());
  }


  return (
    <div className="cart-summary">
      <button className="clear-cart" onClick={() => handleClearCart()}>
        Clear Cart
      </button>
      <div className="cart-checkout">
        <div className="subtotal">
          <span>Subtotal</span>
          <span className="amount">${cart.cartTotalAmount}</span>
        </div>
        <p>Taxes and shipping calculated at checkout</p>
        {auth.id ? (
          <PayButton cartItems={cart.cartItems} />
        ) : (
          <button className="cart-login" onClick={() => navigate("/login")}>
            Login to checkout
          </button>
        )}

        <div className="continue-shopping">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary