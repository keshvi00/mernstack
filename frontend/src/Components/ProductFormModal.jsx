import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductFormModal = ({ show, handleClose, onSubmit, initialValues }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    image: Yup.string()
      .url('Must be a valid URL')
      .required('Image URL is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialValues.id ? 'Edit' : 'Add'} Product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          handleClose();
        }}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Field name="title" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="title" />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Field name="image" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="image" />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Field name="description" as="textarea" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="description" />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Field name="price" className="form-control" />
                <div className="text-danger">
                  <ErrorMessage name="price" />
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {initialValues.id ? 'Update' : 'Add'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default ProductFormModal;
