import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../redux/actions/productActions';
import ProductFormModal from './ProductFormModal';
import { Button, Spinner, Card, Row, Col } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingProduct({ title: '', image: '', description: '', price: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSubmit = (productData) => {
    if (productData.id) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(createProduct(productData));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>
      <Button onClick={handleAdd} className="mb-3">
        Add Product
      </Button>

      {loading && <Spinner animation="border" />}

      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.image} height="150" />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  <BsPencil /> Edit
                </Button>{' '}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <BsTrash /> Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <ProductFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialValues={editingProduct || { title: '', image: '', description: '', price: '' }}
      />
    </div>
  );
};

export default Products;
