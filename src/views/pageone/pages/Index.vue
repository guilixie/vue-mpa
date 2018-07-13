<template>
  <div class="hello">
    {{msg}}
    <test />
  </div>
</template>

<script>
import Test from '../comps/Test'
export default {
  name: 'Index',
  components: {
    Test
  },
  data () {
    return {
      msg: 'This is pageOne!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  color: red;
}
</style>
