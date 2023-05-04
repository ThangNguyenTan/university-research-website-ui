import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchPublications } from '../../apis';

// Components
import { Navigator, Footer, HorizontalArticle, Paginator, HelmetMeta } from '../../components';

import './news.css';
import { ARTICLE_TYPES } from '../../constants';

function News() {
  const [currentPage, setCurrentPage] = useState(1);

  // Queries
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['fetchPublications', currentPage, ARTICLE_TYPES.NEWS],
    queryFn: () => fetchPublications(currentPage, ARTICLE_TYPES.NEWS),
  });
  const articles = _.get(data, 'data', []);
  const meta = _.get(data, 'meta', {});

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h2>Something went wrong while fetching articles</h2>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (articles.length === 0) {
      return <h2>Currently, there are no updates for this one</h2>;
    }

    return articles.map((article) => {
      const { title, description, coverImagePath, publish, type } = article;
      return (
        <div key={title}>
          <HorizontalArticle
            title={title}
            description={description}
            thumbnail={coverImagePath}
            createdYear={publish}
            category={type}
          />
        </div>
      );
    });
  };

  const onChangePageNumber = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HelmetMeta
        title="News"
        description="You can view the information of all news that we have posted on the website"
      />
      <div id="news-page">
        <Navigator />
        <main id="news-main" className="page-main">
          <Container>
            <Row>
              <Col lg="12" xl="8">
                <h1>News</h1>

                {handleDisplayMain()}
              </Col>
              <Col xl="12">
                {_.get(meta, 'totalItems', 0) !== 0 && (
                  <div className="paginator-center">
                    <Paginator
                      totalItems={_.get(meta, 'totalItems', 0)}
                      onChangePageNumber={onChangePageNumber}
                      currentPageParam={_.get(meta, 'currentPage', 0)}
                      pageSize={_.get(meta, 'pageSize', 0)}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default News;
