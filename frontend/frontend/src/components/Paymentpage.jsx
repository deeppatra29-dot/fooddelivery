import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(location.state?.price || 100);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load Razorpay SDK
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                'http://localhost:3000/api/payment/create-order',
                { amount }
            );

            const { orderId, currency } = data;

            const options = {
                key: 'rzp_test_zekbTRpy85Pqo4', // replace with env in production
                amount: amount * 100,
                currency,
                name: "Fooodyyy",
                description: "Service Payment",
                order_id: orderId,
                handler: async function (response) {
                    await axios.post(
                        'http://localhost:3000/api/payment/save-payment',
                        {
                            orderId,
                            paymentId: response.razorpay_payment_id,
                            amount,
                            currency,
                            status: 'success'
                        }
                    );
                    alert("✅ Payment Successful!");
                    navigate('/about');
                },
                prefill: {
                    name: "User",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#28a745" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error", error);
            alert("❌ Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <h3 className="text-center mb-4">💳 Payment</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        className="w-100"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Pay Now"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default PaymentPage;
