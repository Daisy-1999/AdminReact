import React, { Component } from 'react'
import { Card, List } from 'antd'
import LinkButton from '../../compontents/link-button'
import { ArrowLeftOutlined  } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
import { BASE_IMG } from '../../utils/Constant'
import { reqCategory } from '../../api';

const Item = List.Item

//商品详情路由组件
export default class ProductDetail extends Component {

    state = {
        categoryName: ''
    }
    getCategory = async (categoryId) => {
        const result =  reqCategory(categoryId)
        if(result.status === 0){
            const categoryName = result.data.name
            this.setState({
                categoryName
            })
        }
    }
    componentDidMount(){
        const product = memoryUtils.product
        if(product._id){
            this.getCategory(product._id)
        }
       
        
        
    }
    render() {
        const { categoryName } = this.state
        const product = memoryUtils.product
        //console.log(product)
        //他的目的是为了确保是点击了查看详情，通过路由查看会重定向为/product
        if(!product || !product._id){
            return <Redirect to="/product" />
        }
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
                        <div>
                            <span className="detail-left">商品名称：</span>
                            <span>{product.name}</span>
                        </div>
                        
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-left">商品描述：</span>
                            <span>{product.desc}</span>
                        </div>
                        
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-left">商品价格：</span>
                            <span>{product.price}元</span>
                        </div>
                        
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-left">所属分类：</span>
                            <span>{categoryName}</span>
                        </div>
                        
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-left">商品图片：</span>
                            <span>
                                {
                                    product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="" />)
                                }  
                            </span>
                        </div>
                        
                    </Item>
                    <Item>
                        <div>
                            <span className="detail-left">商品详情：</span>
                            <span dangerouslySetInnerHTML={{__html: product.detail}}></span>
                        </div>
                        
                    </Item>
                </List>
            </Card>
        )
    }
}
