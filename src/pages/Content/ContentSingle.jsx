import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getPublication } from '../../apis';

// Components
import { Navigator, Footer, HelmetMeta, Person } from '../../components';

function ContentSingle() {
  const { title: selectedTitle } = useParams();

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
      return <h2>Loading...</h2>;
    }

    const { title, content, contentImagePath, hyperlink, type, participants } = article;
    const colWidth = type === 'news' ? '6' : '12';
    const mainColWidth = type === 'news' ? '9' : '7';

    return (
      <>
        <HelmetMeta title={title} description={content} />
        <Row>
          <Col lg="12" xl={mainColWidth}>
            <div className="article-single">
              <h1 className="article-single__title">{title}</h1>
              <Row>
                <Col lg={colWidth} className="article-single__image text-center mb-4">
                  <img className="img-fluid" src={`${contentImagePath}`} alt={title} />
                </Col>
                <Col lg={colWidth} className="article-single__content">
                  <p className="pre-wrap">{parse(content)}</p>
                  <a
                    className="btn btn-outline-dark large"
                    type="button"
                    href={hyperlink}
                    target="_blank"
                    rel="noreferrer"
                    alt={title}
                  >
                    LEARN MORE
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
          <Col lg="12" xl="9">
            <h3 style={{ marginBottom: '2rem' }}>Participants</h3>
            <Row>
              {participants.map((person) => (
                <Col md="6" lg="4" xl="3" key={_.get(person, 'name', '')}>
                  <Person
                    name={_.get(person, 'name', '')}
                    title={_.get(person, 'job.name', '')}
                    image={_.get(person, 'coverImagePath', '')}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <div id="content-single-page">
        <Navigator />
        <main id="content-single-main" className="page-main">
          <Container>
            <Row>{handleDisplayMain()}</Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ContentSingle;
