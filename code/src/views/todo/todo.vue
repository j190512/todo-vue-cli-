<template>
  <section class="content">
    <input type="text" class="add_input" autofocus placeholder="下一项目" @keyup.enter="addTodo" />
    <todo-item v-for="todo of filterTodos" :key="todo.id" :todo="todo" @selectItem="tabsChBoxState"></todo-item>
    <tabs
      class="tabs"
      :filter="filter"
      :tabs_chBox_state="tabs_chBox_state"
      @del="tabsChBoxState"
      @stateChange="filterChange"
      @all="allCompleted"
    ></tabs>
  </section>
</template>

<script>
import TodoItem from "./item.vue";
import tabs from "./tabs.vue";
export default {
  components: {
    TodoItem,
    tabs
  },
  data() {
    return {
      time: Math.floor(new Date() / 1000),
      // todos:[],
      filter: "全部",
      tabs_chBox_state: false //item被单独->全部选择后/有不选，发送状态使tabs中的全选框 勾上/取消勾选
    };
  },
  mounted() {
    this.$store.commit("changeAccount",this.$route.params.id)
    this.$store.commit("localUser",JSON.parse(localStorage.getItem(`${this.$route.params.id}Todos`)) )
  },
  methods: {
    addTodo(e) {
      if (e.target.value === "") {
        return;
      }
      let t = Math.floor(new Date() / 1000);
      //防止过快回车
      if (t - this.time < 1) {
        return;
      }
      this.time = Math.floor(new Date() / 1000);
      this.$store.commit("addTodo", {
        content: e.target.value.trim(),
        completed: false
      });
      e.target.value = "";
      this.tabsChBoxState();
      this.$store.commit("coverLocalTodos", this.$route.params.id);
    },
    //显示todoItem的列表
    filterChange(state) {
      this.filter = state;
      this.tabsChBoxState();
    },
    //改变状态（全部[已过滤的）
    allCompleted(flag) {
      for (let todo of this.filterTodos) {
        this.$store.commit("changeTodoCompleted", {
          id: todo.id,
          completed: flag
        });
        // todo.completed = flag;
      }
      this.$store.commit("coverLocalTodos", this.$route.params.id);
      this.tabsChBoxState();
    },
    //改变tabs组件的全选状态
    tabsChBoxState() {
      setTimeout(() => {
        if (this.filterTodos == "") {
          this.tabs_chBox_state = false;
          return;
        }
        for (let todo of this.filterTodos) {
          if (todo.completed == false) {
            this.tabs_chBox_state = false;
            return;
          }
        }
        this.tabs_chBox_state = true;
      }, 1);
    }
  },
  computed: {
    todos: function() {
      return this.$store.state.todos;
    },
    filterTodos() {
      if (this.filter === "全部") {
        return this.todos;
      }
      const completed = this.filter === "已完成"; //判断状态
      return this.todos.filter(todo => completed === todo.completed);
    }
  }
};
</script>

<style lang='stylus' scoped>
.content
  width 600px
  margin 0 auto
  .add_input
    margin 0
    width 100%
    height 50px
    font-size 25px
    line-height 25px
    border 0
    outline none
    padding 5px 40px
    border-radius 8px 8px 0 0
    box-sizing border-box
  .tabs
    border-radius 0 0 8px 8px
</style>
