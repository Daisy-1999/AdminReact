import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqLogin } from '../../api/index.js'

import logo from '../../assets/images/logo.png';
import './login.less';

const Item = Form.Item;
export class Login extends Component {

  formRef = React.createRef();

  onFinish = values => {
      this.formRef.current.validateFields().then(async values => {
        reqLogin()
        // Do something with value
        const result = await reqLogin(values.username, values.password)
        //console.log(result)
        
        if(result.status === 0){
            const user = result.data
           // localStorage.setItem('user_key', JSON.stringify(user))
           storageUtils.saveUser(user) //保存在本地中
            memoryUtils.user = user //保存在文件中
            this.props.history.replace('/')
            message.success('登陆成功')
          } else{
              message.error(result.msg)
          }
        })
      }

    render() {
      const user = memoryUtils.user
        if(user._id){
           // this.props.history.replace('/login') 用于事件回调函数
           return <Redirect to='/' />
        }
      
        return (
            <div className="login">
                <div className="login_header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </div>
                <div className="login_content">
                    <h1>用户登录</h1>
                   <Form ref={this.formRef}
                     name="normal_login"
                     className="login-form"
                     initialValues={{ remember: true }}
                     onFinish={this.onFinish}>
                      <Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' },
                                {min: 4,message: '用户名不能小于4位'},
                                {max: 12, message: '用户名不能大于12'},]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,0.25)'}}/>} placeholder="username" />
                      </Item>
                      <Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' },
                                {min: 4, message: '用户名不能小于4位'},
                                {max: 12, message: '用户名不能大于12'},
                                ]}>
                        <Input
                          prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,0.25)'}} />}
                          type="password"
                          placeholder="password"/>
                      </Item>

                      <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          登录
                        </Button>
                       
                      </Item>
                    </Form>
                </div>
            </div>
        )
    }
}


export default Login

