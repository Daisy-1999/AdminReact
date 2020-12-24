/*
    操作local数据的工具函数
*/
import store from 'store'
const USER_KEY = 'user_key'
export default {
    saveUser(user) {
        //localStorage.setItem('USER_KEY', JSON.stringify(user))
        store.set(USER_KEY, user)
    },
    getUser() {
        //return JSON.parse(localStorage.getItem('USER_KEY') || '{}')
        return store.get(USER_KEY) || {}
    },
    removeUser() {
        //localStorage.removeItem('USER_KEY')
        store.remove(USER_KEY)
    },
}