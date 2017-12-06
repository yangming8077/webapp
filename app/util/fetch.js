import React from 'react';
// import {Toast, Modal} from 'apollo-mobile';
import API from 'api';
import $native from 'native';
// import Common from "./common.jsx";
// import getModalNode from './get-modal-node';
// import i18nFormatMessage from './i18n-format-message'
const fetch = window.fetch;

// mock数据使用标志位，true代表使用mock模拟数据,false反之
const mock = true;
// remote远程直连数据使用标志位，true代表使用直连地址（当直连时，请先保证mock标志位为false）,false反之
// 优先级为 1、mock  2、remote 3、连接客户端 （mock与remote均为false时，为连接客户端）

const remote = false;
const forward = 'http://172.26.2.238:8080/'; //远程直连后台地址可编辑
//const forward = 'http://172.27.1.240:7901/'; //远程直连后台地址可编辑

// const errorHandle = function ({code, msg}) {
//   switch (code) {
//     case API.AJAX_NET_ERROR:
//     {
//       Toast.error(msg);
//       break;
//     }
//     case  API.AJAX_LOGIN_TIMEOUT_ERROR :
//     {
//       Modal.alert(
//           getModalNode('出错啦', msg),
//           [{
//             text: i18nFormatMessage('close'),
//             onTap: () => {
//               $native.callClientForBank('toLogin', {})
//             }
//           }]
//       );
//       break;
//     }
//     default:
//     {
//       Modal.alert(
//           getModalNode('出错啦', msg),
//           [{
//             text: i18nFormatMessage('close')
//           }]
//       );
//       break;
//     }
//   }
//   return {code, msg};
// };

// const fetchError = function (code = 'error', msg = 'error') {
//   errorHandle({code, msg});
//   return {
//     code,
//     msg
//   }
// };

const status = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new fetchError(API.AJAX_NET_ERROR, response.statusText);
};

const json = function(response) {
  return response.json();
};

const jsonForClient = function(respone) {
  return JSON.parse(respone);
}
//
const successOrNotWithHandle = function(success, failed) {
  return function(json) {
    const res = json;
    if (!res.errmsg && !res.jsonError && !res._RejMessage) {
      if (success && typeof success === 'function') {
        success(res);
      } else {
        return res;
      }
    } else {
      let error = res.errmsg ? res.errmsg : (res.jsonError ? res.jsonError : (res._RejMessage ? res._RejMessage : 'error'));
      error = Array.isArray(error) ? error : [error];
      const errMsg = error.map((err) => err._exceptionMessage ? err._exceptionMessage : err).join(',');
      let errorType = API.AJAX_BUSINESS_ERROR;
      if (res.errtype === API.AJAX_ERROR_FORCE_OUT ||
        error[0]._exceptionMessageCode === API.AJAX_ERROR_LOG_TIMEOUT ||
        error[0]._exceptionMessageCode === API.AJAX_ERROR_FORCE_OUT) {
        errorType = API.AJAX_LOGIN_TIMEOUT_ERROR;
      }
      if (res.errtype === API.AJAX_SYS_MAINTAIN || error[0]._exceptionMessageCode === API.AJAX_SYS_MAINTAIN) {
        errorType = API.AJAX_SYS_MAINTAIN;
      }
      if (res.errtype === API.AJAX_SMS_WRONG ||
        res.errtype === API.AJAX_SMS_NOT_GET ||
        res.errtype === API.AJAX_SMS_FORMAT_ERROR ||
        res.errtype === API.AJAX_SMS_ERROR ||
        res.errtype === API.AJAX_SMS_TIME_OUT ||
        error[0]._exceptionMessageCode === API.AJAX_SMS_WRONG ||
        error[0]._exceptionMessageCode === API.AJAX_SMS_NOT_GET ||
        error[0]._exceptionMessageCode === API.AJAX_SMS_ERROR ||
        error[0]._exceptionMessageCode === API.AJAX_SMS_TIME_OUT ||
        error[0]._exceptionMessageCode === API.AJAX_SMS_FORMAT_ERROR) {
        errorType = res.errtype || error[0]._exceptionMessageCode;
      }
      if (failed && typeof failed === 'function') {
        failed(fetchError(errorType, errMsg));
      } else {
        throw new fetchError(errorType, errMsg);
      }
    }
  };
};
//使用mock方式发送数据
const mockFetch = function(transId, {reqHead, data, success, failed }) {
  var timeoutAlert = setTimeout(function(){
    // Common.showLoading();
  },1000)
  console.log('mockFetch');
  // const url = `${transId}.do`;// 使用假数据是请删除.do
  const url = `${transId}`; // 使用假数据是请删除.do
  const body = {
    reqHead,
    data
  };
  return fetch('mock/' + url, {
    method: 'POST',
    // 直连报文头
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  }).then(status).then(json).then(function(res) {
    // Common.hideLoading();
    clearTimeout(timeoutAlert);
    return  res;
  }).then(successOrNotWithHandle(success, failed))
};

//使用remote直连方式发送数据
const remoteFetch = function(transId, { data, success, failed }) {
  console.log('remoteFetch');
  // const url = `${transId}.do`;// 使用假数据是请删除.do
  const url = `${transId}`; // 使用假数据是请删除.do
  // 定义 直连时上送报文体中的报文头
  const reqBody = data;

    const   reqHead ={
      //默认固定上送报文
      //！！！！！！！！！本地远程连接前置使用！！！！！！！！！
      //场景编码
      sceneCode:"0001",
      //步骤编码(根据相应步骤填写字段（1,2,3,4）)
      stepCode:"1",
      //交易类型 1：查询类交易 2：账务类交易 3：管理类交易 4: 授权类交易 原生需映射，HTML异步请求需赋值
      tradeType:"1",
      //交易标识 1-主，2-副
      flag:"1",
      //服务接口版本号 1.0.0
      serviceVersion:"1.0.0",
      cstNo:"1005979731",
      cstId:"e0d684f6-e6bd-42b9-a334-92d70b7caf83",
      userName:"文显江",
      certType:"10100",
      certNo:"513422195008200038",
      mobile:"12122222222"
  };
  const body = {
    reqHead,
    reqBody
  };
  return fetch(forward + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    // credentials: 'include'
  }).then(status).then(json).then(function(res) {
    return res ;
  }).then(successOrNotWithHandle(success, failed))

};

//使用fetch给客户端发送请求数据
const prodFetch = function(transId, {reqHead, data, success, failed, loadingFlag, encrypted }) {
  console.log('prodFetch');
  const body = {
     reqHead,
    data
  };
  console.log(body);
  const _promise = new Promise(function(resolve, reject) {
    $native.callClientForComm('request', {
      url: `${transId}`,
      transId,
      body,
      success: function(res) {
        resolve(res);
      },
      failed: function(res) {
        reject(res);
      },
      encrypted,
      loadingFlag
    })
  });
  return _promise.then(jsonForClient).then(successOrNotWithHandle(success, failed));
};
// 导出Fetch方法
const $fetch = function(transId, { reqHead = {}, data = {}, success, failed } = {}, loadingFlag = true, encrypted = true) {
  const params = {reqHead, data, success, failed, loadingFlag, encrypted };
  return mock ? mockFetch(transId, params) : (remote ? remoteFetch(transId, params) : prodFetch(transId, params));

};

export default $fetch;