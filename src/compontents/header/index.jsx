import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils';
import storageUtile from '../../utils/storageUtils';


import { Modal } from 'antd';
import './index.less'
import LinkButton from '../link-button';

export class Header extends Component {
    state = {
        currentTime: formateDate(Date.now())
    }

    logout = () => {
        Modal.confirm({
          title: '确认退出吗？',
          onOk:() => {
            storageUtile.removeUser()
            memoryUtils.user = {}
            this.props.history.replace('/login')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path){
                title = item.title
            } else if(item.children){
               const cItem = item.children.find(cItem => cItem.key === path)
                   if(cItem){
                       title = cItem.title
                   
               }
            }
        })
        return title
    }

    componentDidMount(){
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {
        const { currentTime } = this.state
        const user = memoryUtils.user
        const title = this.getTitle()

        return (
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username}  &nbsp;&nbsp;

                    {/* 组件的标签体作为标签的children属性传入 */}
                    <LinkButton  onClick={ this.logout }>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span> { currentTime }</span>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
