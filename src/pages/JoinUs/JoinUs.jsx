import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';

// Components
import { Navigator, Footer, HelmetMeta, JobItem } from '../../components';

import './join-us.css';
import { fetchJobs } from '../../apis';

function JoinUs() {
  // Queries
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['fetchJobs'],
    queryFn: () => fetchJobs(),
  });
  let jobs = _.get(data, 'data', []);

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

    const filteredJobs = jobs.filter((job) => job.recruit);

    if (filteredJobs.length === 0) {
      return <h2>Currently, there are no updates for this one</h2>;
    }

    jobs = _.orderBy(jobs, ['name'], ['asc']);

    return jobs.map((article) => {
      const { name: jobName, description, recruit: isRecruiting } = article;
      if (!isRecruiting) {
        return <></>;
      }
      return <JobItem key={jobName} jobName={jobName} description={description} />;
    });
  };

  return (
    <>
      <HelmetMeta
        title="Join Us"
        description="We are looking for excellent candidates that want to apply deep learning
                  algorithms to medical problems. This will be done at the cross-section of clinical
                  fields (including radiology, oncology, and cardiology) with deep learning and
                  computer science. For this we have access to unique datasets from research
                  institutions throughout the United States and Europe."
      />
      <div id="join-us-page">
        <Navigator />
        <main id="join-us-main" className="page-main">
          <Container>
            <Row>
              <Col xs="12" lg="7" className="join-us-page__header">
                <h1>
                  Interested in Artificial Intelligence Laboratory for Advanced BioMedical Imaging?
                  Apply today
                </h1>
              </Col>
              <Col xs="12" lg="7" className="join-us-page__content">
                {handleDisplayMain()}
              </Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default JoinUs;
