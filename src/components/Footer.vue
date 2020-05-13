<template>
  <div class="bg-gray-800 py-6 text-gray-200">
    <p>Developed By:</p>
    <a class="hover:underline font-semibold" :href="lifercUrl">Life RC</a>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      lifercUrl: "https://life-rc.com"
    }
  }
}
</script>

<style></style>
