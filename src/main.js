import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import io from 'socket.io-client';
Vue.config.productionTip = false
Vue.prototype.$socket = io('http://localhost:5000',{
        "rejectUnauthorized" : false
      })
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
