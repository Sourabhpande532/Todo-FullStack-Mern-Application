import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await axios.post("/api/auth/login", loginData);
      toast.success("Login succesfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("login failed");
    }
  };
  return (
    <div className='login-box'>
      <h2>Login</h2>
      <form onSubmit={Login}>
        <div className='user-box'>
          <input type="email" name='email' required />
          <label>Username</label>
        </div>
        <div className='user-box'>
          <input type='password' name='password' required />
          <label>Password</label>
        </div>
        <button type='submit'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button><br></br>
        <br></br>
        <Link className="sign" to="/re" >Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
