// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import elementLocale from 'element-ui/lib/locale/lang/en';

import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI, { locale: elementLocale });
import VueI18n from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)

Vue.use(VueI18n)
Vue.config.productionTip = true

const messages = {
  en: en,
  ru: ru 
}

let i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

Object.defineProperty(Vue.prototype, '$locale', {
    get: function () {
      return i18n.locale
    },
    set: function (locale) {
      i18n.locale = locale
    }
  })

var vue = new Vue({
  i18n,
  el: '#app',
  router,
  data () {
  	return {
      }
  },
  components: { App},
  template: '<app/>',
  render: h => h(App)
})

window.vue = vue