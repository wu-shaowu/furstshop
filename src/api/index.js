import requests from "./request";
import axios from 'axios'
export const login = (data) =>axios({url:'http://localhost:3000/users/login',method:'post',data});
export const getGoodInfo = ()=>axios({url:'http://localhost:3000/goods/getGoodInfo1',method:'get'});
export const getGoodDetail =(data)=>axios({url:'http://localhost:3000/goods/getGoodDetail',method:'post',data});
export const addCars =(data)=>axios({url:'http://localhost:3000/cars/addcars',method:'post',data});
export const checkId =(data)=>axios({url:'http://localhost:3000/users/checkId',method:'post',data});
export const updataCars =(data)=>axios({url:'http://localhost:3000/cars/updataCars',method:'post',data});
export const getUsersCars = (data)=>axios({url:'http://localhost:3000/cars/getUsersCars',method:'post',data});
export const deleteCars = (data)=>axios({url:'http://localhost:3000/cars/deleteCars',method:'post',data});
export const addTrade = (data) =>axios({url:'http://localhost:3000/trade/addTrade',method:'post',data});
export const getTrade = (data) =>axios({url:'http://localhost:3000/trade/getTrade',method:'post',data});
export const keepTradeInfo =(data) =>axios({url:'http://localhost:3000/trade/keepTradeInfo',method:'post',data});
export const deleteAllCars =(data) =>axios({url:'http://localhost:3000/cars/deleteAllCars',method:'post',data});
export const recharge = (data) =>axios({url:'http://localhost:3000/users/recharge',method:'post',data});
export const getAllTrade = (data) =>axios({url:'http://localhost:3000/trade/getAllTrade',method:'post',data});
export const searchGoods = (data) =>axios({url:'http://localhost:3000/goods/search',method:'post',data});
export const changeAddress = (data) =>axios({url:'http://localhost:3000/users/changeAddress',method:'post',data});
export const addGoods =(data)=>axios({url:'http://localhost:3000/goods/addGoods',method:'post',data})
export const saveImage =(data)=>axios({url:'http://localhost:3000/goods/saveImage',method:'post',data})
export const deleteGoods =(data)=>axios({url:'http://localhost:3000/goods/deleteGoods',method:'post',data})
export const getAdminTrade = (data) =>axios({url:'http://localhost:3000/trade/getAdminTrade',method:'post',data});
export const editGoods = (data) =>axios({url:'http://localhost:3000/goods/editGoods',method:'post',data});
