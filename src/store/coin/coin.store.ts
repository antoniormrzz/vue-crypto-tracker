import { Coin, CoinHistory } from './coin.type';

type stateType = {
  coinList: Coin[];
  coinHistoryCache: any;
};

const state = {
  coinList: [],
  coinHistoryCache: {}
};

const getters = {
  getCoinById: (state: stateType) => (id: string) => {
    return state.coinList.find((coin: Coin) => coin.id === id);
  },
  getCoinHistoryById: (state: stateType) => (id: string) => {
    return state.coinHistoryCache[id];
  }
};

const mutations = {
  setCoinList: (state: stateType, newCoinList: Coin[]) => {
    state.coinList = [...newCoinList];
  },
  setCoinHistoryCache: (state: stateType, coinHistory: CoinHistory) => {
    const stateClone = { ...state.coinHistoryCache };
    stateClone[coinHistory.id] = coinHistory.prices;
    state.coinHistoryCache = { ...stateClone };
  },
  clearStore: (state: stateType) => {
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
