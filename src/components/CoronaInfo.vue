<template>
  <div class="p-2">
    <p>Search By Country</p>
    <multiselect
      v-model="country"
      :options="countries"
      :searchable="true"
      placeholder="Select one"
      class="border-2 border-indigo-500 rounded-lg"
      @close="fetchCountry"
      :close-on-select="true"
    ></multiselect>
    <vcl-facebook
      v-if="isLoadingChild == true || isLoading == true"
      class="py-5"
      secondary="#CBD5E0"
      primary="#E2E8F0"
    ></vcl-facebook>
    <vcl-facebook
      v-if="isLoadingChild == true || isLoading == true"
      class="py-5"
      secondary="#CBD5E0"
      primary="#E2E8F0"
    ></vcl-facebook>
    <div class="grid grid-cols-1 gap-4 py-5" v-if="isLoadingChild === false">
      <div class="flex justify-between items-center">
        <p class="underline">{{ country }}</p>
        <p
          class="text-right italic text-xs"
          v-show="country != null"
        >Last Updated: {{ new Date(lastUpdated).toDateString() }}</p>
      </div>
      <div
        v-for="(item, index) in countryStatus"
        :key="index"
        class="grid grid-cols-2 text-left rounded-lg p-5 shadow-lg font-semibold border-t-4 bg-white"
        :class="item.border"
      >
        <p class="pl-10">{{ item.label }}</p>
        <countTo
          :startVal="0"
          :separator="separator"
          :endVal="item.affected"
          :duration="2000"
          :autoplay="true"
          :class="item.color"
        ></countTo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Multiselect from "vue-multiselect"
import { VclFacebook } from "vue-content-loading"
import countTo from "vue-count-to"

export default {
  name: "CoronaInfo",
  props: ["api", "isLoading"],
  components: { Multiselect, countTo, VclFacebook },
  data() {
    return {
      isLoadingChild: false,
      separator: ",",
      countries: [],
      country: null,
      lastUpdated: null,
      countryStatus: {
        infected: {
          label: "Infected:",
          affected: 0,
          border: "border-yellow-500",
          color: "text-yellow-600"
        },
        recovered: {
          label: "Recoverd:",
          affected: 0,
          border: "border-green-500",
          color: "text-green-600"
        },
        death: {
          label: "Dead:",
          affected: 0,
          border: "border-red-500",
          color: "text-red-600"
        }
      }
    }
  },
  async mounted() {
    await axios.get(this.api.countries).then(data => {
      const countriesData = data.data.countries
      countriesData.forEach(item => {
        this.countries.push(item.name)
      })
    })
  },
  methods: {
    async fetchCountry(value) {
      this.isLoadingChild = true
      try {
        await axios
          .get(`https://covid19.mathdro.id/api/countries/${this.country}`)
          .then(fetchedData => {
            this.countryStatus.infected.affected =
              fetchedData.data.confirmed.value
            this.countryStatus.recovered.affected =
              fetchedData.data.recovered.value
            this.countryStatus.death.affected = fetchedData.data.deaths.value
            this.lastUpdated = fetchedData.data.lastUpdate
          })
      } catch (err) {}
      this.isLoadingChild = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
/* purgecss start ignore */
fieldset[disabled] .multiselect {
  pointer-events: none;
}
.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}
.multiselect__spinner:after,
.multiselect__spinner:before {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-top-color: #41b883;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}
.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.multiselect--active .multiselect__select {
  transform: rotate(180deg);
}
.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: 100%;
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.multiselect__input:-ms-input-placeholder {
  color: #35495e;
}
.multiselect__input::placeholder {
  color: #35495e;
}
.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
.multiselect__tags-wrap {
  display: inline;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #41b883;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: normal;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.multiselect__tag-icon:after {
  content: "\D7";
  color: #266d4d;
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #369a6e;
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: #fff;
}
.multiselect__current {
  min-height: 40px;
  overflow: hidden;
  padding: 8px 30px 0 12px;
  white-space: nowrap;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
}
.multiselect__current,
.multiselect__select {
  line-height: 16px;
  box-sizing: border-box;
  display: block;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
}
.multiselect__select {
  position: absolute;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  text-align: center;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999;
  margin-top: 4px;
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: "";
}
.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}
.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}
.multiselect__content::webkit-scrollbar {
  display: none;
}
.multiselect__element {
  display: block;
}
.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
.multiselect__option--highlight {
  background: #41b883;
  outline: none;
  color: #fff;
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #41b883;
  color: #fff;
}
.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: 700;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}
.multiselect__option--group.multiselect__option--highlight {
  background: #35495e;
  color: #fff;
}
.multiselect__option--group.multiselect__option--highlight:after {
  background: #35495e;
}
.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: #ff6a6a;
  content: attr(data-deselect);
  color: #fff;
}
.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
[dir="rtl"] .multiselect {
  text-align: right;
}
[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0 40px;
}
[dir="rtl"] .multiselect__content {
  text-align: right;
}
[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}

/* purgecss end ignore */
</style>
