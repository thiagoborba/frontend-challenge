import axios from 'axios'
import { ENDPOINT } from '../../constants';

export const request = axios.create({
  baseURL: ENDPOINT.BASE()
});