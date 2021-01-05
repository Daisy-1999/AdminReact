import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Card, Form, Input, Select, Button } from 'antd'
import { ArrowLeftOutlined  } from '@ant-design/icons'

import { reqCategorys } from '../../api/index'
import LinkButton from '../../compontents/link-button'
import memoryUtils from '../../utils/memoryUtils';

const Item = Form.Item
const Option = Select.Option
//Product的添加和更新的子路由组件
export default class ProductAddUpdate extends Component {
    formRef = React.createRef();
    state = {
        categorys: []
    }
    getCategorys = async () => {
        const result = await reqCategorys()
        if(result.status === 0){
            const categorys = result.data
            this.setState({ categorys })
        }
    }
    //对价格进行自定义验证
    validatePrice = (rule, value, callback) => {
        if(value === ''){
            callback('必须输入商品价格')
        } else if(value * 1 <= 0){
            callback('价格必须大于0')
        } else{
            callback()
        }
    }
    //处理提交的回调
    onFinish = (values) => {
      this.formRef.current.validateFields().then(async values => {
        const { name, desc, price, categoryId } = values
        console.log(name, desc, price, categoryId)
      })
    }
    //!!3 =>true !!undefined => false !!XX将其转换为对应的bool值
    componentWillMount(){
      this.product = memoryUtils.product 
      this.isUpdate = !!this.product._id
    }
    componentDidMount(){
        this.getCategorys()
    }
    render() {
        const { categorys } = this.state
        const { isUpdate, product } = this
        
        //console.log(product)
        //指定了form中所有的item布局
        const formLayout = {
          labelCol: { span: 3 },
          wrapperCol: { span: 8 },
        };
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined  />
                </LinkButton>
                <span>{isUpdate ? '修改' : '添加'}商品</span>
            </span>
        )
        return (
            <Card title={title}>
               <Form 
                    initialValues={{ name: product.name, desc: product.desc, price: product.price, categoryId: product.categoryId}}
                    ref={this.formRef}
                    {...formLayout}
                    onFinish={this.onFinish}> 
                    <Item name="name" label="商品名称" rules={[{ required: true, message: '必须输入商品名称' }]}>
                      <Input placeholder="商品名称" />
                    </Item>
                    <Item name="desc" label="商品描述" rules={[{ required: true, message: '必须输入商品描述' }]}>
                      <Input placeholder="商品描述" />
                    </Item>
                    <Item name="price" label="商品价格" rules={[{  required: true , validator: this.validatePrice }]}>
                      <Input type="number" placeholder="商品价格" addonAfter="元" />
                    </Item>
                    <Item name="categoryId" label="商品分类" rules={[{ required: true, message: '必须输入商品分类' }]}>
                      <Select  placeholder="Select a Category">
                          {
                              categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                          }
                      </Select>
                    </Item>
                    <Item label="商品图片">
                      <div>商品图片组件</div>
                    </Item>
                    <Item label="商品详情">
                      <div>商品详情组件</div>
                    </Item>
                    <Item>
                      <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
               </Form>
            </Card>
        )
    }
}
