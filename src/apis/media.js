import axios from 'axios';
import _ from 'lodash';
import { generateAuthHeader } from '../utils';

export const uploadImage = async (image, imageName) => {
  const fileReader = new FileReader();

  fileReader.onload = async (item) => {
    const imageFile = item.target.result;
    const blob = new Blob([imageFile], {
      type: image.type,
    });
    const blobName = imageName;

    const form = new FormData();
    form.append('file', blob, blobName);
    await axios.post(`/api/media/upload`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ..._.get(generateAuthHeader(), 'headers', {}),
      },
    });
  };

  fileReader.readAsArrayBuffer(image);
};
