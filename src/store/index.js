import Vue from 'vue'
import Vuex from 'vuex'
import {dataService} from "../shared";

import {
  GET_ARTICLES, ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGES, DELETE_ARTICLE, UPDATE_ARTICLES,
    ADD_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES, GET_CATEGORIES, GET_TOC, UPDATE_TOC, ADD_ARTICLE,
} from "./mutation-types";


Vue.use(Vuex);

const state = {
  articles: [],
  toc: [],
  categories: [],
  flashMessages: [],
  errorMessages: [],
};

const mutations = {
  [GET_TOC](state, toc) {
    state.toc = toc;
  },
  [UPDATE_TOC](state, article) {
    const index = state.toc.findIndex(h => h.id === article.id);
    state.toc.splice(index, 1, article);
    state.toc = [...state.toc];
  },
  [UPDATE_ARTICLES](state, article) {
    const index = state.articles.findIndex(h => h.id === article.id);
    if (index !== -1) {
      state.articles.splice(index, 1, article);
      state.articles = [...state.articles];
    }
  },
  [GET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [GET_ARTICLES](state, articles) {
    state.articles = articles;
  },
  [ADD_FLASH_MESSAGE](state, message) {
    state.flashMessages = [ { id: 0, message: message } ];
  },
  [CLEAR_FLASH_MESSAGES](state) {
    state.flashMessages = [];
  },
  [ADD_ERROR_MESSAGE](state, message) {
    state.errorMessages = [ { id: 0, message: message } ];
  },
  [CLEAR_ERROR_MESSAGES](state) {
    state.errorMessages = [];
  },
  [DELETE_ARTICLE](state, articleId) {
    state.toc = [...state.toc.filter(p => p.id !== articleId)];
    state.articles = [...state.articles.filter(p => p.id !== articleId)];
  },
  [ADD_ARTICLE](state, article) {
    state.articles.unshift(article);
    state.toc.unshift(article);
  },
};

const actions = {
  async getArticlesAction({ commit }) {
    if (state.articles.length === 0) {
      commit(ADD_FLASH_MESSAGE, "Loading .....");
      const articles = await dataService.getAllArticles();
      commit(CLEAR_FLASH_MESSAGES);
      commit(GET_ARTICLES, articles);
    }
  },
  async getTocAction({ commit }) {
    if (state.toc.length === 0) {
      const toc = await dataService.getArticleList();
      commit(GET_TOC, toc);
    }
  },
  async getCategoriesAction({ commit }) {
    const categories = await dataService.getCategories();
    commit(GET_CATEGORIES, categories);
  },
  clearFlashMessagesAction({ commit }) {
    commit(CLEAR_FLASH_MESSAGES);
  },
  setFlashMessageAction({commit}, message) {
    commit(ADD_FLASH_MESSAGE, message);
  },
  async deleteArticleAction({commit}, id) {
    commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
    const statusData = await dataService.deleteArticle(id);
    if (statusData.statusCode === 204) {
      commit(ADD_FLASH_MESSAGE, "Article deleted");
      commit(DELETE_ARTICLE, id);
    } else {
      commit(ADD_FLASH_MESSAGE, "Delete failed: " + statusData.statusCode + " - " + statusData.statusMessage);
    }
  },
  async updateArticleAction({commit}, article) {
    commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
    const statusData = await dataService.updateArticle(article);
    if (statusData.statusCode === 204) {
      commit(ADD_FLASH_MESSAGE, "Article updated");
      commit(UPDATE_TOC, article);
      commit(UPDATE_ARTICLES, article);
    } else {
      commit(ADD_FLASH_MESSAGE, "Update failed: " + statusData.statusCode + " - " + statusData.statusMessage);
    }
  },
  async createArticleAction({commit}, article) {
    commit(ADD_FLASH_MESSAGE, "Saving Changes .....");
    const statusData = await dataService.createArticle(article);
    if (statusData.statusCode === 200 || statusData.statusCode === 201) {
      commit(ADD_FLASH_MESSAGE, "New article created");
      commit(ADD_ARTICLE, statusData.data)
    } else {
      commit(ADD_FLASH_MESSAGE, "Create failed: " + statusData.statusCode + " - " + statusData.statusMessage);
    }
  },
};

const getters = {
  getFlashMessages: state => {return state.flashMessages},
  getErrorMessages: state => {return state.errorMessages},
  getCategoryById: state => id => state.categories.find(h => h.id === id),
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
