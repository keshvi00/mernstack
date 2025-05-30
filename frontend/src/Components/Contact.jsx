import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ContactPage = () => {
  return (
    <div style={{
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <div className="mb-2">
                <strong>Address:</strong>
                <p>123 React Avenue, UI Town, CA 90210</p>
              </div>
              <div className="mb-2">
                <strong>Email:</strong>
                <p>contact@prodmanage.com</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactPage;
