import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd';

import LinkButton from '../../compontents/link-button'
import { PlusOutlined  } from '@ant-design/icons';

import { reqProduct, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/Constant'

//Product的默认子路由组件

const Option = Select.Option
export class ProductHome extends Component {
    state = {
        products: [],   //商品列表
        loading: false,
        total: 0, //商品总数量
        searchType: 'productName', //默认是按商品名称搜索
        searchName: '', //搜索关键字
    }
    updateStatus = async (productId, status) => {
        status = status === 1 ? 2 : 1
        const result = await reqUpdateStatus(productId, status)
        if(result.status === 0){
            message.success('更新商品状态成功')
            //获取当前页显示
            this.getProducts(this.pageNum)
        }

    }
    initColumn = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                width: 100,
                //dataIndex: 'status',
                render: ({_id, status}) => {
                    let btnText = '下架'
                    let text = '在售'
                    if(status===2){
                        btnText = '上架'
                        text = "已下架"
                    }
                    return (
                        <span>
                            <Button type="primary" onClick={() => {this.updateStatus(_id, status)}}>{btnText}</Button><br/>
                            <span>{text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail')}>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ]
    }
    //异步获取指定页码商品列表显示
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const { searchType, searchName } = this.state
        let result
        if(!searchName){
            result = await reqProduct(pageNum, PAGE_SIZE)
        } else{
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType)
        }
       
        if(result.status === 0){
            const { total, list } = result.data 
            this.setState({
                products: list,
                total: total
            })
        }
    // console.log(result)
    }
    componentWillMount(){   //在第一次render之前调用
        this.initColumn()
    }
    componentDidMount(){ //在第一次render之后调用
        //获取第一页显示
        this.getProducts(1)
    }
    render() {
        const { loading, products, total, searchName, searchType } = this.state
        const title = (
            <span>
                <Select 
                    style={{width: 200}} 
                    value={searchType} 
                    onChange={(value) => this.setState({searchType: value})}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input 
                    style={ {width: 200, margin: '0 10px'}} 
                    placeholder="关键字" 
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary">
               <PlusOutlined />
                添加商品
            </Button>
        )
        return (
           <Card title={title} extra={extra}>
               <Table
                   bordered   
                   rowKey="_id"
                   loading={loading}
                   columns={this.columns}
                   dataSource={products}     
                   pagination={{
                        total,  
                        defaultPageSize: PAGE_SIZE, 
                        showQuickJumper: true, 
                        onChange: this.getProducts,
                        current: this.pageNum
                    }}     
               />
           </Card>
        )
    }
}

export default ProductHome
