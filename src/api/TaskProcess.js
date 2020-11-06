/* 重写taskProcess类， 去掉了对jquery的依赖 */
import qs from 'qs';
import axios from 'axios';
import store from '@/store/index.js';
import jsonp from '@/utils/jsonp.js';
import {
  TaskProcessIndicatorUrl,
  SessionManagementServiceUrl,
  TaskProcessServiceUrl
} from '../utils/config.js';

class TaskProcess {

  variables = [];

  constructor(appDomain, taskCode, clientName = 'TaskProcess') {

    this.params = {appDomain, taskCode, clientName};
  }

  AddVariableItem(name, value, dataType, isConstant = 0, isKey = 0, keyIndex = 0) {
    this.variables.push({
      Name: name,
      Value: value,
      DataType: dataType,
      IsConstant: isConstant,
      IsKey: isKey,
      KeyIndex: keyIndex
    });

    return this;
  }

  BuildVariables() {
    let str = '';
    this.variables.forEach((val) => {
      str += '<SessionVariable>';
      for (let key in val) {
        str += `<${key}>${val[key]}</${key}>`;
      }
      str += '</SessionVariable>';
    });

    return `<SessionVariables>${str}</SessionVariables>`;
  }

  // 有界面的task运行
  ShowIndicator(callback) {
    let curWwwPath=window.document.location.href;
    let rootUrl = '', env = process.env.NODE_ENV;
    if (curWwwPath.indexOf('localhost')>-1 && env === 'development') {
      rootUrl = process.env.VUE_APP_Domain;
    }
    let sContext = encodeURIComponent(this.BuildVariables());
    const url = rootUrl + TaskProcessIndicatorUrl +'?' + qs.stringify(this.params)+'&sContext='+sContext;
    const callbackFn = function(callback) {
      if(!callback) return false;
      return function () {
        let sessionId = window.sessionStorage.getItem('sessionId');
        callback(sessionId);
      }
    };
    window.sessionStorage.setItem('sContext', sContext);
    store.commit('showIndicatorWindow', {url , callback: callbackFn(callback)});
  }
  // 无界面的task运行
  RunTask(callback) {
    const {appDomain, clientName} = this.params;
    this.CreateSessionByTaskCode( (err, data) => {
      const params = {
        sessionId: data,
        applicationDomain: appDomain,
        clientName
      };
      axios.get(TaskProcessServiceUrl +'RunTask?'+qs.stringify(params))
        .then(res=>{
          if(callback) callback(res);
        });
    })
  }

  CreateSessionByTaskCode(callback) {
    const {appDomain, taskCode} = this.params;
    const params = {
      sessionVariable: this.BuildVariables(),
      applicationDomain: appDomain,
      taskCode: taskCode
    };
    jsonp(SessionManagementServiceUrl +'CreateSessionByTaskCode?'+qs.stringify(params), callback);
  }
}

export default TaskProcess;
