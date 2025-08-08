import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(location.state?.price || 100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!document.querySelector('#razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:3000/api/payment/create-order', { amount });
      const { orderId, currency } = data;

      const options = {
        key: 'rzp_test_3zZOqPuS56g86S',
        amount: amount * 100,
        currency,
        name: 'Fooodyyy',
        description: 'Service Payment',
        order_id: orderId,
        handler: async (response) => {
          await axios.post('http://localhost:3000/api/payment/save-payment', {
            orderId,
            paymentId: response.razorpay_payment_id,
            amount,
            currency,
            status: 'success',
          });
          alert('✅ Payment Successful!');
          navigate('/about');
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: { color: '#FFA726' }, // lighter orange
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error', error);
      alert('❌ Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <FaCreditCard size={50} color="#fff" />
        </div>
        <h2 style={styles.heading}>Secure Checkout</h2>
        <p style={styles.subText}>Complete your payment below</p>

        <div style={styles.amountBox}>
          <span style={styles.amountLabel}>Amount</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <button
          style={{ ...styles.payButton, opacity: loading ? 0.7 : 1 }}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
   //background: 'linear-gradient(135deg, #a8e6cf, #56ab2f)', // soft green gradient
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 20,
    background: 'rgba(56, 142, 60, 0.35)', // green with transparency
    backdropFilter: 'blur(20px)',
    boxShadow: '0 12px 40px rgba(56, 142, 60, 0.5)', // green shadow
    textAlign: 'center',
    color: 'white',
  },
  iconWrapper: {
    background: 'linear-gradient(135deg, #4caf50, #388e3c)', // green gradient
    padding: 15,
    borderRadius: '50%',
    display: 'inline-block',
    marginBottom: 15,
  },
  heading: {
    fontSize: 26,
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: '1px',
  },
  subText: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 20,
    fontWeight: '500',
  },
  amountBox: {
    textAlign: 'left',
    marginBottom: 25,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    border: 'none',
    outline: 'none',
    fontSize: 16,
  },
  payButton: {
    width: '100%',
    padding: '14px 0',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #4caf50, #388e3c)',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};


export default PaymentPage;
