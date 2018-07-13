<template>
  <div id="app">
    <head-nav />
    <h1>主页</h1>
    <router-view/>
  </div>
</template>

<script>
import HeadNav from '@/components/HeadNav'
export default {
  name: 'App',
  components: {
    HeadNav
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
