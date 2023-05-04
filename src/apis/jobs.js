import axios from 'axios';
import _ from 'lodash';
import { generateAuthHeader } from '../utils';

export const fetchJobs = async () => {
  const response = await axios.get(`/api/job/`);
  return { data: _.get(response, 'data.jobs', []) };
};

export const createJob = async ({ jobName, description }) => {
  const createJobResponse = await axios.post(
    `/api/job`,
    {
      name: jobName,
      description,
      recruit: false,
    },
    generateAuthHeader()
  );
  const createJobResponseData = _.get(createJobResponse, 'data.job', null);

  return createJobResponseData;
};

export const updateJob = async ({ jobName, description, recruit, originalJobName }) => {
  const updatedJob = {
    name: jobName,
    description,
    recruit,
  };

  const updateJobResponse = await axios.patch(
    `/api/job/${originalJobName || jobName}`,
    updatedJob,
    generateAuthHeader()
  );
  const updateJobResponseData = _.get(updateJobResponse, 'data.job', null);

  return updateJobResponseData;
};
