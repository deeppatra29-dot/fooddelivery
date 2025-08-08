import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './Cartcontext'; 

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { cartItems } = useCart(); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#ff6600' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                        <FaUtensils />
                        fooodyyy
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">

                            {token && (
                                <li className="nav-item me-3">
                                    <Link className="nav-link text-white position-relative" to="/cart">
                                        <FaShoppingCart size={20} />
                                        {cartItems.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            )}

                            {!token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login">Login</Link>
                                    </li>
                                </>
                            )}
                            {token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/home">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/about">About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/contact">Admin</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/service">Service</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-light ms-2" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
