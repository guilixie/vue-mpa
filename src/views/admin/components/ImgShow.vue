<template>
  <div class="img-show">
    <img :src="src" :alt="alt">
  </div>
</template>
<script>
export default {
  name: 'ImgShow',
  props: ['src', 'alt']
}
</script>
<style scoped>
.img-show{
  display: inline-block;
  border: 2px solid #606266;
  background: #fff;
}
</style>
