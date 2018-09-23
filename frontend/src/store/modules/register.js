import authApi from '../../api/auth';

const state = {
    isLoading: false,
    error: null,
};

const actions = {
    async createAccount({ commit }, { email, password }) {
        commit('registerRequest');
        try {
            const response = await authApi.authenticate(email, password);
            if (response.status === 201) {
                commit('registerSuccess');
            }
            else {
                throw new Error(response ? response.data : null);
            }
        } catch (err) {
            let message = 'Sorry, something went wrong.';
            if (err.response) {
                message = err.response.data.message;
            }
            commit('registerError', message);
        }
    },
    clearError({ commit }) {
        commit('clearError');
    },
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
    },
    terregisRequest(state) {
        state.isLoading = true;
        state.error = null;
    },
    registerSuccess(state) {
        state.isLoading = false;
        state.isLoggedIn = true;
    },
    registerError(state, error) {
        state.isLoading = false;
        state.error = error;
    },
    clearError(state) {
        state.error = null;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
