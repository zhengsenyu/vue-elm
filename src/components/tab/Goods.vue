<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" @click="selectMenu(index, $event)" class="menu-item" :class="{'current': currentIndex === index}">
          <span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" >
      <ul>
        <li v-for="item in goods" class=" food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartControl from '../cartControl/cartControl.vue'
  const ERR_OK = 0
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 获取区间
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this.initScroll()
            this.calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodsWrapper = document.getElementsByClassName('foods-wrapper')[0]
        let foodList = foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      initScroll () {
        // console.log(this.$els.menuWrapper.offest)
        let menuWrapper = document.getElementsByClassName('menu-wrapper')[0]
        let foodsWrapper = document.getElementsByClassName('foods-wrapper')[0]
        this.menuScroll = new BScroll(menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      calculateHeight () {
        let foodsWrapper = document.getElementsByClassName('foods-wrapper')[0]
        let foodList = foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart,
      cartControl
    }
  }
</script>

<style>
  .goods {
    display: flex;
    position: absolute;
    width:100%;
    top: 146px;
    bottom: 46px;
    overflow: hidden;
  }
  .goods > .menu-wrapper{
    /*第一个参数表示分布，第二表示缩放，第三表示占位*/
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods > .menu-wrapper  .menu-item {
    /*布局居中*/
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }
  .goods > .menu-wrapper  .menu-item.current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background: #fff;
    font-weight: 700;
  }
  /*.goods > .menu-wrapper  .menu-item.current > text {
    color: cornflowerblue;
  }*/
  .goods > .menu-wrapper  .menu-item > .text {
    display: table-cell;
    width: 56px;
    font-size: 12px;
    vertical-align: middle;
    

  }
  .goods > .foods-wrapper{
    flex: 1;
  }
  .goods > .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
  }
  .goods > .foods-wrapper .food-item{
    display: flex;
    /*上下margin会重合*/
    margin: 18px;
    padding-bottom: 18px;
  }
  .goods > .foods-wrapper .food-item:last-child{
    margin-bottom: 0;
  }
  .goods > .foods-wrapper .food-item > .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .goods > .foods-wrapper .food-item > .content{
    flex: 1;
    position: relative;
  }
  .goods > .foods-wrapper .food-item > .content > .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .goods > .foods-wrapper .food-item > .content > .desc{
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .goods > .foods-wrapper .food-item > .content > .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
    
  }
  .goods > .foods-wrapper .food-item > .content > .extra > .count{
    margin-right: 12px;
  }
  .goods > .foods-wrapper .food-item > .content > .price{
    font-weight: 700;
    line-height: 24px;
    display: inline-block;
  }
  .goods > .foods-wrapper .food-item > .content > .price > .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .goods > .foods-wrapper .food-item > .content > .price > .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .goods > .foods-wrapper .food-item > .content > .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: -1px;
  }
  
</style>
