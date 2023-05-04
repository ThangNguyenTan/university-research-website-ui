import axios from 'axios';
import _ from 'lodash';

export const login = async ({ username, password }) => {
  const loginResponse = await axios.post(`/api/auth`, { username, password });
  const loginResponseData = _.get(loginResponse, 'data', null);

  return loginResponseData;
};
