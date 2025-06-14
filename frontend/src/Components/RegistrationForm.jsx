import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationForm = () => {
  const [message, setMessage] = useState({ type: '', text: '' });

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, 'Phone must be 10 to 15 digits')
      .required('Phone is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/users/register', values);
      setMessage({ type: 'success', text: '🎉 Registration successful!' });
      resetForm();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || '❌ Registration failed. Please try again.',
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Register</h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label>Full Name</label>
                <Field name="fullName" className="form-control" />
                <ErrorMessage name="fullName" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label>Phone</label>
                <Field name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-4">
                <label>Confirm Password</label>
                <Field name="confirmPassword" type="password" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>

              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mt-3 text-center`}>
                  {message.text}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
