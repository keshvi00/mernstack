import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = () => {
  const [message, setMessage] = useState({ type: '', text: '' });

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/auth/login', values);
      
      localStorage.setItem('token', response.data.token);

      setMessage({ type: 'success', text: '✅ Login successful!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || '❌ Login failed. Please check credentials.',
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Login</h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-4">
                <label>Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
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

export default LoginForm;