import axios from "axios";
import config from "@/config.json";
let state = {
  scores: [],
  total_pages: 0,
  loader: false,
  page_num: 1,
  lives: [],
  teams: [],
};
let mutations = {
  SCORE_DATA(state, scores) {
    state.scores = scores.items;
    state.total_pages = scores.total_pages;
  },
  SCORE_LIVE(state, lives) {
    state.lives = lives;
  },
  TEAMS_DATA(state, teams) {
    state.teams = teams;
  },
  PAGINATION(state, page) {
    state.page_num = page;
  },
  LOADER(state, loader) {
    state.loader = loader;
  },
};

let actions = {
  ScoreData({ commit }, value) {
    let loader = "";
    if (value === false) {
      loader = value;
    } else loader = true;
    return new Promise((resolve, reject) => {
      commit("LOADER", loader);
      axios
        .get(
          `${config.BASE_URL}/matches?status=1&per_page=100&paged=${state.page_num}&token=${config.BASE_TOKEN}`
        )
        .then((result) => {
          resolve(result);

          commit("SCORE_DATA", result.data?.response);
          commit("LOADER", false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ScoreLive({ commit }, value) {
    let loader = "";
    if (value === false) {
      loader = value;
    } else loader = true;
    return new Promise((resolve, reject) => {
      commit("LOADER", loader);
      axios
        .get(
          `https://rest.entitysport.com/v2/matches?status=3&per_page=100&paged=${state.page_num}&token=${config.BASE_TOKEN}`
        )
        .then((result) => {
          resolve(result);

          commit("SCORE_LIVE", result.data?.response?.items);
          commit("LOADER", false);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  Pagination: ({ commit, dispatch }, page) => {
    commit("PAGINATION", page), dispatch("ScoreData", );
  },
};
let getters = {
  scores(state) {
    return state.scores.concat(state.scores);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
