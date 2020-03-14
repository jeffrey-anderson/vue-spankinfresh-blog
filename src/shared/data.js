import * as axios from 'axios';
import {API} from './config';
const statusDescriptions = new Map([
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [405, 'Method Not Allowed'],
    [409, 'Conflict'],
    [500, 'Internal Server Error'],
    [501, 'Not Implemented'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable'],
    [504, 'Gateway Timeout'],
]);

export const getAllArticles = async function () {
    try {
        const response = await axios.get(`${API}/articles`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};


export const getCategories = async function () {
    try {
        const response = await axios.get(`${API}/categories`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};


export const getArticlesByCategory = async function (category) {
    try {
        const response = await axios.get(`${API}/categories`, {
            params: {
                categoryName: category
            }
        });
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};


export const getArticleById = async function (id) {
    try {
        const response = await axios.get(`${API}/articles/${id}`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};


export const getArticleList = async function () {
    try {
        const response = await axios.get(`${API}/articles`);
        return parseList(response);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};


const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};


const deleteArticle = async function (id) {
    try {
        const response = await axios.delete(`${API}/articles/${id}`);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const updateArticle = async function (article) {
    try {
        const response = await axios.put(`${API}/articles/${article.id}`, article);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const createArticle = async function (article) {
    try {
        const response = await axios.post(`${API}/articles`, article);
        return {
            statusCode: response.status,
            statusMessage: response.statusText,
            data: response.data
        }
    } catch (error) {
        return handleError(error);
    }
};

const handleError = function (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error.response) {
        // eslint-disable-next-line no-console
        console.log(error.response);
        if (error.response.statusText.length === 0 && statusDescriptions.has(error.response.status)) {
            error.response.statusText = statusDescriptions.get(error.response.status)
        }
        return {
            statusCode: error.response.status,
            statusMessage: error.response.statusText,
            data: error.response.body
        }
    } else {
        return {
            statusCode: 500,
            statusMessage: error.toString(),
            data: ""
        }
    }
};

/*
const execute = async function(method, resource, data, config) {
    let accessToken = await Vue.prototype.$auth.getAccessToken();

    return axios({
        method:method,
        url: resource,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        ...config
    })
};
*/


export const dataService = {
    getAllArticles,
    getArticleList,
    getArticleById,
    getCategories,
    getArticlesByCategory,
    deleteArticle,
    updateArticle,
    createArticle,
};

