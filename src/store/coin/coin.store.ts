import { Coin, CoinHistory } from './coin.type';

type StateType = {
  coinList: Coin[];
  coinHistoryCache: any;
};

const state: () => StateType = () => ({
  coinList: [],
  coinHistoryCache: {}
});

const getters = {
  getCoinById: (state: StateType) => (id: string) => {
    return state.coinList.find((coin: Coin) => coin.id === id);
  },
  getCoinHistoryById: (state: StateType) => (id: string) => {
    return state.coinHistoryCache[id];
  }
};

const mutations = {
  setCoinList: (state: StateType, newCoinList: Coin[]) => {
    state.coinList = [...newCoinList];
  },
  setCoinHistoryCache: (state: StateType, coinHistory: CoinHistory) => {
    const stateClone = { ...state.coinHistoryCache };
    stateClone[coinHistory.id] = coinHistory.prices;
    state.coinHistoryCache = { ...stateClone };
  },
  clearStore: (state: StateType) => {
    state = {
      coinList: [],
      coinHistoryCache: {}
    };
  }
};

export default {
  state,
  getters,
  mutations
};
