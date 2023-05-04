import axios from 'axios';
import _ from 'lodash';
import { generateAuthHeader } from '../utils';

export const fetchRoles = async () => {
  const response = await axios.get(`/api/role/`);
  return { data: _.get(response, 'data.roles', []) };
};

export const createRole = async ({ roleName, description }) => {
  const createRoleResponse = await axios.post(
    `/api/role`,
    {
      name: roleName,
      description,
    },
    generateAuthHeader()
  );
  const createRoleResponseData = _.get(createRoleResponse, 'data.role', null);

  return createRoleResponseData;
};
