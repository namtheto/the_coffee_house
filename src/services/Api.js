import axios from 'axios'
export const instance = axios.create({
  baseURL: 'https://api.thecoffeehouse.com/api',
//   timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});
export const instance1 = axios.create({
  baseURL: 'https://api.thecoffeehouse.com/api',
//timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});
export const getProduct = (params) => instance.get('/v2/menu', params)
export const getAllStore = (params) => instance1.get('/get_all_store', params)