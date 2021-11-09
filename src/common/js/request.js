import axios from 'axios';
import { Loading } from 'element-ui';
import qs from 'qs';
// let [loading, count] = [null, 0];
// function closeLoading() {
//   if (count <= 0) return;
//   count--;
//   if (count === 0) {
//     setTimeout(() => {
//       if (count === 0 && loading) {
//         loading.close();
//         loading = null;
//       }
//     }, 400);
//   }
// }
// 创建axios 实例
console.log('123');
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  withCredentials: true,
  timeout: 200000 // 请求超时时间
});
// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置
    // if (!loading) {
    //   loading = Loading.service({
    //     lock: false,
    //     text: '拼命加载中...',
    //     background: 'transparent'
    //   });
    // }
    // count++;
    return config;
  },
  error => {
    //  这里处理一些请求出错的情况

    console.log(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 这里处理一些response 出错时的逻辑
    // closeLoading();
    return Promise.reject(error);
  }
);

const request = (opts) => {
  // 参数opts不是一个对象
  if (Object.prototype.toString.call({}).slice(8, -1) !== 'Object') {
    return console.error('参数不正确！');
  }
  // let _params = {};
  // if (qs.stringify(opts.params) && qs.stringify(opts.params) !== {}) {
  //   Object.keys(opts.params).forEach(item => {
  //     _params[`listMap[0].inMap.${item}`] = opts.params[item];
  //   });
  // }
  opts.method = opts.method || 'get';
  // post 提交
  if (opts.method.toLocaleLowerCase() === 'post') {
    return new Promise((resolve, reject) => {
      service.post(opts.url, qs.stringify(opts.params)).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  } else if (opts.method.toLocaleLowerCase() === 'get') { // get 提交
    return new Promise((resolve, reject) => {
      service.get(opts.url, {
        params: opts.params
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
};

export default request;
