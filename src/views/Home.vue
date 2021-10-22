<template>
  <div class="home">
    <div class="header">
      <div class="header-title">Latest Coin info</div>
      <a href="#" @click="refreshList()" class="header-refresh">Refresh</a>
    </div>
    <div>
      <CoinList class="coin-list" :coinList="coinList" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import CoinList from '@/components/CoinList.vue';

export default defineComponent({
  components: {
    CoinList
  },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const coinList = computed(() => store.state.coin.coinList);

    const refreshList = () => {
      store.commit('clearStore');
      fetchList();
    };

    const fetchList = () => {
      loading.value = true;
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10'
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          store.commit('setCoinList', data);
        })
        .then(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchList();
    });
    return { loading, coinList, refreshList };
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
    font-size 1.875rem
  &-refresh
    box-shadow inset 0px 1px 0px 0px #ffffff
    background-color transparent
    border-radius 5px
    border 1px solid #000000
    display inline-block
    cursor pointer
    color #5e5e5e
    font-family Arial
    font-size 1rem
    font-weight bold
    padding 6px 24px
    text-decoration none
    text-shadow 0px 1px 0px #ffffff
.coin-list
  padding 10px 20px
@media screen and (max-width: 440px)
  .header
    padding 10px 10px 5px 10px
    &-title
      font-size 1.5rem
    &-refresh
      padding 6px 12px
  .coin-list
    padding 10px
</style>
