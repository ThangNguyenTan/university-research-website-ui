import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';

import { Navigator, Footer } from '../../components';
import useAuth from '../../hooks/useAuth';
import { login } from '../../apis';

import './login.css';
import { createToast } from '../../utils';

function Login() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: (val) => login(val),
  });

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  const onLogin = async (e) => {
    e.preventDefault();

    mutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          const accessToken = _.get(data, 'token', null);
          if (accessToken) {
            createToast('Successfully logged in', 'success');
            localStorage.setItem('x-auth-token', accessToken);
            setAuth(true);
            navigate('/manage/articles');
            return;
          }
          createToast('Failed to login', 'error');
        },
        onError: () => {
          createToast('Failed to login', 'error');
        },
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Login - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div id="login-page">
        <Navigator />
        <main id="login-main" className="page-main">
          <Container>
            <h1>Login</h1>

            <Row className="justify-content-center">
              <Col lg="6">
                <Form onSubmit={onLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button variant="outline-dark" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Login;
