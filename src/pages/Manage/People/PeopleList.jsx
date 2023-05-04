import React, { useState } from 'react';
import { Row, Col, Table, Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchPeople, deletePeople } from '../../../apis';

// Components
import { Navigator, Footer, Paginator, ConfirmationBox } from '../../../components';

import './manage-people.css';
import { createToast } from '../../../utils';

function PeopleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupShow, setDeletePopupShow] = useState(false);
  const [deletedPeopleName, setdeletedPeopleName] = useState(null);

  // Queries
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['fetchPeople', currentPage],
    queryFn: () => fetchPeople(currentPage),
  });
  let people = _.get(data, 'data', []);
  const meta = _.get(data, 'meta', {});

  const mutation = useMutation({
    mutationFn: (name) => deletePeople(name),
  });

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h3>Something went wrong while fetching people</h3>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h2>Loading...</h2>;
    }

    if (people.length === 0) {
      return <h2>To view the list you are required to create a person</h2>;
    }

    people = _.orderBy(people, ['name'], ['asc']);

    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Job</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            const { _id: id, name, email } = person;
            const roleName = _.get(person, 'role.name', '');
            const jobName = _.get(person, 'job.name', '');
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{roleName}</td>
                <td>{jobName}</td>
                <td>
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                      <Link className="btn btn-warning" to={`/manage/people/edit/${name}`}>
                        Edit
                      </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Button
                        variant="danger"
                        onClick={() => {
                          setdeletedPeopleName(name);
                          setDeletePopupShow(true);
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

  const onChangePageNumber = (page) => {
    setCurrentPage(page);
  };

  const onDeleteConfirmed = () => {
    mutation.mutate(deletedPeopleName, {
      onSuccess: () => {
        createToast('Successfully deleted people', 'success');
        setDeletePopupShow(false);
        refetch(currentPage);
      },
      onError: () => {
        createToast('Failed to delete people', 'error');
        setDeletePopupShow(false);
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage People - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div id="manage-people-page">
        <Navigator isAdminPage />
        <main id="manage-people-main" className="page-main">
          <Container>
            <ConfirmationBox
              show={isDeletePopupShow}
              setShow={setDeletePopupShow}
              title="Delete People"
              description="Are you sure, you want to delete the people? Once deleted it's gone forever."
              onConfirm={onDeleteConfirmed}
            />
            <Row>
              <Col lg="12" xl="12">
                <h1 className="page-title">Manage People</h1>

                <Link className="mb-4 btn btn-dark" to="/manage/people/create">
                  Create People
                </Link>

                {handleDisplayMain()}
              </Col>
              <Col xl="12">
                <div className="paginator-center">
                  {!isLoading && !isError && _.get(meta, 'totalItems', 0) !== 0 && (
                    <Paginator
                      totalItems={_.get(meta, 'totalItems', 0)}
                      onChangePageNumber={onChangePageNumber}
                      currentPageParam={_.get(meta, 'currentPage', 0)}
                      pageSize={_.get(meta, 'pageSize', 0)}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PeopleList;
