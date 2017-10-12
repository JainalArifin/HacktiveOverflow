<template lang="html">
  <div class="">
    <Question></Question>
    <router-view></router-view>
  </div>
</template>

<script>
import Question from './Question'
export default {
  components: {
    Question
  }
}
</script>

<style lang="css">
</style>
