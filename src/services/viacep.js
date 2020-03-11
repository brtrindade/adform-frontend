import axios from 'axios';

const viacep = axios.create({
  baseURL: 'http://viacep.com.br/ws/'
});

export default viacep;