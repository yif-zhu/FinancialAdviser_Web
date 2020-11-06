/*
 封装后台服务请求
 请求基于axios，文档https://github.com/axios/axios
*/
import axios from 'axios';
import store from '@/store/index.js';
import ParamsBuilder from './ParamsBuilder.js';
import enchelper from '../utils/encryptHelper.js';
import { CommonServiceUrl } from '../utils/config.js';

export default class CommonService extends ParamsBuilder{

  constructor(connName, spName, usingGet = false) {
    super(connName, spName);
    this.usingGet = usingGet;
  }

  ExecTable() {
    return this.DataRequest('tbl');
  }

  ExecTables() {
    return this.DataRequest('set');
  }

  ExecResult() {
    return this.DataRequest('res');
  }

  DataRequest(method) {
    let serviceUrl = CommonServiceUrl;
    let conn = this.ConnName,
      dbargs = this.PrepareparamObj();

    let reqArgs = {
      "SPName":dbargs.SPName,
      "Param":dbargs.SQLParams
    }

    let params = JSON.stringify(reqArgs);
    return new Promise((resolve, reject) => {
      axios({
        url: serviceUrl,
        method: 'post',
        data: {
          "ApiName": "GetDataSet",
          "RequestParam": enchelper.Encrypt(params)
        }
      }).then(res => {
        let data = res.data;
        if(data) data = (method === 'res') ? data : typeof data === 'string' ? JSON.parse(data) : data;

        let href = document.location.href;
        let safeDomain = process.env.VUE_APP_Domain.replace(/^(http|https):\/\//, '');
        let checkDomain = new RegExp("^(http|https):\\/\\/"+safeDomain);
        // 仅对当前代理数据服务环境及本地开发环境显示请求信息
        if(checkDomain.test(href) || process.env.NODE_ENV === 'development') {
          console.groupCollapsed('%c 请求通过 ',
            'background:green;color:#fff',
            '请求发起页面: ' +store.state.pageUrl,
            '请求接口:' + conn + '.' +dbargs.SPName);
          console.log('%c 请求参数', 'color: #03A9F4; font-weight: bold', JSON.stringify(dbargs.SQLParams));
          console.log('%c 响应结果', 'color: green; font-weight: bold', data);
          console.groupEnd();
        }

        resolve(data);
      }, (err) => {
        // 上报出错接口
        console.groupCollapsed('%c 请求失败 ',
          'background:red;color:#fff',
          '请求发起页面: ' +store.state.pageUrl,
          '请求接口:' + conn + '.' +dbargs.SPName);
        console.log('%c 请求参数', 'color: #red; font-weight: bold', JSON.stringify(dbargs.SQLParams));
        console.groupEnd();
        let res = err.response;
        if(res.status) {
          if (res.status === 401) {
            store.commit('setLoginStatus', false);
            store.commit('setRedirect', '/login');
          }
          if (res.status === 400) {
            store.commit('sendMessage', {
              message: '400 Invalid Parameters',
              type: 'error'
            })
          }
          if (res.status === 406) {
            store.commit('sendMessage', {
              message: '406 Request Not Authenticated',
              type: 'error'
            })
          }
          if (res.status === 416) {
            store.commit('sendMessage', {
              message: '416 Calling Undefinded Interface',
              type: 'error'
            })
          }
          if (res.status === 417) {
            store.commit('sendMessage', {
              message: '417 Unsupported Requests',
              type: 'error'
            })
          }
        }
        reject(err);
      }).catch(err=>{
        reject(err);
      });
    });
  }
}
