<template>
  <div class="mt-5 p-2">
    <div class="flex justify-between items-center">
      <p class="text-left underline">Global Info:</p>
      <p class="text-xs italic">Last Updated: {{ new Date(this.api.lastUpdate).toDateString() }}</p>
    </div>
    <div class="rounded-lg shadow-lg bg-gray-100 font-semibold border-2 border-indigo-500 bg-white">
      <div class="grid grid-cols-3">
        <div v-for="(global, index) in globals" :key="index">
          <p class>{{ global.label }}</p>
          <countTo
            :startVal="60000"
            :separator="separator"
            :endVal="global.affected"
            :duration="3500"
            :autoplay="true"
            :class="global.color"
          ></countTo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to"

export default {
  name: "GlobalInfo",
  components: { countTo },
  props: ["api"],
  data() {
    return {
      separator: ",",
      globals: {
        infected: {
          label: "Infected:",
          affected: this.api.confirmed.value,
          color: "text-yellow-500"
        },
        recovered: {
          label: "Recoverd:",
          affected: this.api.recovered.value,
          color: "text-green-500"
        },
        death: {
          label: "Dead:",
          affected: this.api.deaths.value,
          color: "text-red-500"
        }
      }
    }
  }
}
</script>

<style></style>
