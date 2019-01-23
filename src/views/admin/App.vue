<template>
  <div id="app">
    <img-show :src="logo" alt="LOGO" />
    <hello name="admin"/>
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import ImgShow from './components/ImgShow'
import logo from '@/assets/logo.png'

export default {
  name: 'App',
  components: {
    Hello,
    ImgShow
  },
  data () {
    return {
      logo
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
