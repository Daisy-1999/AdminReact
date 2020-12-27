import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../compontents/left-nav';
import Header from '../../compontents/header';

import Home from '../home/Home';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import User from '../user/User';
import Bar from '../charts/Bar';
import Line from '../charts/Line';
import Pie from '../charts/Pie';
const { Footer, Sider, Content } = Layout;
export class Admin extends Component {
    render() {
        
        const user = memoryUtils.user
        if(!user._id){
           // this.props.history.replace('/login') 用于事件回调函数
           return <Redirect to='/login' />
        }

        return (
          <Layout style={{ height: '100%'}}>
            <Sider>
              <LeftNav />
            </Sider>
            <Layout>
              <Header />
              <Content style={{ background: 'white', margin: '20px'}}>
                <Switch>
                  <Route path="/home" component={ Home }/>
                  <Route path="/category" component={ Category } />
                  <Route path="/role" component={ Role }/>
                  <Route path="/user" component={ User }/>
                  <Route path="/product" component={ Product }/>
                  <Route path="/charts/bar" component={Bar}/>
                  <Route path="/charts/line" component={ Line }/>
                  <Route path="/charts/pie" component={Pie}/>
                  <Redirect to="/home" />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)'}}>
                推荐使用谷歌浏览器，可以获得更佳页面操作体验
              </Footer>
            </Layout>
          </Layout>
        )
    }
}

export default Admin
