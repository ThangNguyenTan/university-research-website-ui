/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import { Row, Col, Form, Container, Button, InputGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

// Components
import { Navigator, Footer, CreateJobModal, CreateRoleModal } from '../../../components';

import './manage-people.css';
import { createToast } from '../../../utils';
import { createPeople, fetchJobs, fetchRoles } from '../../../apis';
import { SUPPORTED_IMAGE_TYPES } from '../../../constants';

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('*Name is required'),
  email: Yup.string().email().required('*Email is required'),
  role: Yup.string().required('*Role is required'),
  job: Yup.string().required('*Job is required'),
  coverImagePath: Yup.mixed()
    .required('*Image is required')
    .test({
      message: '*File type must be png, jpeg, jpg, jpe',
      test: (fileName, context) => {
        if (!fileName) return true;
        const isValid = SUPPORTED_IMAGE_TYPES.includes(fileName.split('.').pop());
        if (!isValid) context.createError();
        return isValid;
      },
    }),
  description: Yup.string().required('*Description is required'),
});

function PeopleCreate() {
  const navigate = useNavigate();

  const [isCreateRolePopupShow, setCreateRolePopupShow] = useState(false);
  const [isCreateJobPopupShow, setCreateJobPopupShow] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const fetchJobsQuery = useQuery({
    queryKey: ['fetchJobs'],
    queryFn: () => fetchJobs(),
  });
  const fetchRolesQuery = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: () => fetchRoles(),
  });
  const jobs = _.get(fetchJobsQuery, 'data.data', []);
  const roles = _.get(fetchRolesQuery, 'data.data', []);

  const mutation = useMutation({
    mutationFn: (publication) => createPeople(publication),
  });

  return (
    <>
      <Helmet>
        <title>Create People - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CreateJobModal
        show={isCreateJobPopupShow}
        setShow={setCreateJobPopupShow}
        afterEffect={() => {
          fetchJobsQuery.refetch();
        }}
      />
      <CreateRoleModal
        show={isCreateRolePopupShow}
        setShow={setCreateRolePopupShow}
        afterEffect={() => {
          fetchRolesQuery.refetch();
        }}
      />
      <div id="manage-peoples-page">
        <Navigator isAdminPage />
        <main id="manage-peoples-main" className="page-main">
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <h1 className="page-title">Create People</h1>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    job: '',
                    role: '',
                    coverImagePath: '',
                    description: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    mutation.mutate(
                      { ...values, coverImageFile },
                      {
                        onSuccess: () => {
                          resetForm();
                          createToast('Successfully created people', 'success');
                          setSubmitting(false);
                          navigate('/manage/people');
                        },
                        onError: () => {
                          createToast('Failed to create people', 'error');
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
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className={touched.name && errors.name ? 'has-error' : null}
                        />
                        {touched.name && errors.name ? (
                          <div className="error-message">{errors.name}</div>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className={touched.email && errors.email ? 'has-error' : null}
                        />
                        {touched.email && errors.email ? (
                          <div className="error-message">{errors.email}</div>
                        ) : null}
                      </Form.Group>
                      <Row>
                        <Col lg="12">
                          <Form.Group>
                            <Form.Label>Role:</Form.Label>
                            <InputGroup>
                              <Form.Select
                                name="role"
                                placeholder="Role"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.role}
                                className={touched.role && errors.role ? 'has-error' : null}
                              >
                                <option value="" disabled>
                                  Select role
                                </option>
                                {roles.map((role) => {
                                  const { _id: id, name: roleName } = role;
                                  return (
                                    <option value={id} key={id}>
                                      {roleName}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <Button
                                type="button"
                                style={{
                                  borderBottomRightRadius: '0.375rem',
                                  borderTopRightRadius: '0.375rem',
                                }}
                                variant="dark"
                                onClick={() => {
                                  setCreateRolePopupShow(true);
                                }}
                              >
                                Create
                              </Button>
                              {touched.role && errors.role ? (
                                <div style={{ width: '100%' }} className="error-message">
                                  {errors.role}
                                </div>
                              ) : null}
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <Form.Group>
                            <Form.Label>Job:</Form.Label>
                            <InputGroup>
                              <Form.Select
                                name="job"
                                placeholder="Job"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.job}
                                className={touched.job && errors.job ? 'has-error' : null}
                              >
                                <option value="" disabled>
                                  Select job
                                </option>
                                {jobs.map((job) => {
                                  const { _id: id, name: jobName } = job;
                                  return (
                                    <option value={id} key={id}>
                                      {jobName}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <Button
                                type="button"
                                style={{
                                  borderBottomRightRadius: '0.375rem',
                                  borderTopRightRadius: '0.375rem',
                                }}
                                variant="dark"
                                onClick={() => {
                                  setCreateJobPopupShow(true);
                                }}
                              >
                                Create
                              </Button>
                              {touched.job && errors.job ? (
                                <div style={{ width: '100%' }} className="error-message">
                                  {errors.job}
                                </div>
                              ) : null}
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Image: </Form.Label>
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
                      <Row className="mt-4">
                        <Col xs="6">
                          <Link to="/manage/people" className="btn btn-block btn-light">
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
                            Create
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PeopleCreate;
