<template>
  <div class="hello">
    <div class="msg" v-show="errmsg">❌ 账号 || 密码错误</div>
    <form @submit.prevent="login">
      <input type="text" placeholder="UserName" v-model="username" autofocus>
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">login</button>
    </form>
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
      const loginRes = await this.$axios({
        method: 'post',
        url: this.$api.login,
        data: {
          username: this.username,
          password: this.password
        }
      })
      if (loginRes.data.errno === 401) {
        this.errmsg = true
        localStorage.auth = false
      } else {
        localStorage.login = JSON.stringify(loginRes.data.data)
        this.$router.push({
          name: 'Admin'
        })
        localStorage.auth = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  display: flex;
  height: 100%;
  background: #2b2b2b;
  justify-content: center;
  align-items: center;
}
.msg{
  color:#ff0000;
  width: 200px;
  margin: 20px auto;
  border: 1px solid #ff0000;
}
</style>
