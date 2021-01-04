import React, { Component } from 'react'
import { Card, List } from 'antd'
import LinkButton from '../../compontents/link-button'
import { ArrowLeftOutlined  } from '@ant-design/icons';
const Item = List.Item

//商品详情路由组件
export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined  />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称：</span>
                        <span>aaa</span>
                    </Item>
                </List>
            </Card>
        )
    }
}
