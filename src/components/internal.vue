<!--  -->
<template>
  <div class="ia">
    <slot name="internal-i-text"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.ia {
  width: 100%;
}
p:hover {
  background: #000000;
}
.ia p {
  color: white;
  font-size: 15px;
  line-height: 60px;
  width: 100%;
  height: 100%;
  display: block;
}
.ia p {
  transition: 0.5s;
}
</style>
