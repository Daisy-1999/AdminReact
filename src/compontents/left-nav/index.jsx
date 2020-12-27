import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, BarsOutlined, ToolOutlined, UserOutlined, 
    SafetyCertificateOutlined, AreaChartOutlined, BarChartOutlined, LineChartOutlined, PieChartOutlined} from '@ant-design/icons';


   

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

const iconEnum = {
  home: <HomeOutlined />,
  appstore: <AppstoreOutlined />,
  bars: <BarsOutlined /> ,
  tool:<ToolOutlined />,
  user:<UserOutlined />,
  safety:<SafetyCertificateOutlined />,
  areaChart:<AreaChartOutlined />,
  barChart:<BarChartOutlined />,
  lineChart:<LineChartOutlined />,
  pieChart:<PieChartOutlined />,

};
const { SubMenu } = Menu;


export class leftNav extends Component {

    //根据指定的Menu数据数组生成<Menu.Item> <SubMenu>
     getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={ item.key } icon={ iconEnum[item.icon] }>
                        <Link to={ item.key }> { item.title } </Link>
                    </Menu.Item>
                )
            } else{
                //判断当前的item的key是否是我需要的openkey
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                     this.openKey = item.key
                }
                return (

                    <SubMenu key={ item.key } icon={ iconEnum[item.icon] } title={ item.title }>

                        { this.getMenuNodes(item.children) }

                    </SubMenu>
                )
            }
           
        })
    }

    //第一次render()之后执行一次
    //执行异步任务：发ajax请求,启动定时器
    componentDidMount(){

    }
    //第一次执行render() 之前执行一次
   // 为第一次render（）做一些同步的准备工作
    componentWillMount(){
         this.menuNods = this.getMenuNodes(menuList)
    }

    render() {
        //const menuNods = this.getMenuNodes(menuList)
        //得到当前请求的路由路径
        const selectKey = this.props.location.pathname
        return (
            
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={ logo } alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                  defaultOpenKeys={[ this.openKey ]}
                  selectedKeys={[ selectKey ]}
                  mode="inline"
                  theme="dark">
                    {/* 首页
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    {/* 商品 */}
                    {/* <SubMenu key="sub1" icon={<QrcodeOutlined />} title="商品">
                        <Menu.Item key="./category"> 
                            <Link to="/category">品类管理</Link>
                        </Menu.Item>
                        <Menu.Item key="./product">
                            <Link to="./product">商品管理</Link>
                        </Menu.Item>
                    
                    </SubMenu>  */}

                   { this.menuNods }
                </Menu>
            </div>
        )
    }
}

//向外暴露 使用withRouter() 来包装非路由组件
//新组件像LeftNav传递三个属性，history/location/match
//结果：LeftNav可以操纵路由相关语法了
export default withRouter(leftNav)
