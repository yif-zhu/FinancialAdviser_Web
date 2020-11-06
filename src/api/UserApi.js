/*
    用户模块 API

    命令规则 请求方式加接口名（接口名应简洁明了）
    正例： getUserInfo
    反例： getUsp_GetUserInfo
*/
import axios from 'axios';
import enchelper from '../utils/encryptHelper'
import { UserServiceUrl } from '../utils/config.js';
import utils from '@/utils/index'

export const UserApi = {

  // postUserLogin(data) {
  //   return axios.post(`${UserServiceUrl}Login`,{'info': enchelper.Encrypt(JSON.stringify(data))})
  //     .then(res => {
  //       if(res.headers['content-result']) {
  //         return Promise.resolve(false);
  //       }
  //       return Promise.resolve(res.data !== '' ? utils.isObject(res.data) || utils.isArray(res.data) ? res.data : JSON.parse(res.data) : {});
  //     });
  // },
  postUserLogin(data) {
    return axios.post(`${UserServiceUrl}`,{
      "ApiName":"Login",
      'RequestParam': data
    })
      .then(res => {
        if(res.headers['content-result']) {
          return Promise.resolve(false);
        }
        return Promise.resolve(res.data !== '' ? utils.isObject(res.data) || utils.isArray(res.data) ? res.data : JSON.parse(res.data) : {});
      });
  },

  postUserLogout() {
    return axios.post(`${UserServiceUrl}Logout`)
      .then(res => {
        return Promise.resolve(res.data);
      });
  }
};
