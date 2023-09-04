import React from 'react'
//import {useSelector} from 'react-redux';

import { useGetAllProductsQuery } from '../../slices/productsApi'
import Product from './HomeProduct';

const Home = () => {
  /* if you use createasyncthunk const {items, status } = useSelector(state => state.products); */
  const { data, error, isLoading} = useGetAllProductsQuery();
  
  
  return (
    <div className="home-container">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>An error occured..</p>
      ) : (
        <Product data={data}/> 
      )}
    </div>
  );
}

export default Home