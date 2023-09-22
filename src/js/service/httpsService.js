import dotenv from 'dotenv';
import {
  commonHttpRequest
} from '../utils/httpsRequest';
import {
  HTTP_METHOD
} from '../constants/common';

dotenv.config();

/**
 * @class HttpsService
 * Manages the common data
 */
export default class HttpsService {
  constructor(path) {
    this.fullPath = process.env.MOCK_API + path;
  }

  /**
   * Call api post data
   * @body {object} data
   *
   */

  post = async (data) => {
    return await commonHttpRequest(HTTP_METHOD.POST, this.fullPath, data);
  };

  /**
   * @description get data detail by id from server
   * @param {String} path request path
   * @query {filter, page, limit, sortBy, order}
   * @returns data after request
   */
  get = async (path, query) => {
    const url = `${this.fullPath}/${path}?${query}`;

    return await commonHttpRequest(HTTP_METHOD.GET, url);
  };

  /**
   * @description delete data at server
   * @param {String} path
   * @returns data after request
   */
  delete = async (path) => {
    const url = `${this.fullPath}/${path}`;

    return await commonHttpRequest(HTTP_METHOD.DELETE, url);
  };

  /**
   * Call api put data
   * @param {String} path
   * @body {object} data
   */
  put = async (path, data) => {
    const url = `${this.fullPath}/${path}`;

    return await commonHttpRequest(HTTP_METHOD.PUT, url, data)
  }
}
