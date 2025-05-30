import React, { useState } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import Laptop from '../assets/Laptop.jpg';
import headphone from '../assets/headphone.jpg';
import watch from '../assets/watch.jpg';
const productList = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones',
    cost: '$120',
    image: headphone
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Smart wearable device with health tracking',
    cost: '$80',
    image: watch
  },
  {
    id: 3,
    name: 'Laptop',
    description: '14-inch Full HD display, 256GB SSD',
    cost: '$600',
    image: Laptop
  }
];
const ProductList = () => {
  const [items] = useState(productList);
  return (
    <Container style={{ padding: '2rem 0' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Our Products</h2>
        <Button variant="success">Add Product</Button>
      </div>
      <Row>
        {items.map((item) => (
          <Col xs={12} md={4} key={item.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <h5 style={{ color: '#198754' }}>{item.cost}</h5>
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <BsPencilSquare style={{ cursor: 'pointer' }} />
                  <BsFillTrashFill style={{ cursor: 'pointer', color: 'crimson' }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
