import storageUtils from "./storageUtils";

export default {
    user: storageUtils.getUser(),    //用来存储登录用户信息，初始值为local中读取的user

}