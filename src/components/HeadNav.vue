<template>
  <header>
    <ul>
      <li class="link-item" v-for="(item, idx) in menus" :key="idx" :class="{'current': item.key === currentMenu}" @click="jump(item.key)">
        {{item.name}}
      </li>
    </ul>
    <h1>this is header</h1>
  </header>
</template>
<script>
export default {
  name: 'HeadNav',
  data () {
    return {
      currentMenu: 'pageone',
      menus: [
        {
          key: 'pageone',
          name: '页面一'
        },
        {
          key: 'pagetwo',
          name: '页面二'
        }
      ] // 菜单配置
    }
  },
  methods: {
    jump (key) {
      if (key === this.currentMenu) return
      this.currentMenu = key
      this.$router.push({path: `/${key}`})
    }
  }
}
</script>
<style scoped>
.link-item {
  cursor: pointer;
}
.current {
  color: orange;
}
</style>
