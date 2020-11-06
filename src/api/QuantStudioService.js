/*
 封装后台服务请求
 请求基于axios，文档https://github.com/axios/axios
*/
import axios from 'axios';
import store from '@/store/index.js';
import enchelper from '../utils/encryptHelper.js';
import { QuantStudioServiceUrl } from '../utils/config.js';

export default {
  RunScript(dbcon, isDeMode, ignoreAPI, type, id, args, code, userID, spath) {
    let serviceUrl = QuantStudioServiceUrl + 'RS';
    let argsObj={
      DebuggingMode: isDeMode,
      DBConnName: dbcon,
      IgnoreAPI: ignoreAPI,
      ScriptType: type,
      ScriptID: id,
      IsModelID: false,
      InvoketArgs: args || [],
      UserID: userID,
      ScriptPath: spath
    };
    console.log(argsObj)
    return axios({
      url: serviceUrl,
      method: 'post',
      data: {
        'args': enchelper.Encrypt(JSON.stringify(argsObj)),
        'scode': code
      }
    }).then(res => {
      var data = res.data;
      if (data) data = typeof data === 'string' ? JSON.parse(data) : data;
      console.groupCollapsed('%c 请求通过 ',
        'background:green;color:#fff',
        '请求发起页面: ' + store.state.pageUrl,
        '请求接口:RunScript');
      console.log('%c 请求参数', 'color: #03A9F4; font-weight: bold', dbcon, ignoreAPI, type, id, args, userID);
      console.log('%c 响应结果', 'color: green; font-weight: bold', data);
      console.groupEnd();
      return Promise.resolve(data);
    }, (err) => {
      // 上报出错接口
      console.groupCollapsed('%c 请求失败 ',
        'background:red;color:#fff',
        '请求发起页面: ' + store.state.pageUrl,
        '请求接口:RunScript');
      console.log('%c 请求参数', 'color: #red; font-weight: bold', dbcon, ignoreAPI, type, id, args, userID);
      console.groupEnd();
      return Promise.reject(false);
    }).catch((e) => {
      // debugger;
    });
  }
}
