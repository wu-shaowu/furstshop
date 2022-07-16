import {addCars,getUsersCars,updataCars} from '../api/index'
const state ={
    usersCars:[],
};
const actions ={
            //在进行查找出用户的购物车
            async getCars({commit}){
                const data ={usersId:localStorage.getItem('TOKEN')}||{};
                const result = await getUsersCars(data);
                commit('GETCARS',result.data.data)
            },
            async updataCars({commit},data){
                const result = await updataCars(data);
                commit('UPDATACARS',result.data.data)
            },
            
};
const mutations ={
    GETCARS(context,value){
        state.usersCars = value.filter(item=>item.isTrade==false);
        // state.usersCars = value;
    },
    UPDATACARS(context,value){
        state.usersCars = value;
    }
};
const getters = {};
export default{
    state,
    actions,
    mutations,
    getters,
}