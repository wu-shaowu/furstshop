import {
    login,
    checkId,
    recharge
} from '../api/index'
const state = {
    usersInfo: {}
};
const actions = {
    async login({
        commit
    }, data) {
        const result = await login(data)
        console.log(result)
        if (result.data.status == 1) {
            localStorage.setItem('TOKEN',result.data.data._id);
            localStorage.setItem('token',result.data.token);
            if(result.data.data.admin){
                return false
            }else{
                return true
            }
            commit('LOGIN', result.data);

        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async checkId({
        commit
    }, data) {
        const result = await checkId(data)
        if (result.data.status == 1) {
            commit('CHECKID', result.data);

        }
    },
    async recharge({commit},data){
        const result = await recharge(data);
        if (result.data.status == 1) {
            commit('RECHARGE', result.data);
        }
    }
};
const mutations = {
    LOGIN(context, value) {
        state.usersInfo = value.data;
    },
    CHECKID(context, value){
        state.usersInfo = value.data;
    },
    LOGOUT(context,value){
        state.usersInfo = {};
    },
    RECHARGE(context,value){
        state.usersInfo = value.data;
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
}