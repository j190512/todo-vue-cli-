<template>
  <div class="todo_item">
    <input
      type="checkbox"
      v-model="completed"
      :id="'checkbox'+todo.id"
      @click="selectItem(todo.id)"
    />
    <label :for="'checkbox'+todo.id"></label>
    <span
      :class="['txt',todo.completed ? 'completed' : '']"
    >{{todo.content}}</span>
    <button class="destory" @click="deleteTodo(todo.id)">X</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timer: null,
      tip: false,
      completed: this.todo.completed
    };
  },
  methods: {
    deleteTodo(id) {
      if (this.todo.completed == true) {
        this.$store.commit("deleteTodo", id);
        this.$store.commit("coverLocalTodos", this.$route.params.id);
        return;
      }
      this.$notify({ content: "先完成,再删除" });
    },
    selectItem(id) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.commit("changeTodoCompleted", {
          id,
          completed: this.completed
        });
        this.$emit("selectItem");
      }, 1);
    }
  },
  watch: {
    "todo.completed": function() {
      this.completed = this.todo.completed;
      // console.log("completed改变")
    },
    deep: true
  }
};
</script>

<style lang='stylus' scoped>
.todo_item
  position relative
  background-color #fff
  font-size 25px
  line-height 25px
  background rgb(224, 224, 224)
  padding 5px
  border-bottom 1px solid rgba(0, 0, 0, 0.5)
  .completed
    color rgb(85, 85, 85)
    text-decoration-line line-through
  &:hover
    background rgb(200, 200, 200)
  input[type='checkbox']
    display none
  input[type='checkbox'] + label:before
    content ''
    text-align center
    position absolute
    width 30px
    height 30px
    line-height 30px
    top 0
    bottom 0
    // right 0
    left 0
    margin auto 0
    border-radius 50%
    background-color #fff
    cursor pointer
  input[type='checkbox']:checked + label:before
    content '√'
  .txt
    margin-left 40px
  .destory
    position absolute
    right 5px
    top 0
    bottom 0
    margin auto 0
    width 30px
    height 30px
    background-color #fff
    outline none
    border-radius 10px
    vertical-align text-bottom
    cursor pointer
    box-shadow 0px 1px 2px rgba(0, 0, 0, 0.2)
    border 0.2px solid rgba(0, 0, 0, 0.2)
    &:active
      background-color rgb(124, 160, 150)
</style>
