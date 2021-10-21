<template>
  <div class="coin">
    <router-link to="/">&#5130; All Coins</router-link>
    <div class="header" v-if="coin.id">
      <img :src="coin.image" :alt="`${coin.name} logo`" />
      <div>{{ coin.name }}</div>
    </div>
    <div class="info" v-if="coin.id">
      <div>${{ coin.current_price.toLocaleString() }}</div>
      <div>
        <span>Market Cap: </span>${{ coin.market_cap.toLocaleString() }}
      </div>
      <div>
        <span>24 Hour high: $</span>{{ coin.high_24h.toLocaleString() }}
      </div>
      <div><span>24 Hour low: $</span>{{ coin.low_24h.toLocaleString() }}</div>
    </div>
    <div class="main">
      <div class="chart"></div>
      <div class="other"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Coin } from '@/store/coin/coin.type';
import {
  onMounted,
  defineComponent,
  computed,
  ref,
  watchEffect,
  reactive,
  Ref,
  watch
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const loading = ref(true);
    const route = useRoute();
    const coin = reactive({}) as Coin;
    const id = ref(route.params.id);

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId;
        const storeCoin = store.getters.getCoinById(newId);
        if (storeCoin) {
          Object.assign(coin, storeCoin);
        } else {
          fetchList();
        }
      }
    );

    const fetchList = () => {
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10'
      )
        .then((res) => {
          return res.json();
        })
        .then((data: Coin[]) => {
          store.commit('setCoinList', data);
          console.log(data);
          console.log(id.value);

          console.log(data.find((c) => c.id === id.value));
          Object.assign(coin, { ...data.find((c) => c.id === id.value) });
        });
    };

    watch(
      () => coin.id,
      () => {
        console.log(coin);
      }
    );

    const refreshList = () => {
      fetchList();
    };

    onMounted(() => {
      fetchList();
    });
    return { coin, loading, refreshList };
  }
});
</script>

<style scoped lang="stylus">
.header
  display flex
  justify-content space-between
  padding 20px 20px 10px 20px
  align-items center
  &-title
    font-size 30px
  &-refresh
    box-shadow inset 0px 1px 0px 0px #ffffff;
    background-color transparent;
    border-radius 5px;
    border 1px solid #000000;
    display inline-block;
    cursor pointer;
    color #5e5e5e;
    font-family Arial;
    font-size 16px;
    font-weight bold;
    padding 6px 24px;
    text-decoration none;
    text-shadow 0px 1px 0px #ffffff;
</style>
