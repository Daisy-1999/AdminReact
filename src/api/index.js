//包含应用中所有的请求接口的函数：接口请求函数
import ajax from './ajax';

//const BASE = 'http://120.55.193.14:5000'
const BASE = ''

//请求登录
export function reqLogin(username, password){
    return ajax({
        method: 'post',
        url: BASE + '/login',
        data: {
            username,
            password
        }
    })

}

const name = 'admin'
const pwd = 'admi3'
reqLogin(name, pwd).then(result => {
    //const result = response.data
    console.log('请求成功了', result)
}, error => {
    console.log('请求失败了', error)
})