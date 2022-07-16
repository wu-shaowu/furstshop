import requests from "./request";
import axios from 'axios'
export const login = (data) =>axios({url:'http://localhost:8080/users/login',method:'post',data});
export const getGoodInfo = ()=>axios({url:'http://localhost:8080/goods/getGoodInfo',method:'get'});
export const getGoodDetail =(data)=>axios({url:'http://localhost:8080/goods/getGoodDetail',method:'post',data});
export const addCars =(data)=>axios({url:'http://localhost:8080/cars/addcars',method:'post',data});
export const checkId =(data)=>axios({url:'http://localhost:8080/users/checkId',method:'post',data});
export const updataCars =(data)=>axios({url:'http://localhost:8080/cars/updataCars',method:'post',data});
export const getUsersCars = (data)=>axios({url:'http://localhost:8080/cars/getUsersCars',method:'post',data});
export const deleteCars = (data)=>axios({url:'http://localhost:8080/cars/deleteCars',method:'post',data});
export const addTrade = (data) =>axios({url:'http://localhost:8080/trade/addTrade',method:'post',data});
export const getTrade = (data) =>axios({url:'http://localhost:8080/trade/getTrade',method:'post',data});
export const keepTradeInfo =(data) =>axios({url:'http://localhost:8080/trade/keepTradeInfo',method:'post',data});
export const deleteAllCars =(data) =>axios({url:'http://localhost:8080/cars/deleteAllCars',method:'post',data});
export const recharge = (data) =>axios({url:'http://localhost:8080/users/recharge',method:'post',data});
export const getAllTrade = (data) =>axios({url:'http://localhost:8080/trade/getAllTrade',method:'post',data});
export const searchGoods = (data) =>axios({url:'http://localhost:8080/goods/search',method:'post',data});
export const changeAddress = (data) =>axios({url:'http://localhost:8080/users/changeAddress',method:'post',data});
