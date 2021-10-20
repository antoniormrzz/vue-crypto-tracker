<template>
  <div class="home">
    <div>
      <div>Latest Coin info</div>
      <button @click="refreshList()">refresh</button>
    </div>
    <hr />
    <div>
      <CoinList :coinList="coinList" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import CoinList from '@/components/CoinList.vue';

export default defineComponent({
  components: {
    CoinList
  },
  setup() {
    const store = useStore();
    const error = ref('');
    const loading = ref(true);
    const coinList = computed(() => store.state.coin.coinList);
    watchEffect(() => console.log(coinList.value));

    const refreshList = () => {
      fetchList();
    };

    const fetchList = () => {
      error.value = '';
      loading.value = true;
      store.commit('clearStore');
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10'
      )
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            throw error;
          }

          return res.json();
        })
        .then((data) => {
          store.commit('setCoinList', data);
        })
        .catch((err) => {
          error.value = err;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchList();
    });
    return { error, loading, coinList, refreshList };
  }
});
</script>

<style scoped lang="stylus"></style>
