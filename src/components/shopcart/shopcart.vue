<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left"  @click="toggleList">
        <div class="logo-wrapper" :class="{'highLight': totalCount>0}">
          <div class="logo" >
            <i class="icon-shopping_cart"></i>
          </div><!-- logo end-->
          <div class="num">
            {{totalCount}}
          </div>
        </div><!--logo-wrapper end-->
        <div class="price" :class="{'highlight': totalPrice>0}"  v-show="totalCount>0">
          ￥{{totalPrice}}元
        </div><!--price end-->
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div><!--desc end-->
      </div><!--content-left end -->
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div><!--content-right end -->
    </div><!--content end-->
    <div class="shopcart-list" v-show="listshow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div><!--list-header end-->
      <div class="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div><!--list-content end-->
      </div><!--shopcart-list end-->
  </div><!--shorpcart end-->
</template>

<script>
  // import BScroll from 'better-scroll'
  import cartcontrol from '../cartControl/cartControl.vue'
  export default {
    data () {
      return {
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 30,
            count: 2
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    }, // props end
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'no-enough'
        } else {
          return 'enough'
        }
      },
      listshow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      }
    }
  }
</script>

<style>
  @import "../../common/stylus/icon.css";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000;
  }
  .shopcart > .content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }
  .shopcart > .content .content-left {
    flex: 1;
  }
  .shopcart > .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top:-10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
   .shopcart > .content .content-left .logo-wrapper.highLight {
    background: blue;
  }
  .shopcart > .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  }
  .shopcart > .content .content-left .logo-wrapper logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
  }
  .shopcart > .content .content-left .logo-wrapper logo .icon-shopping_cart{
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }
  .shopcart > .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
  }
  .shopcart > .content .content-left .price.highlight{
    color:white;
  }
  .shopcart > .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    color: rgba(255,255,255,0.4);
    font-size: 10px;

  }

  .shopcart > .content .content-right{
    flex: 0 0 105px;
    width: 105px;
  }
  .shopcart > .content .content-right .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    
  }
  .shopcart > .content .content-right .pay.no-enough{
    background: #2b333b;
  }
  .shopcart > .content .content-right .pay.enough {
    background: #00b43c;
    color:#fff;
  }
  .shopcart > .shopcart-list {
    position: absolute;
    top: -100%;
    left: 0;
    z-index: -1;
    width: 100%;
  }
  /*.shopcart > .shopcart-list > .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .shopcart > .shopcart-list > .list-header > .title {
    float: left;
    font-size: 14px;
    color: rgb(7,17,27,0.1);
  }
  .shopcart > .shopcart-list > .list-header > .empty {
    float: right;
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .shopcart > .shopcart-list > .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
  }
  .shopcart > .shopcart-list > .list-content > .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border: 1px solid rgba(7,17,27,0.1);
  }
  .shopcart > .shopcart-list > .list-content > .food > .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .shopcart > .shopcart-list > .list-content > .food > .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
  }
  .shopcart > .shopcart-list > .list-content > .food > .cartcontrol {
    position: absolute;
    right: 0;
    bottom: 6px;

  }*/
</style>
