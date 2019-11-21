<template>
  <div class="wrap">
    <div class="content">
      <div v-if="vif">
        <h6 class="title">登录</h6>
        <div>
          账号:
          <input
            type="text"
            placeholder="账号"
            id="ac"
            autofocus
            ref="accountL"
            v-on:input="inTest"
            autocomplete="off"
          />
          <span v-show="testAccount">6位数字</span>
        </div>
        <div>
          密码:
          <input
            type="text"
            placeholder="密码"
            id="pwd"
            ref="pwd"
            v-on:input="inTest"
            autocomplete="off"
          />
          <span v-show="testPwd">6位数字</span>
        </div>
        <div>
          <button class="register" @click="register">注册</button>
          <button class="login" @click="login">登录</button>
        </div>
      </div>

      <div class="reg" v-if="!vif">
        <transition name="fade">
          <div>
            <h6 class="title">注册</h6>
            <div class="close" @click="backLogin">X</div>
            <div>
              新账号:
              <input
                type="text"
                placeholder="账号"
                id="ac"
                autofocus
                ref="accountR"
                v-on:input="inTest"
                autocomplete="off"
              />
              <span v-show="testAccount">6位数字</span>
            </div>
            <div>
              新密码:
              <input
                type="text"
                placeholder="密码"
                id="pwd"
                ref="pwd"
                v-on:input="inTest"
                autocomplete="off"
              />
              <span v-show="testPwd">6位数字</span>
            </div>
            <div>
              <button class="sure" @click="registerSure">确定</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      testAccount: false,
      testPwd: false,
      temp: Number, //记录注册后的账号以便于在登录页显示
      vif: true //切换登录注册页
    };
  },
  mounted() {
    this.temp = this.$store.state.account
    this.$refs.accountL.value = this.temp;
    if(this.temp == 123456){
      this.$refs.pwd.value = 654321
    }
    // localStorage.clear();
    //本地缓存初始化账号
    if (this.$store.state.fristTimeTodoInit) {
      this.init();
    }
  },
  methods: {
    init() {
      localStorage.setItem(this.temp, this.$refs.pwd.value);
      // //第一次加载(自动创建的todo账号)就将todos缓存在本地
      let tempTodos = this.$store.state.todos;
      localStorage.setItem(`${this.temp}Todos`, JSON.stringify(tempTodos));
      this.$store.commit("handleFristTimeFlag");
    },
    login() {
      let params = {
        account: this.$refs.accountL.value,
        pwd: this.$refs.pwd.value
      };
      if (params.account == "" || params.pwd == "") {
        this.$notify({ content: "账号或密码不能为空" });
        return;
      }
      if (
        localStorage.getItem(`${this.$refs.accountL.value}`) &&
        localStorage.getItem(`${this.$refs.accountL.value}`) == params.pwd
      ) {
        this.loginSuccess(this.$refs.accountL.value);
        return;
      }
      this.$notify({ content: "账号或密码错误" });
      // this.$axios
      // .get(`/api/user.json`, params)
      // .then(res => {
      //   console.log(res.status);
      //   // 请求成功，判断账号密码是否正确
      //   if (res.status == 200) {
      //     let data = res.data;
      //     for (let user of data) {
      //       if (user.account == params.account && user.pwd == params.pwd) {
      //         return;
      //       }
      //     }
      //     this.$notify({ content: "账号或密码错误" });
      //   } else {
      //     this.$notify({ content: "系统出错" });
      //   }
      // })
      // .catch(e => console.log(e));
    },
    register() {
      this.testAccount = false;
      this.testPwd = false;
      this.vif = !this.vif;
    },
    registerSure() {
      //账号或密码空
      if (this.$refs.accountR.value == "" || this.$refs.pwd.value == "") {
        this.$notify({ content: "注册失败" });
        return;
      }
      //账号或密码不通过正则
      if (this.testAccount || this.testPwd) {
        this.$notify({ content: "注册失败" });
        return;
      }
      if (localStorage.getItem(`${this.$refs.accountR.value}`)) {
        this.$notify({ content: "账号已存在" });
        return;
      }
      //存储本地账号密码
      let pwd = this.$refs.pwd.value;
      this.temp = this.$refs.accountR.value;
      localStorage.setItem(`${this.$refs.accountR.value}`, pwd);
      this.$notify({ content: "注册成功" });
      //创建本地todos
      if (!localStorage.getItem(`${this.temp}Todos`)) {
        localStorage.setItem(`${this.temp}Todos`, JSON.stringify([]));
      }
      //延迟切换页面  等notify执行
      setTimeout(() => {
        this.vif = !this.vif;
      }, 1500);
      //v-if 渲染 会有一小段时间的延迟 这里让登录页的账号等于注册页的账号
      setTimeout(() => {
        if (this.$refs.accountL.value == "") {
          this.$refs.accountL.value = this.temp;
        }
        // console.log(this.$refs.accountL)
      }, 2000);
    },
    backLogin() {
      this.vif = !this.vif;
      setTimeout(() => {
        this.$refs.accountL.value = this.temp;
        this.testAccount = !this.reg(this.$refs.accountL.value) ? true : false;
      }, 500);
    },
    inTest(e) {
      if (e.target.id == "ac") {
        this.testAccount = !this.reg(e.target.value) ? true : false;
      } else if (e.target.id == "pwd") {
        this.testPwd = !this.reg(e.target.value) ? true : false;
      }
    },
    //登录成功
    loginSuccess(account) {
      this.$notify({ content: "登录成功" });
      // this.$refs.pwd.value = "";
      this.$router.push(`/app/${account}`);
    },
    reg(str) {
      let patt = /^\d{6}$/;
      return patt.test(str);
    }
  }
};
</script>

<style lang='stylus' scoped>
h6
  padding 0
  margin 0
.wrap
  position relative
  text-align center
  height 200px
  padding 10px 20px
  .content
    position absolute
    width 350px
    height 200px
    left 50%
    transform translate(-50%)
    border-radius 10px
    background-color #8FBE89
    .title
      position absolute
      left 50%
      transform translateX(-50%)
      top 0
    div
      position relative
      height 30px
      font-size 20px
      margin-top 10px
      padding 10px
      input
        line-height 30px
        width 190px
        outline none
        font-size 18px
        border 1px solid black
        border-radius 10px
        padding-left 5px
        margin-left 20px
      button
        width 60px
        margin 0
        padding 5px
        border 1px solid black // 自定义边框
        outline none
        border-radius 10px
        cursor pointer
        &:hover
          background rgb(200, 200, 200)
      .register
        float left
        margin-left 100px
      .login
        float right
        margin-right 36px
      .sure
        width 260px
      span
        position absolute
        display block
        font-size 10px
        color red
        bottom -8px
        right 45px
    .reg
      position absolute
      padding 0
      margin 0
      top 0px
      width 100%
      height 100%
      border-radius 10px
      background-color #749C6E
      .close
        padding 8px
        position absolute
        top -15px
        right 5px
        border 1px solid black
        border-radius 50%
        background-color #fff
        color black
        font-size 8px
        height 8px
        width 8px
        line-height 8px
        text-align center
        cursor pointer
        &:hover
          background rgb(200, 200, 200)
</style>
