import {
  getGoodInfo,
  getGoodDetail,
  searchGoods
} from '../api/index'
import axios from 'axios'
const state = {
  goodInfo: [],
  searchGoods: [],
  detailInfo: {},
  page: 0,
  total: 0,
};
const actions = {
  async getGoodInfo({commit}) {
    const result = await getGoodInfo();
    console.log(result.data);
    if (result.data.status == 1) {
      commit('GETGOODINFO', result.data.data);
    } else {
      alert('请求出错')
    }

  },
  async searchGoods({commit}, data) {
    const result = await searchGoods(data);
    if (result.data.status == 1) {
      commit('SEARCHGOODS', result.data.data)
    } else {
      alert("注册失败");
    }
  },

  async getGoodDetail({commit}, id) {
    const result = await getGoodDetail(id);
    commit('GETGOODDETAIL', result.data.data)
  }

};
const mutations = {
  GETGOODINFO(state, data) {
    console.log(data);
    state.searchGoods = data;
  },
  SEARCHGOODS(context, data) {
    state.searchGoods = data.goods;
    state.total = data.total;
    state.page = data.page;
  },
  GETGOODDETAIL(context, data) {
    state.detailInfo = data;
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
}