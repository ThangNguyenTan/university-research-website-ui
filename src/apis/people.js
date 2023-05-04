import axios from 'axios';
import _ from 'lodash';
import { buildMediaName, generateAuthHeader, metaNameMapping } from '../utils';
import { uploadImage } from './media';

export const fetchPeople = async (page = 1, size = 10) => {
  const response = await axios.get(`/api/people/?size=${size}&page=${page}`);
  const meta = metaNameMapping(_.get(response, 'data.meta', []));
  return { data: _.get(response, 'data.people', []), meta };
};

export const getPeople = async (name) => {
  const response = await axios.get(`/api/people/${name}`);
  return _.get(response, 'data.person', null);
};

export const createPeople = async ({ name, coverImageFile, email, description, job, role }) => {
  if (!coverImageFile) {
    throw new Error('Image files were not specified');
  }

  const coverImageName = buildMediaName(name, 'cover');

  await uploadImage(coverImageFile, coverImageName);

  const createPeopleResponse = await axios.post(
    `/api/people`,
    {
      name,
      email,
      coverImagePath: `https://storage.googleapis.com/university-research-33c63.appspot.com/${coverImageName}.`,
      description,
      job,
      role,
    },
    generateAuthHeader()
  );
  const createPeopleResponseData = _.get(createPeopleResponse, 'data.people', null);

  return createPeopleResponseData;
};

export const updatePeople = async (
  selectedName,
  { name, coverImageFile, email, description, job, role }
) => {
  const updatedPeople = {
    name,
    email,
    description,
    job,
    role,
  };
  let coverImageName = '';
  if (coverImageFile) {
    coverImageName = buildMediaName(name, 'cover');
    updatedPeople.coverImagePath = `https://storage.googleapis.com/university-research-33c63.appspot.com/${coverImageName}.`;
    await uploadImage(coverImageFile, coverImageName);
  }
  const updatePeopleResponse = await axios.patch(
    `/api/people/${selectedName}`,
    updatedPeople,
    generateAuthHeader()
  );
  const updatePeopleResponseData = _.get(updatePeopleResponse, 'data.people', null);

  return updatePeopleResponseData;
};

export const deletePeople = async (name) => {
  const deletePeopleResponse = await axios.delete(`/api/people/${name}`, generateAuthHeader());
  const deletePeopleResponseData = _.get(deletePeopleResponse, 'data.people', null);

  return deletePeopleResponseData;
};
