<template>
  <div class="coin-list">
    <CoinItem
      class="coin-list__item"
      v-for="item in coinList"
      :key="item.id"
      :coin="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CoinItem from '@/components/CoinItem.vue';

export default defineComponent({
  props: ['coinList'],
  components: {
    CoinItem
  }
});
</script>

<style scoped lang="stylus">
.coin-list
  &__item
    margin 10px 20px
</style>
