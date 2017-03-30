<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from './components/header/header'
  const ERR_OK = 0
  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style>
  body, html {
    line-height: 1;
    font-weight: 200;
    font-family: "宋体"; 
  }
  #app > .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  #app > .tab > .tab-item {
    flex: 1;
    text-align: center;
  }
  #app > .tab > .tab-item > a {
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  #app > .tab > .tab-item > a.router-link-active{
    color: rgb(240,20,20);
  }

</style>
