<template>
  <div id="app">
    <div>
      <todo-header></todo-header>
      <router-view :key="this.$route.params.id"></router-view>
      <todo-footer></todo-footer>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./layout/header.vue";
import TodoFooter from "./layout/footer.jsx";
export default {
  name: "App",
  components: {
    TodoHeader,
    TodoFooter
  },

  mounted() {
    //解决修改地址栏，第一次没有触发v-router
  },
};
</script>

<style>
</style>
