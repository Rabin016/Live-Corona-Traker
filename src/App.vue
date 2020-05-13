<template>
  <div id="app">
    <div class="bg-gray-200 text-gray-700 text-center min-h-screen">
      <div class="mx-auto max-w-4xl">
        <div class="bg-indigo-500 p-2 text-gray-100">
          <h1 class="font-bold text-4xl">Corona</h1>
          <p class="logo font-semibold text-xl">Covid-19</p>
        </div>
        <GlobalInfo :api="api" v-if="isLoading === false" />
        <vcl-facebook v-if="isLoading == true" class="py-5" secondary="#CBD5E0" primary="#E2E8F0"></vcl-facebook>
        <CoronaInfo :api="api" :isLoading="isLoading" class="my-5" v-if="isLoading === false" />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import CoronaInfo from "./components/CoronaInfo.vue"
import { VclFacebook } from "vue-content-loading"
import GlobalInfo from "./components/GlobalInfo.vue"
import Footer from "./components/Footer.vue"
import axios from "axios"

export default {
  name: "App",
  head: {
    title: "Corona Traker",
    titleTemplete: "%s | Covid-19 virus infection info",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Covid-19 traker" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        vmid: "description",
        name: "description",
        content:
          "Updated info about corona covid-19 infected people death and recoverd by country. Live corona death count"
      }
    ]
  },
  components: {
    CoronaInfo,
    GlobalInfo,
    VclFacebook,
    Footer
  },
  data() {
    return {
      api: null,
      isLoading: true
    }
  },
  async created() {
    const api = await axios.get("https://covid19.mathdro.id/api").then(res => {
      this.api = res.data
      this.isLoading = false
    })
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Poppins:wght@400;500;600&display=swap");
body {
  font-family: "Poppins", sans-serif;
}
.logo {
  font-family: "Oswald", sans-serif;
}
</style>
