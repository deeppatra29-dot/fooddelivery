import React from 'react';
import Carouselslider from './Carouselslider';
import { productdata } from '../data';
import Productcard from './Productcard';
import './Home.css'; 

const Home = () => {
  return (
    <>
      <Carouselslider />

      {/* Hero Section */}
      <section className="hero-section text-center text-white py-5">
        <h1 className="display-4 fw-bold">Welcome to Foodyyy!</h1>
        <p className="lead">Delicious meals at your doorstep.</p>
        <a href="#menu" className="btn btn-warning btn-lg mt-3">Order Now</a>
      </section>

      {/* Product Cards Section */}
      <div className='container mt-5' id="menu">
        <h2 className='mb-4 text-center fw-bold'>Popular Items</h2>
        <div className='row'>
          {productdata.map((item, index) => (
            <div className='col-md-3 mb-4' key={index}>
              <Productcard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
