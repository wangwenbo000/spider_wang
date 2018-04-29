<template>
  <div class="hello">
    <img src="../assets/logo.png" class="logo">
    <form @submit.prevent="login">
      <div class="msg" v-show="errmsg">💢 账号 or 密码错误 !</div>
      <input type="text" placeholder="UserName" v-model="username" autofocus>
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">登陆</button>
    </form>
    <p>Copyright © 2014-2017 沪ICP备17040199号-1</p>
    <p>Power by superset.studio</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      username: '',
      password: '',
      errmsg: false
    }
  },
  created () {
    if (localStorage.auth === 'true') {
      this.$router.push({
        name: 'Admin'
      })
    }
  },
  methods: {
    async login () {
      let loginRes
      try {
        loginRes = await this.$axios({
          method: 'post',
          url: this.$api.login,
          data: {
            username: this.username,
            password: this.password
          }
        })
      } catch (e) {
        this.errmsg = true
        localStorage.auth = false
        this.username = ''
        this.password = ''
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.errmsg = false
        }, 3000)
      }
      localStorage.login = JSON.stringify(loginRes.data.data)
      this.$router.push({
        name: 'Admin'
      })
      localStorage.auth = true
    }
  }
}
</script>
<style lang="scss" scoped>
.hello{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #272a33;
  justify-content: center;
  align-items: center;
  .logo{
    width: 220px;
    display: block;
    margin-bottom: 20px;
  }
  p{
    margin: 8px 0 0 0;
    color: #4f4f5d;
  }
  form{
    background: darken(#272a33,2%);
    padding: 12px;
    border: 1px solid #343741;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .6) inset;
    input{
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4) inset;
      // border:1px solid darken(#272a33,4%);
      border: 1px solid #ccc;
      font-size: 20px;
      display: block;
      color: #3b3b8f;
      margin-bottom: 10px;
    }
    button{
      width: 100%;
      padding: 10px;
      font-size: 20px;
      border-radius: 4px;
      color: #3b3b8f;
      font-weight: bold;
      border: 1px solid #fff;
      text-shadow: 1px 1px 0 #fff;
      background: linear-gradient(#e5e5e5 30%, #D6D6D6 90%);
      &:hover{
        background: linear-gradient(#D6D6D6 30%, #e5e5e5 90%);
      }
    }
  }

}
.msg{
  color:#fff;
  font-size: 14px;
  margin: 0 auto 10px auto;
  padding: 10px;
  background: lighten(#ff0000,20%);
  border-radius: 4px;
  border: 1px solid #ff0000;
}
</style>
