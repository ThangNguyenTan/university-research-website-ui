import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getPeople } from '../../apis';

// Components
import { Navigator, Footer, HelmetMeta, Article } from '../../components';

function PeopleSingle() {
  const { name: selectedName } = useParams();

  // Queries
  const {
    isLoading,
    isError,
    data: person,
    error,
  } = useQuery({
    queryKey: ['getPeople', selectedName],
    queryFn: () => getPeople(selectedName),
  });

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h3>Something went wrong while fetching persons</h3>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    const {
      name,
      email,
      role: { name: roleName },
      job: { name: jobName },
      coverImagePath,
      description,
      researchHighlights,
    } = person;

    return (
      <>
        <HelmetMeta title={name} description={description} />
        <Row>
          <Col xl="12">
            <div className="person-single">
              <h1 className="person-single__name page-title">{name}</h1>
              <h4
                style={{
                  marginBottom: '2em',
                  marginTop: '-35px',
                }}
              >
                {roleName} - {jobName}
              </h4>
              <Row>
                <Col md="8" xl="3" className="person-single__image text-center mb-4">
                  <img className="img-fluid" src={`${coverImagePath}`} alt={name} />
                </Col>
                <Col md="12" xl="7" className="person-single__content">
                  <p className="pre-wrap">{parse(description)}</p>
                  <p>
                    <b>Email:</b> {email}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
          <Col lg="12">
            <h3 style={{ marginBottom: '2rem' }}>Research Highlights</h3>
            <Row>
              {researchHighlights.map((research) => (
                <Col md="6" lg="4" xl="3" key={_.get(research, 'title', '')}>
                  <Article
                    title={_.get(research, 'title', '')}
                    description={_.get(research, 'description', '')}
                    thumbnail={_.get(research, 'coverImagePath', '')}
                    createdYear={_.get(research, 'publish', '')}
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

export default PeopleSingle;
