import storageUtils from "./storageUtils";

export default {
    user: storageUtils.getUser(),    //用来存储登录用户信息，初始值为local中读取的user
    product: {}, //需要查看的商品对象

}