import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createJob } from '../../../apis';
import { createToast } from '../../../utils';

// Schema for yup
const validationSchema = Yup.object().shape({
  jobName: Yup.string().required('*Job name is required'),
  description: Yup.string(),
});

function CreateJobModal({ show, setShow, afterEffect }) {
  const handleClose = () => setShow(false);

  const mutation = useMutation({
    mutationFn: (job) => createJob(job),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              jobName: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  createToast('Successfully created job', 'success');
                  setSubmitting(false);
                  afterEffect();
                  setShow(false);
                },
                onError: () => {
                  createToast('Failed to create job', 'error');
                  setSubmitting(false);
                },
              });
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
                  <Form.Label>Job Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobName"
                    placeholder="Job Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.jobName}
                    className={touched.jobName && errors.jobName ? 'has-error' : null}
                  />
                  {touched.jobName && errors.jobName ? (
                    <div className="error-message">{errors.jobName}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
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
                <Button className="btn-block" variant="dark" type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CreateJobModal.defaultProps = {
  afterEffect: () => {},
};

CreateJobModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  afterEffect: PropTypes.func,
};

export default CreateJobModal;
