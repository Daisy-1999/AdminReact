import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from './images/logo.png';
import './login.less';

const Item = Form.Item;

export class Login extends Component {

  
  handleSubmit(values){
   
    
  }
    render() {
        return (
            <div className="login">
                <div className="login_header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </div>
                <div className="login_content">
                    <h1>用户登录</h1>
                    <Form  
                      onFinish={this.handleSubmit}
                      name="normal_login"
                      className="login-form"
                      initialValues={{ remember: true }}>
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

