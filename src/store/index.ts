import { createStore } from 'vuex';
import coin from './coin/coin.store';

export default createStore({
  state: { coinList: [] },
  mutations: {},
  actions: {},
  modules: { coin }
});
