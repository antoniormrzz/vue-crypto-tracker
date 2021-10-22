<template>
  <div class="coin">
    <router-link class="router-link" to="/">&#5130; All Coins</router-link>
    <div class="header card" v-if="coin.id">
      <img :src="coin.image" :alt="`${coin.name} logo`" />
      <div class="header__name">{{ coin.name }}</div>
    </div>
    <div class="info card" v-if="coin.id">
      <div class="info__price">${{ coin.current_price.toLocaleString() }}</div>
      <div class="info__cap">
        <span class="label">Market Cap: </span>${{
          coin.market_cap.toLocaleString()
        }}
      </div>
      <div class="info__24h">
        <span class="label">24 Hour high:</span> ${{
          coin.high_24h.toLocaleString()
        }}
      </div>
      <div class="info__24l">
        <span class="label">24 Hour low:</span> ${{
          coin.low_24h.toLocaleString()
        }}
      </div>
    </div>
    <div class="main card" v-if="coinHistory.length">
      <div class="chart" v-if="chartData">
        <line-chart :data="chartData"></line-chart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Coin } from '@/store/coin/coin.type';
import {
  defineComponent,
  ref,
  reactive,
  Ref,
  watch,
  onMounted,
  onUnmounted
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import moment from 'moment';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const coin = reactive({}) as Coin;
    const id = ref(route.params.id);
    const coinHistory: Ref<[number, number][]> = ref([]);
    let labels: string[] = [];
    const chartData = ref<any>();
    const width = ref(window.innerWidth);

    const fetchList = () => {
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10'
      )
        .then((res) => {
          return res.json();
        })
        .then((data: Coin[]) => {
          store.commit('setCoinList', data);
          Object.assign(coin, { ...data.find((c) => c.id === id.value) });
        });
    };

    onMounted(() => {
      id.value = route.params.id;
      const storeCoin = store.getters.getCoinById(id.value);
      if (storeCoin) {
        Object.assign(coin, storeCoin);
      } else {
        fetchList();
      }
    });

    watch(
      () => coin.id,
      () => {
        if (coin.id) {
          fetchHistory();
        }
      }
    );

    const fetchHistory = () => {
      const storeCoinHistory = store.getters.getCoinHistoryById(id.value);
      if (storeCoinHistory) {
        coinHistory.value = storeCoinHistory;
      } else {
        fetch(
          `https://api.coingecko.com/api/v3/coins/${id.value}/market_chart?vs_currency=usd&days=6&interval=daily`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            store.commit('setCoinHistoryCache', {
              id: id.value,
              prices: data.prices
            });
            coinHistory.value = data.prices;
          });
      }
    };

    watch(
      () => coinHistory.value,
      () => {
        if (coinHistory.value.length) {
          setLabels();
        }
      }
    );

    const setLabels = () => {
      const current = moment().subtract(2, 'days');
      const tempLabels = ['yesterday', 'today'];
      for (let index = 0; index < 5; index++) {
        tempLabels.unshift(current.format('ddd'));
        current.subtract(1, 'days');
      }
      labels = tempLabels;

      const tempGroupedData: any = {};
      labels.forEach((l, i) => {
        tempGroupedData[l] = coinHistory.value[i][1];
      });
      chartData.value = tempGroupedData;
    };

    // the chart component is apparently responsive, so this is not needed
    // I didn't remove it to demonstrate some responsivity code
    onMounted(() => {
      window.addEventListener('resize', onWindowSizeChanged);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onWindowSizeChanged);
    });

    const onWindowSizeChanged = () => {
      width.value = window.innerWidth;
    };

    return { coin, coinHistory, chartData, width };
  }
});
</script>

<style scoped lang="stylus">
.coin
  padding 10px 20px
  .router-link
    color black
    text-decoration none
    margin-left 5px
  .header
    display flex
    align-items center
    margin 10px 0 15px 0
    padding 10px 0
    img
      width 50px
      margin 0 10px
    &__name
      font-size 1.688rem
  .info
    margin-bottom 20px
    padding 10px
    &__price
      font-size 1.813rem
      margin-bottom 5px
    &__cap
    &__24h
    &__24l
      font-size 1.25rem
  .main
    padding 10px
  span.label
    font-size 1.125rem
    color #363636
    font-weight 300
@media screen and (max-width: 440px)
  .coin
    padding 10px 10px
    .header
      flex-direction column
      padding 20px
      img
        width 80px
    .info
      margin-bottom 20px
      padding 20px
      display flex
      flex-direction column
      align-items center
      &__price
        font-size 2.5rem
        margin-bottom 10px
      &__cap
      &__24h
      &__24l
        font-size 1.25rem
    .main
      padding 10px
    span.label
      font-size 1.125rem
      color #363636
      font-weight 300
</style>
