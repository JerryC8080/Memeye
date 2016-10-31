/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-31 17:31:52
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-31 17:58:45
 * @Description
 */

import $ from 'jquery';

// const HTTP_SERVER_HOST = 'http://localhost:1351/';
const HTTP_SERVER_HOST = '/';

export default function main(callback) {
  return $
    .get(`${HTTP_SERVER_HOST}api/options`)
    .done((data) => {
      console.log(data);
      window.options = data;
      callback();
    })
    .fail((error) => {
      console.error(error);
    });
}