import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addToCart } from '../../slices/cartSlice';

const Product = ({data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <>
      <h2>New Arrivals</h2>
      <div className="products">
        {data.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <div className="details">
              <span>{product.desc}</span>
              <span className="price">${product.price}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </> 
  );
}

export default Product