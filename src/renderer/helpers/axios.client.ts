import axios from "axios";
// import { stringify } from 'qs';

// const BASE_URL = "http://xunqinji.top:9007/api/v1";
const BASE_URL = "http://127.0.0.1:8000";
const TOKEN = String(window.localStorage.getItem("token")) || "";

const instance = axios.create({
  baseURL: BASE_URL
});
// instance.defaults.withCredentials = true 
instance.defaults.headers.common["Authorization"] = TOKEN;

// 请求拦截
/**
 * FIXED: 超级大坑，其实在electron中调整设置，取消security即可
 * ---------------------------------------------------------------------------------
 * axios 请求中默认 headers 的 Content-Type 属性为 application/json 类型，
 * 这种类型在跨域时，浏览器会先发送 options 请求
 * 如果服务器响应完全符合请求要求，浏览器则会发送真正的 post 请求。
 * 而当 headers 的 Content-Type 属性是 application/x-www-form-urlencoded 时不会发送 options 请求，
 * 所以需要在 axios 请求拦截中配置 headers['Content-Type'] = 'application/x-www-form-urlencoded 
 * 并将 post 的参数转换为序列化的 URL 形式
*/
instance.interceptors.request.use(
  (config) => {
    // 兼容 post 跨域问题
    // if (config.method === 'post') {
    //   // 修改 Content-Type
    //   config.headers['Content-Type'] =
    //     'application/x-www-form-urlencoded';
    // }
    if (config.method === 'put') {
      // 修改 Content-Type
      config.headers['Content-Type'] =
        'application/json;';
    }
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
