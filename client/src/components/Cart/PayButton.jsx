import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {url} from "../../slices/api";

const PayButton = ({ cartItems }) => {
  const user = useSelector(state => state.auth);

  const handleCheckout = async() => {
    try {
      const response = await axios.post(
        `${url}/payments/create-checkout-session`,
        {
          cartItems,
          userId: user.id,
        }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error.message);
    }
    
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
};

export default PayButton