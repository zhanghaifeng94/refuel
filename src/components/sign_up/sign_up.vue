<template>
    <div class="sign_up">
      <div class="header">
        <div class="iconfont icon-close go_back" @click="go_back()"></div>
        <div class="name">M50e站</div>
        <router-link class="sign_in" to="sign_in">登录</router-link>
      </div>
      <div class="form">
        <div class="phone">
          <input type="text" placeholder="请输入手机号" v-model="account.phone" @blur="verify(account.phone)">
        </div>
        <div class="code">
          <input type="text" placeholder="输入验证码" v-model="account.code" @input="all()">
          <span class="true" v-if="code" @click="vcode()">{{countDownText}}</span>
          <span class="false" v-if="!code">{{countDownText}}</span>
        </div>
        <div class="password">
          <input type="password" v-model="account.password" placeholder="请设置密码" @input="all()">
        </div>
        <div class="Invitation">
          <input type="text" v-model="account.Invitation" placeholder="邀请码（选填）">
        </div>
        <button class="button"  v-if="!button">注册</button>
        <button class="button1" v-if="button" @click="sign_up()">注册</button>
      </div>
      <!--<div class="weixin">-->
        <!--<router-link class="weixin_sign_in" to="#">-->
          <!--<div class="iconfont icon-weixin"></div>-->
          <!--微信快捷登入-->
        <!--</router-link>-->
      <!--</div>-->
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import API from 'api/api'
export default {
  data() {
    return {
      code: false,
      button: false,
      account: {
        phone: '',
        password: '',
        code: '',
        Invitation: ''
      },
      countDownText: '获取验证码'
    }
  },
  methods: {
    verify(val) {
      let regular = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regular.test(val)) {
        this.code = true
      } else {
        Toast('手机号格式错误')
      }
      this.all()
    },
    countDown() {
      if (this.countDownText === '获取验证码' || this.countDownText === '再次发送') {
        let count = 60
        let vm = this
        function settime () {
          if (count === 0) {
            vm.countDownText = '再次发送'
            count = 60
            vm.code = true
          } else {
            vm.code = false
            vm.countDownText = count + 's'
            count--
            setTimeout(function() {
              settime()
            }, 1000)
          }
        }
        settime()
      }
    },
    all() {
      if (this.account.phone !== '' && this.account.code !== '' && this.account.password !== '') {
        this.button = true
      } else {
        this.button = false
      }
    },
    go_back() {
      this.$router.go(-1)
    },
    vcode() {
      let params = 'phone=' + this.account.phone
      let vm = this
      API.getVcode(params).then(result => {
        if (result.status === 1000) {
          Toast('验证码发送成功')
          vm.countDown()
        } else {
          Toast('验证码发送失败')
        }
      })
    },
    sign_up() {
      let vm = this
      let params = 'phone=' + this.account.phone + '&vcode=' + this.account.code + '&password=' + this.account.password+'invitecode=' + this.account.Invitation
      if (this.account.password.length < 6) {
        Toast('密码不能少于6位')
      } else {
        API.sign_up(params).then(result => {
          if (result.status === 1000) {
            Toast(result.msg)
            vm.$router.push({
              path: `/sign_in`
            })
          } else {
            Toast(result.msg)
          }
        })
      }
    }
  },
  mounted() {
    this.all()
  },
  watch: {
    '$route' (to) {
      this.account.phone = ''
      this.account.code = ''
      this.account.password = ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .sign_up
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background-t
    padding 0 16px
    box-sizing border-box
    .header
      display flex
      justify-content space-between;
      margin-bottom 30px
      height: 48px
      line-height 48px
      color #929292
      font-size 20px
      .go_back
        font-size 20px
        color #bebebe
      .sign_in
        font-size 12px
    .form
      width: 100%
      .phone,.code,.password,.Invitation
        height: 40px
        background #e8e8e8
        margin-bottom 10px
        font-size $font-size-medium
        input
          width: 100%
          height: 100%
          background #e8e8e8
          padding 0 16px
          box-sizing border-box
          color #929292
          border none
      .code
        input
          width: 70%
        span
          width: 86px
          height: 28px
          display inline-block
          border-radius 14px
          text-align center
          line-height 28px
        .false
          border 1px solid #bebebe
          color: #bebebe
        .true
          border 1px solid $color-header-background
          color: $color-header-background
      button
        width: 100%
        height: 40px
        line-height 40px
        text-align center
        margin-top 55px
        outline none
        border none
        border-radius 4px
      .button
        background #c9c9c9
        color: #ebebeb
      .button1
        background $color-header-background
        color: $color-text
    .weixin
      margin-top 90px
      text-align center
      font-size $font-size-small
      .weixin_sign_in
        display inline-block
      .iconfont
        font-size 34px
        color #71C253
        margin-bottom 10px

</style>
