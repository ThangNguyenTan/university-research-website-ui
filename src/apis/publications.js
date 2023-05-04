import axios from 'axios';
import _ from 'lodash';
import { generateAuthHeader, metaNameMapping, buildMediaName } from '../utils';
import { uploadImage } from './media';

export const fetchPublications = async (page = 1, type = null, size = 10) => {
  const response = await axios.get(
    `/api/publication/?size=${size}&page=${page}${type ? `&type=${type}` : ''}`
  );
  const meta = metaNameMapping(_.get(response, 'data.meta', []));
  return { data: _.get(response, 'data.publications', []), meta };
};

export const getPublication = async (title) => {
  const response = await axios.get(`/api/publication/${title}`);
  return _.get(response, 'data.publication', null);
};

export const createPublication = async ({
  title,
  publish,
  coverImageFile,
  description,
  contentImageFile,
  content,
  hyperlink,
  type,
}) => {
  if (!contentImageFile || !coverImageFile) {
    throw new Error('Image files were not specified');
  }

  const coverImageName = buildMediaName(title, 'cover');
  const contentImageName = buildMediaName(title, 'content');

  await uploadImage(coverImageFile, coverImageName);
  await uploadImage(contentImageFile, contentImageName);

  const createPublicationResponse = await axios.post(
    `/api/publication`,
    {
      title,
      publish,
      coverImagePath: `https://storage.googleapis.com/university-research-33c63.appspot.com/${coverImageName}.`,
      description,
      contentImagePath: `https://storage.googleapis.com/university-research-33c63.appspot.com/${contentImageName}.`,
      content,
      hyperlink,
      type,
    },
    generateAuthHeader()
  );

  const createPublicationResponseData = _.get(createPublicationResponse, 'data.publication', null);

  return createPublicationResponseData;
};

export const updatePublication = async (
  selectedTitle,
  { title, publish, coverImageFile, description, contentImageFile, content, hyperlink, type }
) => {
  const updatedPublication = {
    title,
    publish,
    description,
    content,
    hyperlink,
    type,
  };
  let coverImageName = '';
  let contentImageName = '';

  if (coverImageFile) {
    coverImageName = buildMediaName(title, 'cover');
    updatedPublication.coverImagePath = `https://storage.googleapis.com/university-research-33c63.appspot.com/${coverImageName}.`;
    await uploadImage(coverImageFile, coverImageName);
  }
  if (contentImageFile) {
    contentImageName = buildMediaName(title, 'content');
    updatedPublication.contentImagePath = `https://storage.googleapis.com/university-research-33c63.appspot.com/${contentImageName}.`;
    await uploadImage(contentImageFile, contentImageName);
  }

  const updatePublicationResponse = await axios.patch(
    `/api/publication/${selectedTitle}`,
    updatedPublication,
    generateAuthHeader()
  );
  const updatePublicationResponseData = _.get(updatePublicationResponse, 'data.publication', null);

  return updatePublicationResponseData;
};

export const deletePublication = async (title) => {
  const deletePublicationResponse = await axios.delete(
    `/api/publication/${title}`,
    generateAuthHeader()
  );
  const deletePublicationResponseData = _.get(deletePublicationResponse, 'data.publication', null);

  return deletePublicationResponseData;
};

export const assignPeopleToPublication = async (selectedTitle, { participant }) => {
  const updatePublicationResponse = await axios.patch(
    `/api/publication/${selectedTitle}/participants/${participant}`,
    {},
    generateAuthHeader()
  );
  const updatePublicationResponseData = _.get(updatePublicationResponse, 'data', null);
  return updatePublicationResponseData;
};

export const removePeopleFromPublication = async (selectedTitle, { participant }) => {
  const removePublicationResponse = await axios.delete(
    `/api/publication/${selectedTitle}/participants/${participant}`,
    generateAuthHeader()
  );
  const removePublicationResponseData = _.get(removePublicationResponse, 'data', null);
  return removePublicationResponseData;
};
