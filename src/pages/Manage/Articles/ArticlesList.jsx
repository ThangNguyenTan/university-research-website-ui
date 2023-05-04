import React, { useState } from 'react';
import { Row, Col, Table, Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchPublications, deletePublication } from '../../../apis';

// Components
import { Navigator, Footer, Paginator, ConfirmationBox } from '../../../components';

import './manage-articles.css';
import { createToast } from '../../../utils';

function ArticlesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupShow, setDeletePopupShow] = useState(false);
  const [deletedArticleTitle, setDeletedArticleTitle] = useState(null);

  // Queries
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['fetchPublications', currentPage],
    queryFn: () => fetchPublications(currentPage),
  });
  const articles = _.get(data, 'data', []);
  const meta = _.get(data, 'meta', {});

  const mutation = useMutation({
    mutationFn: (title) => deletePublication(title),
  });

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h3>Something went wrong while fetching articles</h3>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h2>Loading...</h2>;
    }

    if (articles.length === 0) {
      return <h2>To view the list you are required to create an article</h2>;
    }

    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Published Year</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const { title, publish, type, createdDate } = article;
            return (
              <tr key={title}>
                <td>{title}</td>
                <td>{type}</td>
                <td>{publish}</td>
                <td>{moment(createdDate).local().format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                      <Link className="btn btn-warning" to={`/manage/articles/edit/${title}`}>
                        Edit
                      </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeletedArticleTitle(title);
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
    mutation.mutate(deletedArticleTitle, {
      onSuccess: () => {
        createToast('Successfully deleted article', 'success');
        setDeletePopupShow(false);
        refetch(currentPage);
      },
      onError: () => {
        createToast('Failed to delete article', 'error');
        setDeletePopupShow(false);
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Articles - UniR&D - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div id="manage-articles-page">
        <Navigator isAdminPage />
        <main id="manage-articles-main" className="page-main">
          <Container>
            <ConfirmationBox
              show={isDeletePopupShow}
              setShow={setDeletePopupShow}
              title="Delete Article"
              description="Are you sure, you want to delete the article? Once deleted it's gone forever."
              onConfirm={onDeleteConfirmed}
            />
            <Row>
              <Col lg="12" xl="12">
                <h1 className="page-title">Manage Articles</h1>

                <Link className="mb-4 btn btn-dark" to="/manage/articles/create">
                  Create Article
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

export default ArticlesList;
