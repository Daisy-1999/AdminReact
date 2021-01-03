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

## 抽取通用的类链接按钮组件
    通过...透传所有接收的属性: <Button {...props} />    <LinkButton>xxxx</LinkButton>
    组件标签的所有子节点都会成为组件的children属性

## 使用react-router
    withRouter(): 包装非路由组件, 给其传入history/location/match属性
    history: push()/replace()/goBack()
    location: pathname属性
    match: params属性
## componentWillMount与componentDidMount的比较
    componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
    componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render

## 区别call()/apply()/bind()
## 自定义实现bind()

    Function.prototype.bind = function(obj){
        //arguments：调用bind函数时传递的实参伪数组
        const self = this
        return function(){
            self.apply(obj, arguments)
        }
    }

    函数对象：将一个函数作为对象使用
    实例对象：new函数调用产生的对象，简称对象
    function fn(a, b){
        console.log(a, b, this.m)
    }

    const obj = {m: 1}

    fn.call(obj, 2, 3, 4) //调用fn这个函数  //2 3 1
    fn.apply(obj, [2, 3, 4]) //必须传入数组 //2 3 1  
    与call的区别就是传参的区别

    //const fn2 = fn.bind(obj)
    fn.bind(obj)(2,3) 2 3 1
    fn.bind(obj, 5)(2, 3) 5 2 1
    fn.bind(obj, 5, 6)(2, 3) 5 6 1
## 自定义实现一组数组声明式方法
    1)，map() //返回一个新数组
    2)，reduce()    //返回一个数值
    3)，filter() //返回一个数组
    4)，find()  //返回一个数值
    5)，findIndex() //查找元素下标
    6)，every() //测试一个数组内的所有元素是否都能通过某个指定函数的测试，返回一个布尔值
    7)，some() //测试有没有满足这个条件的

   
    const arr = [1, 3, 5, 7, 9] 
## 1.map()
    var arr2 = arr.map((item, index) => {

    })
    Array.prototype.map = function(callback){
        const arr = []
        for(let index = 0; index < this.length; index++){
            arr.push(callback(this[index], index))
        }
        return arr
    }
## 2.reduce()
    //per：上一次统计结果
    arr.reduce((per, item, index) => {

    }, 0)

    Array.prototype.reduce = function(callback, initValue){
        const total = initValue
        for(let index = 0; index < this.length; index++){
            total = callback(total, this[index], index)
        }
        return total
    }
## 3.filter()
    arr2 = arr.filter((item, index) => 判断表达式 true就留下item false就要)
    Arrar.prototype.filter = function(callback){
        const arr = []
        for(let index = 0; index < this.length; index++){
            if(callback(this[index], index)){
                arr.push(this[index])
            }
        }
        return arr
    }
## 4.find()
    result = arr.find((item, index) => 判断表达式 查找到都一个满足的数)
    Array.prototype.find = function(callback){
        let item
        for(let index = 0; index < this.length; index++){
            if(callback(this[index], index)){
                item = this[index]
                return item
            }
        }
        
    }
## 5.findIndex()
    result = arr.findIndex((item, index) => 判断表达式 查找到都一个满足的数)
    Array.prototype.find = function(callback){
        for(let index = 0; index < this.length; index++){
            if(callback(this[index], index)){
                return index
            }
        }
    return -1 //没有找到
    }
## 6.every() 
    result = arr.every((item, index) => item>3) //数组里是不是每一个函数都>3  result = false
    Array.prototype.every = function(callback){
        for(let index = 0; index < this.length; index++){
            if(!callback(this[index], index)){
                return false
            }
        }
    return true
    }
## 7.some()

    result = arr.some((item, index) => item>3) //数组里是否有一个item>3 result = true
    Array.prototype.some = function(callback){
        for(let index = 0; index < this.length; index++){
            if(callback(this[index], index)){
                return true
            }
        }
    return fasle
    }

