import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../slices/authSlice';
import { StyledForm } from './StyledForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(() => {
      if(auth.id){
        navigate("/cart");
      }
    }, [auth.id, navigate]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button>
          {auth.registerStatus === "pending" ? "Submitting.." : "Register"}
        </button>

        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;