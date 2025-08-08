import React from 'react';
import { useCart } from './Cartcontext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleBuyNow = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Create order on backend
      const { data } = await axios.post('http://localhost:3000/api/payment/create-order', { 
        amount: totalAmount 
      });

      const { orderId, currency } = data;

      const options = {
        key: 'rzp_test_3zZOqPuS56g86S', // Replace with your Razorpay key or from .env
        amount: totalAmount * 100,
        currency,
        name: "Fooodyyy",
        description: "Cart Purchase",
        order_id: orderId,
        handler: async function (response) {
          // Save payment on backend
          await axios.post('http://localhost:3000/api/payment/save-payment', {
            orderId,
            paymentId: response.razorpay_payment_id,
            amount: totalAmount,
            currency,
            status: 'success'
          });
          alert("Payment Successful!");
          navigate('/about');
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: { color: "#4CAF50" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error", error);
      alert("Something went wrong during payment!");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold text-center">🛒 Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="shadow-lg border-0 h-100">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-semibold">{item.name}</Card.Title>
                    <Card.Text className="text-success fw-bold">
                      ₹{item.price}
                    </Card.Text>
                    <div className="mt-auto">
                      <Button
                        variant="outline-danger"
                        className="w-100 mb-2"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
            <h4 className="mb-0">Total: ₹{totalAmount}</h4>
            <Button variant="success" size="lg" onClick={handleBuyNow}>
              💳 Buy Now
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
