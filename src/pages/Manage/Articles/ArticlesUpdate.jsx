import React, { useState } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';

// Components
import { Navigator, Footer } from '../../../components';

import './manage-articles.css';
import { createToast, generateYearList } from '../../../utils';
import { getPublication, updatePublication } from '../../../apis';
import { SUPPORTED_IMAGE_TYPES } from '../../../constants';

// Schema for yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('*Title is required'),
  description: Yup.string().required('*Description is required'),
  content: Yup.string().required('*Content is required'),
  type: Yup.string().required('*Type is required'),
  publish: Yup.string().required('*Published year is required'),
  coverImagePath: Yup.mixed().test({
    message: '*File type must be png, jpeg, jpg, jpe',
    test: (fileName, context) => {
      if (!fileName) return true;
      const isValid = SUPPORTED_IMAGE_TYPES.includes(fileName.split('.').pop());
      if (!isValid) context.createError();
      return isValid;
    },
  }),
  contentImagePath: Yup.mixed().test({
    message: '*File type must be png, jpeg, jpg, jpe',
    test: (fileName, context) => {
      if (!fileName) return true;
      const isValid = SUPPORTED_IMAGE_TYPES.includes(fileName.split('.').pop());
      if (!isValid) context.createError();
      return isValid;
    },
  }),
  hyperlink: Yup.string()
    .url('*Must enter URL in http://www.example.com format')
    .required('*Hyperlink is required'),
});

function ArticlesUpdate() {
  const navigate = useNavigate();
  const { title: selectedTitle } = useParams();

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [contentImageFile, setContentImageFile] = useState(null);

  // Queries
  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery({
    queryKey: ['getPublication', selectedTitle],
    queryFn: () => getPublication(selectedTitle),
  });

  const mutation = useMutation({
    mutationFn: (publication) => updatePublication(selectedTitle, publication),
  });

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <h1 className="page-title">Something went wrong while fetching articles</h1>
              <p>{_.get(error, 'message', '')}</p>
            </Col>
          </Row>
        </Container>
      );
    }

    if (isLoading) {
      return (
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <h1 className="page-title">Loading...</h1>
            </Col>
          </Row>
        </Container>
      );
    }

    const { _id: id, title, content, type, description, hyperlink, publish } = article;

    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <h1 className="page-title">Update Article</h1>
            <Formik
              enableReinitialize
              initialValues={{
                title,
                type,
                content,
                description,
                hyperlink,
                publish,
                coverImagePath: '',
                contentImagePath: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                mutation.mutate(
                  { ...values, coverImageFile, contentImageFile, id },
                  {
                    onSuccess: () => {
                      setSubmitting(false);
                      createToast('Successfully updated article', 'success');
                      resetForm({
                        values: '',
                      });
                      navigate('/manage/articles');
                    },
                    onError: () => {
                      createToast('Failed to update article', 'error');
                      setSubmitting(false);
                    },
                  }
                );
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="mx-auto">
                  <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      className={touched.title && errors.title ? 'has-error' : null}
                    />
                    {touched.title && errors.title ? (
                      <div className="error-message">{errors.title}</div>
                    ) : null}
                  </Form.Group>
                  <Row>
                    <Col lg="6">
                      <Form.Group>
                        <Form.Label>Type:</Form.Label>
                        <Form.Select
                          name="type"
                          placeholder="Type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          className={touched.type && errors.type ? 'has-error' : null}
                        >
                          <option value="news">News</option>
                          <option value="publication">Publication</option>
                        </Form.Select>
                        {touched.type && errors.type ? (
                          <div className="error-message">{errors.type}</div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col lg="6">
                      <Form.Group>
                        <Form.Label>Published Year:</Form.Label>
                        <Form.Select
                          name="publish"
                          placeholder="Published Year"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.publish}
                          className={touched.publish && errors.publish ? 'has-error' : null}
                        >
                          {generateYearList().map((year) => (
                            <option value={year} key={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                        {touched.publish && errors.publish ? (
                          <div className="error-message">{errors.publish}</div>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>Hyperlink:</Form.Label>
                    <Form.Control
                      type="text"
                      name="hyperlink"
                      placeholder="Link to your article"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hyperlink}
                      className={touched.hyperlink && errors.hyperlink ? 'has-error' : null}
                    />
                    {touched.hyperlink && errors.hyperlink ? (
                      <div className="error-message">{errors.hyperlink}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Cover image: </Form.Label>
                    <Form.Control
                      type="file"
                      name="coverImagePath"
                      onChange={(e) => {
                        handleChange(e);
                        const file = e.target.files[0];
                        setCoverImageFile(file);
                      }}
                      onBlur={handleBlur}
                      value={values.coverImagePath}
                      className={
                        touched.coverImagePath && errors.coverImagePath ? 'has-error' : null
                      }
                      accept="image/png, image/gif, image/jpeg"
                    />
                    {touched.coverImagePath && errors.coverImagePath ? (
                      <div className="error-message">{errors.coverImagePath}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Content image: </Form.Label>
                    <Form.Control
                      type="file"
                      name="contentImagePath"
                      onChange={(e) => {
                        handleChange(e);
                        const file = e.target.files[0];
                        setContentImageFile(file);
                      }}
                      onBlur={handleBlur}
                      value={values.contentImagePath}
                      className={
                        touched.contentImagePath && errors.contentImagePath ? 'has-error' : null
                      }
                      accept="image/png, image/gif, image/jpeg"
                    />
                    {touched.contentImagePath && errors.contentImagePath ? (
                      <div className="error-message">{errors.contentImagePath}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      className={touched.description && errors.description ? 'has-error' : null}
                    />
                    {touched.description && errors.description ? (
                      <div className="error-message">{errors.description}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Content:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="content"
                      placeholder="Content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      className={touched.content && errors.content ? 'has-error' : null}
                    />
                    {touched.content && errors.content ? (
                      <div className="error-message">{errors.content}</div>
                    ) : null}
                  </Form.Group>
                  <Row className="mt-4">
                    <Col xs="6">
                      <Link to="/manage/articles" className="btn btn-block btn-light">
                        Back
                      </Link>
                    </Col>
                    <Col xs="6">
                      <Button
                        className="btn-block"
                        variant="dark"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <Helmet>
        <title>Update Article - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div id="manage-articles-page">
        <Navigator isAdminPage />
        <main id="manage-articles-main" className="page-main">
          {handleDisplayMain()}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ArticlesUpdate;
