<template>
<div style="height:100%;">

  <div class="left">
    <ul>
      <router-link tag="li"
                   :to="{name:'List',params:{name:'Acanthopelma',id:18,page:1}}"
                   :class="$route.name === 'List' || $route.name === 'Form'?'active':''">
        🕷 蜘蛛管理
      </router-link>
      <router-link tag="li"
                   :to="{name:'AList',params:{name:'测试分类',id:6,page:1}}"
                   :class="$route.name === 'AList' || $route.name === 'AForm'?'active':''">
        ✍️ 文章管理
      </router-link>
      <router-link tag="li" :to="{name:'About'}">🕺 个人介绍</router-link>
      <router-link tag="li" :to="{name:'Scale'}">💰 售卖列表</router-link>
    </ul>
  </div>
  <div class="right">
    <router-view></router-view>
  </div>
  <div class="top">
    <div class="top-left">
      <router-link tag="h1" :to="{name:'Admin'}">TARANTULRS SOUL · 爬魂 / ADMIN PANEL</router-link>
    </div>
    <ul class="top-right">
      <li>
        <a href="http://tsreptile.com/" target="_blank">🌐 预览站点</a>
      </li>
      <li>{{userInfo.username}}</li>
      <li>
        <a href="javascript:;" @click="openChangePassModal=true">修改密码</a>
        <div class="changePassword" v-show="openChangePassModal">
          <div class="header">
            <strong>修改密码</strong>
            <a href="javascript:;" @click="openChangePassModal=false">❌</a>
          </div>
          <form @submit.prevent="changePassFn">
          <div class="body">
            <div :class="msgClass" v-show="showMsg">
              {{changeMsg}}
            </div>
            <h4>原始密码：</h4>
            <input type="password"
                   placeholder="原始密码"
                   v-model="origianPass"
                   name="origianPassWord"
                   v-validate="'required'"
                   :class="{'input': true,'is-danger': errors.has('origianPassWord') }">
            <span v-show="errors.has('origianPassWord')" class="help is-danger">⚠️ {{ errors.first('origianPassWord') }}</span>
            <h4>新密码：</h4>
            <input type="password"
                   placeholder="新密码"
                   v-model="newPass"
                   name="newPassWord"
                   v-validate="'required'"
                   :class="{'input': true,'is-danger': errors.has('newPassWord') }"
                   >
            <span v-show="errors.has('newPassWord')" class="help is-danger">⚠️ {{ errors.first('newPassWord') }}</span>
            <h4>确认新密码：</h4>
            <input type="password"
                   placeholder="确认新密码"
                   name="newPassWord2"
                   v-model="newPass2"
                   v-validate="'required|confirmed:newPassWord'"
                   :class="{'input': true,'is-danger': errors.has('newPassWord2') }"
                   >
            <span v-show="errors.has('newPassWord2')" class="help is-danger">⚠️ {{ errors.first('newPassWord2') }}</span>
            <button type="submit">确认修改</button>
          </div>
          </form>
        </div>
      </li>
      <li><a href="javascript:;" @click="loginOut">退出</a></li>
    </ul>
  </div>
</div>
</template>
<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      openChangePassModal: false,
      origianPass: '',
      newPass: '',
      newPass2: '',
      userInfo: {},
      showMsg: false,
      msgClass: '',
      changeMsg: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.login)
  },
  methods: {
    async loginOut () {
      await this.$axios({
        url: this.$api.loginOut,
        method: 'post'
      })
    },
    async changePassFn () {
      const result = await this.$validator.validateAll()
      if (result) {
        const change = await this.$axios({
          url: this.$api.changePassWord,
          method: 'post',
          data: {
            op: md5(this.origianPass),
            p: md5(this.newPass),
            id: this.userInfo.id
          }
        })
        if (change.data.errno === 1000) {
          this.msgClass = 'changeError'
          this.showMsg = true
          this.changeMsg = change.data.errmsg
        } else {
          this.msgClass = 'changeSuccess'
          this.showMsg = true
          this.changeMsg = '✅ 密码修改成功'
          this.origianPass = ''
          this.newPass = this.newPass2 = ''
        }
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$border-blue:1px solid #9bd6ff;
$border-yellow:1px solid #223047;

.active{
  background: #fff;
}
.top{
  height: 50px;
  width: 100%;
  // border-bottom: $border-blue;
  color: #fff;
  background: linear-gradient(#313950 30%, #272a33 90%);
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 1000001;
  .top-left{
    display: flex;
    align-items: center;
    h1{
      margin: 0;
      font-size: 20px;
      font-weight: bolder;
      padding-left: 20px;
      color: #5adb2d;
    }
  }
  .top-right{
    display: flex;
    margin: 0;
    a{
      color: #fff;
    }
    li{
      display: inline-flex;
      align-items: center;
      padding: 0 10px;
      border-left: 1px solid #353e57;
      position: relative;
      .changePassword{
        position: absolute;
        width: 200px;
        // height: 270px;
        background: #fff;
        border:1px solid #000;
        right: 0;
        top: 40px;
        z-index: 10000000;
        .header{
          border-bottom: 1px solid #000;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          background: #ff8a8a;
        }
        .body{
          padding: 10px;
          .changeSuccess,
          .changeError{
            text-align: center;
            padding: 10px;
          }
          .changeError{
            border:1px solid #ff8a8a;
            background: #ffd6d6;
            color: #ff8a8a
          }
          .changeSuccess{
            background: #ebffeb;
            border: 1px solid #78de9b;
            color: #78de9b;
          }
          h4{
            margin: 10px 0 4px 0;
          }
          button,input{
            width: 100%;
            box-sizing: border-box;
          }
          button{
            margin-top: 10px;
          }
        }

      }
    }
  }
}
.left{
  width: 100px;
  position: fixed;
  top: 50px;
  bottom: 0;
  background: #0c1829;
  border-right: $border-yellow;
  flex-shrink: 0;
  ul{
    width: 100%;
    margin: 0;
    padding: 0;
    li{
      border-bottom: $border-yellow;
      margin-right: 0;
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color:rgb(150, 161, 177);
      cursor: pointer;
      &:hover{
        background: #fff;
        // color:#fff;
      }
    }
  }
}
.right{
  position: absolute;
  margin: 50px auto auto 101px;
  display: flex;
  right: 0;
  left: 0;
}
</style>
