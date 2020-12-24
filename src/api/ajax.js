//封装的能发ajax请求的函数

import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';


// 添加请求拦截器：让post请求的请求体格式为urlencoded格式 a=1&b=2
axios.interceptors.request.use(function (config) {
    // 得到请求方法和请求数据体
    const { method, data } = config
    //处理post请求，将data对象转换为query参数格式字符串
    if(method.toLowerCase() === 'post' && typeof data === 'object'){
        config.data = qs.stringify(data)
    }
    return config;
  
  });

  
  // 添加响应拦截器
  // 1，让请求成功的结果不再是response，而是response.data的值
  // 2，
  // 在请求返回之后且在我们指定的请求回调函数之前
  axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response.data;
    }, function (error) {  //统一处理所有请求的异常错误
        message.error('请求出错' + error.message)
      // 对响应错误做点什么
     //return Promise.reject(error);
      return new Promise(() => {}) //返回一个pending状态的promise，中断promise链
    });

  export default axios;