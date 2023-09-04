import React ,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';
import CartItems from './CartItems';
import { getTotals } from '../../slices/cartSlice';



const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <EmptyCart cart={cart}/>
      ) : (
        <CartItems cart={cart}/>
      )}
    </div>
  );
}

export default Cart