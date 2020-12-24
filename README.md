## 跨域
   "proxy": "...."

## async和await的理解和使用
    1），理解
        简化promise对象的使用：不再使用.then()来指定回调函数
        能同步编码方式实现异步流程
    2）.使用
        那里使用await? 在返回promise对象的表达式左侧：左侧得到的不再是promise，而是promise的异步成功的值
        那里使用async? await所在最近函数定义的左侧
## 实现登录（包含自动登录）
    login.jsx
    1)，调用登录的接口请求
    2），如果失败，显示错误提示信息
    3），成功：
        保存user到local内存中
        跳转到admin
    4），如果内存中user有值，自动跳转到admin

    admin.jsx
        判断如果内存没有user(_id没有值)，自动跳转到login
    storageUtils.js
        包含使用localStorage来保存user相关操作的工具模块
        使用第三方库store 
            简化编码
            兼容不同浏览器
    memoryUtils.js
        用来在内存中保存数据（user）的工具类