import axios from 'axios';
import { BASE_API_URL } from '../constants';

axios.defaults.baseURL = BASE_API_URL;

export * from './publications';
export * from './people';
export * from './roles';
export * from './jobs';
export * from './auth';
