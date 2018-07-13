<template>
  <div class="hello">
    {{msg}}
    <hello />
  </div>
</template>

<script>
import Hello from '@/components/HelloWorld'
export default {
  name: 'Index',
  components: {
    Hello
  },
  data () {
    return {
      msg: 'This is pageTwo!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  color: blue;
}
</style>
