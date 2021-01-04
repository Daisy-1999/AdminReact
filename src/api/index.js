//包含应用中所有的请求接口的函数：接口请求函数
import ajax from './ajax';

const BASE = 'http://120.55.193.14:5000'
//const BASE = ''

//请求登录
export const reqLogin = (username, password) => ( //使用{}没有return作用
    ajax({
        method: 'post',
        url: BASE + '/login',
        data: {
            username,
            password
        }
    })
)

//获取分类列表
export const reqCategorys = () => (
    ajax({
        method: 'get',
        url: BASE + '/manage/category/list'
    
    })
)
//添加分类
export const reqAddCategory = (categoryName) => (
    ajax({
        method: 'post',
        url: BASE + '/manage/category/add',
        data: {
            categoryName 
        }
    })
)
//修改分类
export const reqUpdadteCategory = (categoryId, categoryName) => (
    ajax({
        method: 'post',
        url: BASE + '/manage/category/update',
        data: {
            categoryId,
            categoryName
        }
    })
)

//获取商品分页列表
export const reqProduct = (pageNum, pageSize) => (
    ajax({
        method: 'get',
        url: BASE + '/manage/product/list',
        params: {
            pageNum,
            pageSize
        }
    })

)
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => (   //searchType的值是'productName'或者'productDesc'
    ajax({
        method: 'get',
        url: BASE + '/manage/product/search',
        params: {
            pageNum,
            pageSize,
            [searchType]: searchName //加上了[]直接读取他的属性值
        }
    })
)
export const reqUpdateStatus = (productId, status) => (
    ajax({
        method: 'post',
        url: BASE+ '/manage/product/updateStatus',
        data: {
            productId,
            status 
        }
    })

)
// export function reqLogin(username, password){
//     return ajax({
//         method: 'post',
//         url: BASE + '/login',
//         data: {
//             username,
//             password
//         }
//     })

// }

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name, pwd).then(result => {
//     //const result = response.data
//     console.log('请求成功了', result)
// }, error => {
//     console.log('出错了')
// })
