import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from './Cartcontext'; // ✅ adjust path if needed

const Productcard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card className='shadow-sm h-100'>
      <Card.Img variant='top' src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> {item.price}
        </Card.Text>
        <Button variant='success' onClick={() => addToCart(item)}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Productcard;
