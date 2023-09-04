import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
const Products = () => {
    const navigate = useNavigate();
    
  return (
    <>
        <button onClick={() => navigate("/admin/products/create-product")}>Create</button>
        <Outlet />
    </>
  )
}

export default Products