<template>
  <div class="coin">
    <router-link :to="`/coin/${coin.id}`">
      <div class="coin__card">
        <img :src="coin.image" :alt="`${coin.name} logo`" />
        {{ coin.id }} {{ coin.current_price.toLocaleString() }}
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
  &__card
    img
      width 30px
</style>
