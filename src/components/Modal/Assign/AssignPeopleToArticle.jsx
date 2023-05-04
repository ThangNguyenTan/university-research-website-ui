import React from 'react';
import { Form, Modal, Button, Table, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import {
  fetchPeople,
  assignPeopleToPublication,
  getPublication,
  removePeopleFromPublication,
} from '../../../apis';
import { createToast } from '../../../utils';

// Schema for yup
const validationSchema = Yup.object().shape({
  participant: Yup.string().required('*Participant is required'),
});

function AssignPeopleToArticle({ show, setShow, afterEffect, selectedPublicationName }) {
  const handleClose = () => setShow(false);

  // Queries
  const fetchPeopleQuery = useQuery({
    queryKey: ['fetchPeople'],
    queryFn: () => fetchPeople(0),
  });
  const getPublicationQuery = useQuery({
    queryKey: ['getPublication'],
    queryFn: () => getPublication(selectedPublicationName),
  });

  const mutation = useMutation({
    mutationFn: (participant) => assignPeopleToPublication(selectedPublicationName, participant),
  });
  const removeAssignmentmutation = useMutation({
    mutationFn: (participant) => removePeopleFromPublication(selectedPublicationName, participant),
  });

  if (show && !selectedPublicationName) {
    setShow(false);
    createToast('Failed to load article', 'error');
    return <></>;
  }

  const handleDisplayRelationshipTable = () => {
    const { isLoading, isError, error, data } = getPublicationQuery;

    if (!isLoading && isError) {
      return (
        <>
          <h4>Something went wrong while fetching participants</h4>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h4>Loading...</h4>;
    }

    const participants = _.get(data, 'participants', []);

    if (participants.length === 0) {
      return <h4>No participant for this publication</h4>;
    }

    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Participant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => {
            const { _id: id, name } = participant;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Button
                        variant="danger"
                        onClick={() => {
                          removeAssignmentmutation.mutate(
                            { participant: id },
                            {
                              onSuccess: () => {
                                createToast('Successfully removed participant', 'success');
                                afterEffect();
                                getPublicationQuery.refetch();
                              },
                              onError: () => {
                                createToast('Failed to remove participant', 'error');
                              },
                            }
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const handleDisplayPeople = () => {
    const { isLoading, isError, data } = fetchPeopleQuery;

    if (!isLoading && isError) {
      return <></>;
    }

    if (isLoading) {
      return <></>;
    }

    let people = _.get(data, 'data', []);

    if (people.length === 0) {
      return <option value="">No participant for this publication</option>;
    }

    people = _.orderBy(people, ['name'], ['asc']);

    return people.map((person) => {
      const personName = _.get(person, 'name', '');
      const personId = _.get(person, '_id', '');
      return (
        <option key={personId} value={personId}>
          {personName}
        </option>
      );
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Assign Person to Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              participant: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                  createToast('Successfully assigned participant', 'success');
                  setSubmitting(false);
                  afterEffect();
                  getPublicationQuery.refetch();
                },
                onError: () => {
                  createToast('Failed to assign participant', 'error');
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
                  <Form.Label>Participant:</Form.Label>
                  <Form.Select
                    name="participant"
                    placeholder="Participant"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.participant}
                    className={touched.participant && errors.participant ? 'has-error' : null}
                  >
                    <option value="" disabled>
                      Choose your participant
                    </option>
                    {handleDisplayPeople()}
                  </Form.Select>
                  {touched.participant && errors.participant ? (
                    <div className="error-message">{errors.participant}</div>
                  ) : null}
                </Form.Group>
                <Button className="btn-block" variant="dark" type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </Form>
            )}
          </Formik>

          <h3 className="mt-4">Participants</h3>
          {handleDisplayRelationshipTable()}
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

AssignPeopleToArticle.defaultProps = {
  afterEffect: () => {},
  selectedPublicationName: null,
};

AssignPeopleToArticle.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  selectedPublicationName: PropTypes.string,
  afterEffect: PropTypes.func,
};

export default AssignPeopleToArticle;
