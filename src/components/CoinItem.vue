<template>
  <div class="coin">
    <router-link class="router-link" :to="`/coin/${coin.id}`">
      <div class="coin-card">
        <div class="coin-card__left">
          <div class="coin-card__left__decor"></div>
          <img :src="coin.image" :alt="`${coin.name} logo`" />
          <div>
            <div class="coin-card__left__name">
              {{ coin.name }}
            </div>
            <div class="coin-card__left__symbol">({{ coin.symbol }})</div>
          </div>
        </div>
        <div class="coin-card__right">
          <div class="coin-card__right__price">
            ${{ coin.current_price.toLocaleString() }}
          </div>
          <div class="coin-card__right__cap">
            ${{ coin.market_cap.toLocaleString() }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Coin } from '@/store/coin/coin.type';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    coin: {
      type: Object as PropType<Coin>,
      required: true
    }
  }
});
</script>

<style scoped lang="stylus">
.coin
  height 60px
  &-card
    border 1px solid black
    border-radius 5px
    display flex
    align-items center
    height 100%
    justify-content space-between
    &__left
      display flex
      align-items center
      height 100%
      &__decor
        width 5px
        height 100%
        background-color black
      img
        width 30px
        margin 0 10px
      &__name
        font-size 22px
      &__symbol
        font-size 15px
    &__right
      margin-right 10px
      &__price
        font-size 25px
        margin-bottom 3px
        text-align right
      &__cap
        text-align right
        text-weight 500
.router-link
  text-decoration none
  color black
</style>
