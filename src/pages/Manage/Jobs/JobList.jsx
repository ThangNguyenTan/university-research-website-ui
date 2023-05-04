import React, { useState } from 'react';
import { Row, Col, Table, Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchJobs, updateJob } from '../../../apis';

// Components
import { Navigator, Footer, CreateJobModal, UpdateJobModal } from '../../../components';

import './manage-jobs.css';
import { createToast } from '../../../utils';

function JobList() {
  const [isCreateJobPopupShow, setCreateJobPopupShow] = useState(false);
  const [isUpdateJobPopupShow, setUpdateJobPopupShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Queries
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['fetchJobs'],
    queryFn: () => fetchJobs(),
  });
  let jobs = _.get(data, 'data', []);

  // Mutations
  const mutation = useMutation({
    mutationFn: (job) => updateJob(job),
  });

  const handleDisplayJobStatus = (job) => {
    const isRecruiting = _.get(job, 'recruit', false);
    const jobName = _.get(job, 'name', '');
    if (isRecruiting) {
      return (
        <Button
          variant="success"
          onClick={() => {
            mutation.mutate(
              { ...job, jobName, recruit: !isRecruiting },
              {
                onSuccess: () => {
                  refetch();
                  createToast('Successfully updated job', 'success');
                },
                onError: () => {
                  createToast('Failed to update job', 'error');
                },
              }
            );
          }}
        >
          Recruiting
        </Button>
      );
    }
    return (
      <Button
        variant="danger"
        onClick={() => {
          mutation.mutate(
            { ...job, jobName, recruit: !isRecruiting },
            {
              onSuccess: () => {
                refetch();
                createToast('Successfully updated job', 'success');
              },
              onError: () => {
                createToast('Failed to update job', 'error');
              },
            }
          );
        }}
      >
        Not Recruiting
      </Button>
    );
  };

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h3>Something went wrong while fetching job</h3>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h2>Loading...</h2>;
    }

    if (jobs.length === 0) {
      return <h2>To view the list you are required to create a job</h2>;
    }

    jobs = _.orderBy(jobs, ['name'], ['asc']);

    return (
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Job Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const { _id: id, name: jobName } = job;
            return (
              <tr key={id}>
                <td>{jobName}</td>
                <td>{handleDisplayJobStatus(job)}</td>
                <td>
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                      <Button
                        variant="warning"
                        onClick={() => {
                          setSelectedJob(job);
                          setUpdateJobPopupShow(true);
                        }}
                      >
                        Edit
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

  return (
    <>
      <Helmet>
        <title>Manage Job - LabMI - Harvard</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div id="manage-job-page">
        <Navigator isAdminPage />
        <main id="manage-job-main" className="page-main">
          <CreateJobModal
            show={isCreateJobPopupShow}
            setShow={setCreateJobPopupShow}
            afterEffect={() => {
              refetch();
            }}
          />
          <UpdateJobModal
            show={isUpdateJobPopupShow}
            setShow={setUpdateJobPopupShow}
            afterEffect={() => {
              refetch();
            }}
            selectedJob={selectedJob}
          />
          <Container>
            <Row>
              <Col lg="12" xl="12">
                <h1 className="page-title">Manage Job</h1>

                <Button
                  type="button"
                  variant="dark"
                  onClick={() => {
                    setCreateJobPopupShow(true);
                  }}
                  style={{
                    marginBottom: '20px',
                  }}
                >
                  Create Job
                </Button>

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

export default JobList;
