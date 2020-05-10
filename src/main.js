import Vue from 'vue'
import VueConst from 'vue-const';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import App from "./App.vue";

import router from "./routes";

Vue.use(VueConst)
Vue.use(MintUI)

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}).$mount('#app')