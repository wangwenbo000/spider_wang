<template>
  <div class="search">
    <transition name="fade">
      <h2 class="slogen">
        {{$t('message.slogen')}}
      </h2>
      </transition>
      <router-link tag="a" :to="{name:'Video',params:{vid:'t0150btuqbk',title:'TARANTULRS SOUL'}}">
        <i class="iconfont video">&#xe895;</i>
      </router-link>
    <div class="search-bar">
      <input type="text"
             autofocus
             :placeholder="$t('message.searchPlaceholder')"
             v-model="searchV"
             @keyup.enter="submit"/>
      <select name="" id="" v-model="searchT">
        <option value ="spider">{{$t('message.select.spider')}}</option>
        <option value ="article">{{$t('message.select.article')}}</option>
      </select>
      <!-- <span class="pull"></span> -->
      <router-link tag="button"
                   :to="{name:'searchRes',params:{key:searchV,type:searchT,page:1}}"
                   v-if="searchV.length>0"
                   class="search-btn">
        <i class="iconfont">&#xe741;</i>
      </router-link>
    </div>
    <transition name="fade">
      <div class="searchInfo" v-if="searchMsg">
        {{$t('message.searchKeyEmpty')}}
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchV: '',
      searchT: 'spider',
      searchMsg: false
    }
  },
  methods: {
    submit () {
      if (this.searchV.length <= 0) {
        this.searchMsg = true
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.searchMsg = false
        }, this.$conf.searchErrMsgTimeOut)
        return false
      } else {
        this.$router.push({
          name: 'searchRes',
          params: {
            key: this.searchV,
            type: this.searchT,
            page: 1
          }
        })
      }
    }
  }
}
</script>
<style lang='scss'>
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    select{
      border: none;
      appearance:none;
      margin: 0;
      border-radius: 0;
      outline: none;
      padding: 0 30px 0 20px;
      background: #735DEE url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAMAAAD886zOAAAAM1BMVEUAAABdS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldeDsuAAAAEHRSTlMACc4c8OqoSTx42Gonm7aDLJmiqgAAANpJREFUSMet0UkKwlAABNGOGX7meP/TKioWCJKBqm1Db17Gu9qYuTH/mjkp5mHJs8372/Jqtf7WvKtGCaTKp7mRQL4VB4QMmCFkwKwhYAwQYBwQKhIIDRIIdVf/upAAAwgBo4BQsUCAsUCAkUCAuZ37u1XZqW5OgdTZrVggwFggwFggwEggwLRH/to6h+uPHPY50WCBAGOBAGOBACOBACOB0PT/b8qlOgsEGAsEGAkEGAsEGAmElt+/hU2BAcSBAcSBAcSBAcSBAUSCAcSBAcSBAcSBAUSCOQryAFWifgcBhsGcAAAAAElFTkSuQmCC') 90% center no-repeat;
      background-size: 16%;
      color: #fff;
      font-size: 14px;
      position: relative;
    }
    // .pull{
    //     display: block;
    //     width: 20px;
    //     margin-left: -24px;
    //     z-index: 100;
    //     background: #735DEE url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAMAAAD886zOAAAAM1BMVEUAAABdS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldS6ldeDsuAAAAEHRSTlMACc4c8OqoSTx42Gonm7aDLJmiqgAAANpJREFUSMet0UkKwlAABNGOGX7meP/TKioWCJKBqm1Db17Gu9qYuTH/mjkp5mHJs8372/Jqtf7WvKtGCaTKp7mRQL4VB4QMmCFkwKwhYAwQYBwQKhIIDRIIdVf/upAAAwgBo4BQsUCAsUCAkUCAuZ37u1XZqW5OgdTZrVggwFggwFggwEggwLRH/to6h+uPHPY50WCBAGOBAGOBACOBACOB0PT/b8qlOgsEGAsEGAkEGAsEGAmElt+/hU2BAcSBAcSBAcSBAcSBAUSCAcSBAcSBAcSBAUSCOQryAFWifgcBhsGcAAAAAElFTkSuQmCC') center no-repeat;
    //     background-size: 80%;
    //   }
    .slogen{
      font-size: 36px;
      font-weight: 100;
      text-align: center;
      color:#735DEE;
      margin-top: 100px;
    }
    .video{
      font-size: 50px;
      color:#735DEE;
      transition: all .3s;
      &:active{
        transform: scale(.96);
      }
    }
    .search-bar{
      width: 1080px;
      background: #fff;
      height: 50px;
      display: flex;
      margin-top: 38px;
      input,button{
        outline:none;
      }
      input{
        border:none;
        width: 1020px;
        height: 50px;
        padding: 0 20px;
        font-size: 18px;
        text-align: center;
      }
      button{
        width: 60px;
        height: 50px;
        border: none;
        background: #735DEE;
        color: #fff;
        font-size: 32px;
        &:active{
          background: darken(#735DEE, 10%);
        }
      }
    }
    .searchInfo{
      width: 1080px;
      height: 50px;
      background: #735DEE;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color:#fff;
      font-size: 14px;
    }
  }
</style>
