<template>
  <div class="hello">
    <h1 class="color-blue">Hello, {{ name }}</h1>
    <h2 class="color-green">{{ msg }}</h2>
    <h3>Project examples</h3>
    <ul>
      <li>
        <a
          :href="routeConfig.url"
          target="_blank"
        >
        {{routeConfig.label}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: ['name'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    routeConfig () {
      const map = {
        admin: 'home',
        home: 'admin'
      }
      return {
        url: `/${map[this.name]}.html`,
        label: `跳转到${map[this.name]}`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.color-blue {
  color: #409eff;
}
.color-green {
  color: #67c23a;
}
</style>
