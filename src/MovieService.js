import axios from 'axios'

let movies
let genres

export class MoviesRequestParam {
  /**
   * 
   * @param {Object} data 
   * @param {String} data.limit amount of items to return after index starting point
   * @param {String} data.from start index
   * @param {String} data.genre genre to filter by 
   */
  constructor(data) {
    if(data.limit) this.limit = data.limit
    if(data.from) this.from = data.from
    if(data.genre) this.genre = data.genre
  }
}

export const MovieService = {
  /**
   * gets list of movies
   * @param {MoviesRequestParam} params 
   * @param {Boolean} forceReload 
   * @returns {Array<Object>}
   */
  getMovies: async (params, forceReload) => {
    const url = `${getApiHost()}/movies`
    return !movies || forceReload 
      ? moviesHttp({url, params})
      : genres
  },
  
  /**
   * gets list of genres
   * @param {Boolean} forceReload 
   * @returns {Array<String>}
   */
  getGenres: async (forceReload) => {
    const url = `${getApiHost()}/genres`
    return !genres || forceReload 
      ? moviesHttp({url})
      : genres
  }
}

/**
 * Gets API host path
 * @returns {String} API host path
 */

const getApiHost = () => {
  let path = ''
  switch(process.env.ENV) {
    case 'production': path = 'https://www.moviesapi.io/api'; break
    case 'test': path = 'https://www.test.moviesapi.io/api'; break
    case 'stage': path = 'https://www.stage.moviesapi.io/api'; break
    default: path = 'http://localhost:3000/api'; break
  }
  return path
}

/**
 * axios wrapper
 * @param {Object} config - required param
 * @param {String} config.method - request method
 * @param {String} config.url - request url
 * @param {String} config.headers - request headers
 * @param {String} config.data - request payload
 * 
 * @returns {Promise<Any>}
 */
 async function moviesHttp (config) {

  config.headers = {
      'Content-Type': 'application/json'
  }
  try {
      const response = await axios(config)
      return response.data
  } catch (error) {
      const errConfig = error.config || { method: 'unknown', url: 'unknown', message: 'unknown' }
      const message = `[${errConfig.method.toUpperCase()}] call to '${errConfig.url}' failed in MovieService.js: ${error.message} `
      // handle all API errors here (example: send error data to monitoring software)
      throw new Error(message)
  }
}