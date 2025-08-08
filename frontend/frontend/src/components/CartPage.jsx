import React from 'react';
import { useCart } from './Cartcontext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div style={styles.pageBackground}>
      <Container
        className="mt-5 p-4 rounded"
        style={styles.containerBackdrop}
      >
        <h2
          className="mb-5 fw-bold text-center"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#6b2e00" }}
        >
          🛒 Your Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <p
            className="text-center text-muted"
            style={{ fontSize: '1.2rem', fontWeight: '500' }}
          >
            Your cart is empty.
          </p>
        ) : (
          <>
            <Row>
              {cartItems.map((item, index) => (
                <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                  <Card
                    className="shadow-sm border-0 h-100"
                    style={{
                      borderRadius: '15px',
                      transition: 'transform 0.3s ease',
                      backgroundColor: '#fff8f0',
                      boxShadow: '0 6px 10px rgba(255, 135, 77, 0.3)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title
                        className="fw-semibold"
                        style={{ color: '#d35400', fontSize: '1.3rem' }}
                      >
                        {item.name}
                      </Card.Title>
                      <Card.Text
                        className="text-success fw-bold"
                        style={{ fontSize: '1.15rem' }}
                      >
                        ₹{item.price}
                      </Card.Text>
                      <div className="mt-auto">
                        <Button
                          variant="outline-danger"
                          className="w-100 mb-2"
                          style={{ fontWeight: '600', letterSpacing: '0.05em' }}
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

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="warning"
                size="lg"
                style={{
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  fontWeight: '700',
                  fontSize: '1.3rem',
                  borderRadius: '50px',
                  boxShadow: '0 6px 20px rgba(255, 165, 0, 0.7)',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  color: '#7f3700',
                }}
                onClick={handleBuyNow}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#ff9e1b';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 160, 0, 0.9)';
                  e.currentTarget.style.color = '#4b2200';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 165, 0, 0.7)';
                  e.currentTarget.style.color = '#7f3700';
                }}
              >
                💳 Buy Now
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, #fceabb 0%, #f8b500 100%)`,
    backgroundImage: `
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 10%, transparent 20%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 15%, transparent 25%)`,
    backgroundRepeat: 'repeat',
    backgroundSize: '150px 150px',
    padding: '2rem 0',
  },
  containerBackdrop: {
    backgroundColor: 'rgba(255, 250, 240, 0.85)',
    boxShadow: '0 8px 30px rgba(255, 155, 0, 0.3)',
  },
};

export default CartPage;
