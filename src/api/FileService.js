import axios from 'axios';
import paramsBuilder from './ParamsBuilder.js';
import enchelper from '../utils/encryptHelper.js';
import { FileOperationServiceUrl } from '../utils/config.js';

function jsFormSubmit(targetUrl, param) {
  let tempform = document.createElement("form");
  tempform.action = targetUrl;
  tempform.method = "post";
  let platform = process.env.VUE_APP_Platform;
  if('linux' === platform) {
    tempform.enctype="multipart/form-data";
  }
  tempform.style.display = "none";

  for (let x in param) {
    let opt = document.createElement("input");
    opt.name = x;
    opt.value = param[x];
    tempform.appendChild(opt);
  }

  let opt = document.createElement("input");
  opt.type = "submit";
  tempform.appendChild(opt);
  document.body.appendChild(tempform);
  tempform.submit();
  document.body.removeChild(tempform);
}

export default {

  Upload(fileData, fileName, folder, toFTP) {
    let argsObj = {
      'Name': fileName,
      'Folder': folder,
      'IsFTP': toFTP ? true : false
    };
    console.log(argsObj);
    
    let formData = new FormData();
    formData.append("file", fileData);

    let args = JSON.stringify(argsObj);
    let svcUrl = FileOperationServiceUrl + 'Upload?args=' + enchelper.EncryptForGetRequest(args);

    return axios({
      method: 'post',
      url: svcUrl,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----'+(+new Date())
      },
      data: process.env.VUE_APP_Platform === 'win' ? fileData : formData
    }).then(res => {
      return Promise.resolve(process.env.VUE_APP_Platform === 'win' ? res.data : { UploadResult: res.data });
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled');
      }
    });
  },

  UploadOther(fileData, fileName, folder, toFTP) {
    
    let formData = new FormData();
    formData.append("file", fileData);
        
    let argsObj = {
      'Name': fileName,
      'Folder': folder,
      'IsFTP': toFTP ? true : false
    };
    console.log(argsObj);

    let args = JSON.stringify(argsObj);
    let svcUrl = FileOperationServiceUrl + 'Upload?args=' + enchelper.EncryptForGetRequest(args);

    return function (progress, callback) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return axios({
        method: 'post',
        url: svcUrl,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----'+(+new Date())
        },
        data: process.env.VUE_APP_Platform === 'win' ? fileData : formData,
        cancelToken: source.token,
        onUploadProgress: function (progressEvent) {
          if (progress) progress(progressEvent);
        }
      }).then(res => {
        console.log(res.data)
        if (callback) callback(process.env.VUE_APP_Platform === 'win' ? res.data : { UploadResult: res.data });
      });
      //return source.cancel;
    }
  },
  // 上传文件(支持上传进度、取消上传）
  UploadFile (fileData, fileName, folder, toFTP) {
    let argsObj = {
      'Name': fileName,
      'Folder': folder,
      'IsFTP': toFTP ? true : false
    };
    console.log(argsObj);

    let args = JSON.stringify(argsObj);
    let svcUrl = FileOperationServiceUrl + 'Upload?args=' + enchelper.EncryptForGetRequest(args);

    return function (progress, callback) {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      axios({
        method: 'post',
        url: svcUrl,
        data: fileData,
        cancelToken: source.token,
        onUploadProgress: function (progressEvent) {
          if (progress) progress(progressEvent);
        }
      }).then((res) => {
        if (callback) callback(res.data);
      }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled');
        }
      });
      return source.cancel;
    }
  },

  LoadText(fileRelativePath) {
    let svcUrl = FileOperationServiceUrl + 'LoadContent';
    return axios({
      method: 'post',
      url: svcUrl,
      data: {
        'filePath': enchelper.Encrypt(fileRelativePath)
      }
    }).then(res => {
      return Promise.resolve(res.data);
    });
  },
  UpdateText(fileRelativePath, fileContent) {
    let svcUrl = FileOperationServiceUrl + 'UpdateContent';
    return axios({
      method: 'post',
      url: svcUrl,
      data: {
        'filePath': enchelper.Encrypt(fileRelativePath),
        'fileContent': fileContent
      }
    }).then(res => {
      return Promise.resolve(res.data);
    });
  },
  CopyFolder(sourceFolder, destFolder) {
    let svcUrl = FileOperationServiceUrl + 'CopyFolder';
    return axios({
      method: 'post',
      url: svcUrl,
      data: {
        'sourceFolder': enchelper.Encrypt(sourceFolder),
        'destFolder': enchelper.Encrypt(destFolder)
      }
    }).then(res => {
      return Promise.resolve(res.data);
    });
  },
  Remove(fileRelativePath, isFTP) {
    let svcUrl = FileOperationServiceUrl + 'Remove';
    let argsObj = {
      'Path': fileRelativePath,
      'IsFTP': isFTP ? true : false
    };
    console.log(argsObj);
    let args = JSON.stringify(argsObj);

    return axios({
      method: 'post',
      url: svcUrl,
      data: {
        'args': enchelper.Encrypt(args)
      }
    }).then(res => {
      return Promise.resolve(res.data);
    });
  },
  DownLoadFileByPath(fileRelativePath, renameTo, fromFTP) {
    let serviceUrl = FileOperationServiceUrl + 'Download';
    let fileName = renameTo;
    if (!renameTo || renameTo.length < 3) {
      fileName = fileRelativePath.substring(fileRelativePath.lastIndexOf('\\') + 1);
    }
    let argsObj = {
      'Name': fileName,
      'Path': fileRelativePath,
      'IsFTP': fromFTP ? true : false
    };
    console.log(argsObj);

    let args = JSON.stringify(argsObj);
    let param = {
      'args': enchelper.Encrypt(args)
    };

    jsFormSubmit(serviceUrl, param);
  },
  Export(connName, spName) {

    paramsBuilder.call(this, connName, spName);

    this.ExportExcelFile = function (excelName) {
      let serviceUrl = FileOperationServiceUrl + 'ExportExcel';
      let dbParams = this.PrepareparamObj();
      let argsObj = {
        'Name': excelName,
        'Conn': connName,
        'Params': dbParams
      };
      console.log(argsObj);

      let args = JSON.stringify(argsObj);
      let param = {
        'args': enchelper.Encrypt(args)
      };
      jsFormSubmit(serviceUrl, param);
    };
  }
}
