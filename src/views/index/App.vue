<template>
  <div id="app">
    <hello name="index"/>
    <table-show :head-data="headData" :data="data" />
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import TableShow from './components/TableShow'

export default {
  name: 'App',
  components: {
    Hello,
    TableShow
  },
  data () {
    return {
      headData: [{
        prop: 'name',
        label: '姓名'
      }, {
        prop: 'age',
        label: '年龄'
      }, {
        prop: 'gender',
        label: '性别'
      }, {
        prop: 'class',
        label: '班级'
      }, {
        prop: 'grade',
        label: '年级'
      }],
      data: [{
        name: '萧炎',
        age: '18',
        gender: '男',
        class: '9班',
        grade: '高三'
      }]
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
