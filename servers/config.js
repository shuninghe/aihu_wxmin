// 提交发布正式环境的时候改为true,体验版改为false
let isProduction = false;

const testApi = {
  baseUrl: 'http://testdc.17wanxiao.com/mobile',
}

const proApi = {
  baseUrl: 'https://dc.17wanxiao.com/mobile',
}
export default isProduction ? proApi : testApi