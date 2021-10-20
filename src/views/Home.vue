<template>
  <div class="home">
    <div>Latest Coin info</div>
    <hr />
    <div>
      <CoinList />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, watch, defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import CoinList from "@/components/CoinList.vue";
import CoinItem from "@/components/CoinItem.vue";

export default defineComponent({
  components: {
    CoinList,
  },
  setup() {
    const store = useStore();
    const error = ref("");
    const loading = ref(true);
    const coinList = computed(() => store.state.coinList);
    onMounted(() => {
      error.value = "";
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10"
      )
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            throw error;
          }

          return res.json();
        })
        .then((data) => {
          store.commit("setCoinList", data);
        })
        .catch((err) => {
          error.value = err;
        })
        .finally(() => {
          loading.value = false;
        });
    });
    return { error, loading, coinList };
  },
});
</script>

<style scoped lang="stylus"></style>
