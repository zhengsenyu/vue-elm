<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{ seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .header{
    color: #fff;
    background: #000;
  }
  .header > .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .header > .content-wrapper > .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .header > .content-wrapper > .avatar > img{
    border-radius: 2px;
  }  
  .header > .content-wrapper > .content{
    display: inline-block;
    margin-left: 16px;
  }
  .header > .content-wrapper > .content > .title {
    margin: 2px 0 8px 0;
  }
  /*.header > .content-wrapper > .content > .title > .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background: url('./brand@3x.1.png') no-repeat 30px 18px;
  }*/
  .header > .content-wrapper > .content > .title > .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header > .content-wrapper > .content > .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .header > .content-wrapper > .content > support{
    width: 12px;
    height: 12px;
  }  
  /*.header > .content-wrapper > .content > support > .icon{
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background: url('./brand@3x.png') no-repeat 12px 12px;
    
  }  */
  .header > .content-wrapper > .content > support > .text{
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
</style>
