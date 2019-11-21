<template>
  <div class="tab">
    <input type="checkbox" id="checkbox" ref="selectAll"
    @click="selectAll"
    >
    <label for="checkbox"></label>
    <span class="desc">全选</span>
    <div class="items">
        <button v-for="item in states" :key='item'
        :class="filter === item ? 'actived': ''"
        @click="selectKind(item)">
      {{item}}
    </button>
    </div>
    <button @click="del" class="del">删除</button>
  </div>
</template>

<script>
export default {
  props:{
    filter:{
      type:String,
      required:true
    },
    tabs_chBox_state:{
      type:Boolean,
      required:true
    }
  },
data(){
  return {
    flag: false,
    states: ['全部','待完成','已完成'],
  }
},
methods:{
  del(){
    this.$store.commit("delAllTodo")
    this.$store.commit('coverLocalTodos',this.$route.params.id);
    this.$emit("del")
  },
  selectAll(){
    // console.log(typeof this.$refs.selectAll.checked)
    this.$emit('all',this.$refs.selectAll.checked)
  },
  selectKind(item){
    this.$emit('stateChange',item)
  }
},
watch:{
  'tabs_chBox_state':function () {
    this.$refs.selectAll.checked = this.tabs_chBox_state
  }
}
}
</script>

<style lang='stylus' scoped>
  .tab{
    position relative
    width 100%
    height 40px
    line-height 40px
    color #000
    background-color rgb(200,200,200)
    padding 0 5px
    box-sizing border-box
    input[type='checkbox']{
      display none
    }
    input[type='checkbox']+label:before{
      content ''
      position absolute
      left 5px
      top 0
      bottom 0
      margin auto 0
      text-align center
      width 25px
      height 25px
      line-height 25px
      border 1px solid black
      border-radius 50%
    }
    input[type='checkbox']:checked+label:before{
        content '√'
        background-color rgb(124,160,150)
        }
    .desc{
      margin-left 40px
      }
    button{
      border 1px solid black
      border-radius 10px
      outline none
      height 30px
      cursor pointer
      // background-color #fff
      margin 0 2px
      &:hover{
        background rgb(200,200,200)
        }
    }
    .actived{
        background rgb(124,160,150) !important
        }
    .items{
      position absolute
      top 0
      bottom 0
      left 50%
      transform translate(-50%)
      }
    .del{
        position absolute
        top 0
        bottom 0
        right 5px
        margin auto 0
      &:active{
        background-color rgb(124,160,150)
      }
    }
  }
</style>
