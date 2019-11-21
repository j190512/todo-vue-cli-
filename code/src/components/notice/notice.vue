<template>
  <transition name="fade">
    <div class="wrap" v-if="visible" @mouseenter="clearTimer"
    @mouseleave="autoDel">
      <span>{{content}}</span>
      <div class="btn" @click="del">X</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "notice",
  props: {
    contentProp: {
      type: String,
      default: "通知"
    }
  },
  data() {
    return {
      content:'' || this.contentProp,
      visible: false,
      time:2000,
      timer:null
    };
  },
  mounted(){
    this.autoDel()
  },
  methods: {
    clearTimer(){
      clearTimeout(this.timer)
    },
    autoDel(){
       this.timer=setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
    del() {
     this.visible = false;
    }
  }
};
</script>

<style lang='stylus' scoped>
.wrap
  position fixed
  top 10px
  left 50%
  transform translateX(-50%)
  color #949A90
  height 40px
  width 200px
  background #2C3B24
  line-height 40px
  border-radius 10px
  padding 0 10px
  box-shadow 0 10px 20px #333333
  span
    display inline-block
    max-width 170px
    overflow hidden
  .btn
    display inline-block
    float right
    height 15px
    width 15px
    line-height 15px
    border 1px solid black
    border-radius 50%
    text-align center
    margin-top 12px
    cursor pointer
</style>
