// import dotenv from 'dotenv';
import {
  HTTP_METHOD,
  API_HEADERS
} from '../constants/common';
import { MOCK_API } from '../constants';

// dotenv.config();

/**
 * @class HttpsService
 * Manages the common data
 */
export default class HttpsService {
  constructor(path) {
    // this.fullPath = process.env.Mo + path;
    // console.log(process.env.MOCK_API);

    this.fullPath = MOCK_API + path
  }

  /**
   * @description Call api post data
   * @body {object} data
   * @returns data after request
   */

  post = async (data) => {
    try {
      const response = await fetch(this.fullPath, {
        method: HTTP_METHOD.POST,
        mode: "cors",
        cache: "no-cache",
        headers: API_HEADERS,
        body: JSON.stringify(data),
      });
      return response.json()
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description get data detail by id from server
   * @param {String} path request path
   * @query {filter, page, limit, sortBy, order}
   * @returns data after request
   */
  get = async (query) => {
    try {
      const url = `${this.fullPath}?${query}`;
      const response = await fetch(url);
      console.log(response);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @description delete data at server
   * @param {String} path
   * @returns data after request
   */
  delete = async (id) => {
    try {
      await fetch(this.fullPath + `/${id}`, {
        method: HTTP_METHOD.DELETE,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Call api put data
   * @param {String} path
   * @body {object} data
   */
  put = async (data, id) => {
    try {
      const response = await fetch(`${this.fullPath}/${id}`, {
        method: HTTP_METHOD.PUT,
        headers: API_HEADERS,
        body: JSON.stringify(data),
      });
      return response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
}
