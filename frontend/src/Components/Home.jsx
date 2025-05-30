import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import checklist from '../assets/checklist.png';

const HomePage = () => {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg,rgb(57, 103, 190), #2a5298)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Row className="w-100">
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
          <div>
            <h1 className="mb-3">Welcome to ProdManage</h1>
            <p style={{ fontSize: '1.1rem' }}>
              Effortlessly organize your product catalog—create, modify, view, and delete products with a few simple clicks.
            </p>
            <Link to="/products">
              <Button variant="outline-light" className="mt-3">
                View Products
              </Button>
            </Link>
          </div>
        </Col>
        <Col xs={12} md={6} className="text-center mt-4 mt-md-0">
          <img
            src="src\assets\checklist.png"
            alt="Checklist"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default HomePage;
