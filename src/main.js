import 'babel-polyfill'
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import API from 'api/api'

import 'common/stylus/index.styl'

Vue.use(MintUI)
Vue.use(Vant)
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'YOUR_APP_KEY'
// })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.sessionStorage.getItem('access-user')) {
      next()
    }
    else {
      next({
        path: '/sign_in',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
