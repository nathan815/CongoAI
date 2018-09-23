import productApi from '../../api/product';

const state = {

};

const actions = {
  async create(data) {
    commit('clearErrors');
    try {
      const response = await productApi.create(data);
      if(response.code === 201) {
        commit('createSuccess');
      }
    } catch(err) {
      commit('setError', err.response.data.message);
    }
  }
};

const mutations = {

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
