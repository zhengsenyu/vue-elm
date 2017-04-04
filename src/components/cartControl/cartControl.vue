<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
      -
    </div><!-- cart-decrease end-->
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add"  @click="addCart">
      +
    </div><!-- cart-add end-->
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
</script>

<style>
  .cartcontrol{
    font-size: 0;
  } 
  .cartcontrol .cart-decrease{
    display: inline-block;
    width: 24px;
    font-size: 24px;
    line-height: 24px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
  }
  .cartcontrol .cart-count{
    display: inline-block;
    margin: 0 10px;
    vertical-align: top;
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: 16px;
    color: blue;
  }
  .cartcontrol .cart-add{
    display: inline-block;
    width: 24px;
    font-size: 24px;
    line-height: 24px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
  }
</style>
