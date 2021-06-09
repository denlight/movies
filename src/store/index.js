import Vue from 'vue'
import Vuex from 'vuex'

import { MovieService, MoviesRequestParam } from '../MovieService.js'
import router from '../router/index'

Vue.use(Vuex)
const LIMIT = 500

export default new Vuex.Store({
  state: {
    genres: [],
    movies: [],
    itemsPerPage: 20,
    pageMultiplier: 0,
    selectedPage: 0,
    selectedGenre: '',
  },
  getters: {
    getPage: state => {
      let start = state.itemsPerPage * (state.selectedPage - 1)
      return state.movies.slice(start, start + state.itemsPerPage)
    },
    pageCount: state => Math.ceil(state.movies.length / state.itemsPerPage)

  },
  mutations: {
    storeGenres(state, payload) {
      state.genres = payload
    },
    storeMovies(state, payload) {
      state.movies = payload
    },
    storeItemsPerPage(state, payload) {
      let itemsPerPage = payload * 1
      itemsPerPage = itemsPerPage < 1 ? 1 : itemsPerPage
      itemsPerPage = itemsPerPage > LIMIT ? LIMIT : itemsPerPage
      state.itemsPerPage = itemsPerPage
    },
    storeSelectedPage(state, payload) {
      state.selectedPage = payload
    },
    storeSelectedGenre(state, payload) {
      state.selectedGenre = payload
    },
    storePageMultiplier(state, payload) {
      state.pageMultiplier = payload
    }
  },
  actions: {
    async getMovies({commit, state}, concatList) {

      let from = state.pageMultiplier 
        ? (LIMIT * state.pageMultiplier) + 1
        : 0 

      let movies = await MovieService.getMovies(new MoviesRequestParam({
        limit: LIMIT,
        from,
        genre: state.selectedGenre !== 'All' 
          ? state.selectedGenre 
          : null
      }))

      movies = concatList ? state.movies.concat(movies) : movies
      commit('storeMovies', movies)
    },

    async getGenres({commit}) {
      let genres = await MovieService.getGenres()
      commit('storeGenres', genres)
    },
    async init({dispatch}) {
      dispatch('setSelectedGenre', router.currentRoute.query.genre || 'All')
      dispatch('setSelectedPage', router.currentRoute.query.page || 1)
      dispatch('getGenres')
    },
    setItemsPerPage({commit}, payload) {
      commit('storeItemsPerPage', payload)
      commit('storeSelectedPage', 1)
    },
    setSelectedPage({commit, state, dispatch, getters}, payload) {
      commit('storeSelectedPage', payload)
      if(state.selectedPage === getters.pageCount) {
        dispatch('incrementPageMultiplier')
        dispatch('getMovies', true)
      }
    },
    setSelectedGenre({commit, dispatch}, payload) {
      commit('storeSelectedGenre', payload)
      commit('storeSelectedPage', 1)
      dispatch('getMovies')
    },
    incrementPageMultiplier({commit, state}) {
      let pageMultiplier = state.pageMultiplier + 1
      commit('storePageMultiplier', pageMultiplier)
    }
  }
})
