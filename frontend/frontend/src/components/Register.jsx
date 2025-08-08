import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const hc = e => setForm({ ...form, [e.target.name]: e.target.value });

  const hs = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/auth/register', form);
    alert("Registration successfully");
  };

  return (
    <>
      <form onSubmit={hs} className="register-form">
  <div className="form-group">
    <label>Name:</label>
    <input
      type="text"
      className="custom-input"
      name="name"
      onChange={hc}
      required
    />
  </div>
  <div className="form-group">
    <label>Email:</label>
    <input
      type="email"
      className="custom-input"
      name="email"
      onChange={hc}
      required
    />
  </div>
  <div className="form-group">
    <label>Password:</label>
    <input
      type="password"
      className="custom-input"
      name="password"
      onChange={hc}
      required
    />
  </div>
  <button type="submit" className="custom-button">Register</button>
</form>

    </>
  );
};

export default Register;
