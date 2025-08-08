import React from 'react';
import { useCart } from './Cartcontext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          {cartItems.map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: {item.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(index)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
