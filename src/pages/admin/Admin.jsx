import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils'

export class Admin extends Component {
    render() {
        
        const user = memoryUtils.user
        if(!user._id){
           // this.props.history.replace('/login') 用于事件回调函数
           return <Redirect to='/login' />
        }

        return (
            <div>
               hello  {user.username}
            </div>
        )
    }
}

export default Admin
