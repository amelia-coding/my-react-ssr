import fetch from 'cross-fetch';
interface params {
  url: string;
  method?: 'GET' | 'POST';
  mode?: any;
  cache?: any;
  credentials?: any;
  headers?: Record<string, unknown>;
}
export default function request({ url, method }: params): Promise<any> {
  const option = {
    // credentials: credentials || "include", //为了在当前域名内自动发送 cookie ， 必须提供这个选项
    method: method || 'GET',
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   ...headers,
    // },
    // mode: mode || "cors", //请求的模式
    // cache: cache || "force-cache",
  };
  return fetch(url, option)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
}
