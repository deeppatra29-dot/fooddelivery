import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const Navigate = useNavigate();

  const hc = e => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    Navigate('/home');
  };

  return (
    <>
      <form onSubmit={hs} className="register-form">
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            className='form-control custom-input'
            name='email'
            onChange={hc}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            className='form-control custom-input'
            name='password'
            onChange={hc}
            required
          />
        </div>
        <button type='submit' className='btn btn-success mt-2 custom-button'>
          🍕 Login
        </button>
      </form>
    </>
  );
};

export default Login;
