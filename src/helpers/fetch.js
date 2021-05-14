import axios from 'axios';
const SWAPI_URL = process.env.VUE_APP_SWAPI_URL;

export const getInitialData = async () => {
    await delay(1000);
    const response = await axios.get(SWAPI_URL);
    return response.data;
}

export const getResponse = async (fullPath) => {
    const path = getPath(fullPath);
    await delay(1000);

    const { data } = await axios.get(`${SWAPI_URL}${path}`);
    const { next, previous, results } = data;
    return [ next, previous, results ];
}

export const getResponsePagination = async (pagination) => {
    const { data } = await axios.get(pagination);
    const { next, previous, results } = data;
    return [ next, previous, results ];
}

export const getDataById = async (path, id) => {
    await delay(1000);
    const { data } = await axios.get(`${SWAPI_URL}${path}/${id}`);
    return data;
}

const delay = (miliseconds) => {
    return new Promise ( resolve => {
        setTimeout(resolve, miliseconds)
    })
}

const getPath = (fullPath) => {
    let path_array = fullPath.split('/');
    let path = path_array.pop();
    return path;
  }

