import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createRole } from '../../../apis';
import { createToast } from '../../../utils';

// Schema for yup
const validationSchema = Yup.object().shape({
  roleName: Yup.string().required('*Role name is required'),
  description: Yup.string(),
});

function CreateRoleModal({ show, setShow, afterEffect }) {
  const handleClose = () => setShow(false);

  const mutation = useMutation({
    mutationFn: (role) => createRole(role),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              roleName: '',
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  createToast('Successfully created role', 'success');
                  setSubmitting(false);
                  afterEffect();
                  setShow(false);
                },
                onError: () => {
                  createToast('Failed to create role', 'error');
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
                  <Form.Label>Role Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="roleName"
                    placeholder="Role Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.roleName}
                    className={touched.roleName && errors.roleName ? 'has-error' : null}
                  />
                  {touched.roleName && errors.roleName ? (
                    <div className="error-message">{errors.roleName}</div>
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

CreateRoleModal.defaultProps = {
  afterEffect: () => {},
};

CreateRoleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  afterEffect: PropTypes.func,
};

export default CreateRoleModal;
