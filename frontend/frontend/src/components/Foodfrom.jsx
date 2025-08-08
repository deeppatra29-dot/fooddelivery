import React, { useState } from 'react'
import axios from 'axios'

const Foodfrom = ({ onareaadd }) => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: null,
    });

    const hc = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const hs = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('price', form.price);
        data.append('image', form.image);

        const res = await axios.post('http://localhost:3000/api/food', data);
        if (res.status === 201) {
            alert('Food added successfully!');
            onareaadd();
            setForm({
                name: '',
                price: '',
                image: null,
            });
        }
    };

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4 fw-bold text-success'>🍔 Add New Food Item</h2>

            <form onSubmit={hs} encType='multipart/form-data' className='shadow p-4 rounded bg-light'>
                <div className='mb-3'>
                    <label className='form-label fw-semibold'>Food Name</label>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        name='name'
                        placeholder='e.g. Chicken Burger'
                        value={form.name}
                        onChange={hc}
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label fw-semibold'>Price</label>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        name='price'
                        placeholder='e.g. 199'
                        value={form.price}
                        onChange={hc}
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='form-label fw-semibold'>Image</label>
                    <input
                        type='file'
                        className='form-control'
                        name='image'
                        onChange={hc}
                        required
                    />
                </div>

                <div className='text-center'>
                    <button type='submit' className='btn btn-success px-5 py-2 fw-bold'>
                        ➕ Add Food
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Foodfrom;
