import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css'; 

const About = () => {
  const [foods, setFoods] = useState([]);

  const fetchAreas = async () => {
    const res = await axios.get('http://localhost:3000/api/food');
    setFoods(res.data);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <div className='container-fluid mt-5 about-section'>
      <h2 className='section-title text-center mb-4'>Explore Our Delicious Picks 😋</h2>
      <div className='row justify-content-center'>
        {foods.map((x, index) => (
          <div className='col-md-3 d-flex' key={index}>
            <div className='card food-card mb-4 shadow-sm'>
              <img
                src={`http://localhost:3000/uploads/${x.image}`}
                className='card-img-top food-image'
                alt={x.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{x.name}</h5>
                <p className='card-text text-muted'>Price: ₹{x.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
