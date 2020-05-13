import Vue from "vue"
import App from "./App.vue"
import VueMeta from "vue-meta"
import "./registerServiceWorker"
import "./assets/css/tailwind.css"

Vue.config.productionTip = false

// Use VueMeta
Vue.use(VueMeta, {
  keyName: "head",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
})

new Vue({
  render: h => h(App)
}).$mount("#app")
