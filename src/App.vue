<template>
  <div id="app">
    <hea-der></hea-der>
    <links></links>
  </div>
</template>

<script>
import HeaDer from "./components/header";
import links from "./components/links";
export default {
  name: "App",
  components: {
    HeaDer,
    links,
  },
};
</script>

<style>
@import "./assets/css/base.css";
@import "./assets/css/index.css";
</style>
