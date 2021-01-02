import React, { Component } from 'react';

import { Card, Button, Table, message, Modal} from 'antd';
import { reqCategorys, reqUpdadteCategory, reqAddCategory } from '../../api/index';

import LinkButton from '../../compontents/link-button';
import AddUpdateForm from './add-update-form'
import { PlusOutlined  } from '@ant-design/icons';
import './category.less'

export class Category extends Component {

    state = {
        categorys: [], //所有分类数组
        loading: false,
        showStatus: 0, //0：代表不显示,1：代表显示添加，2：显示修改
    }

    initColumns = () => {
         this.columns = [
          {
            title: '分类名称',
            dataIndex: 'name',
            //render: text => <a>{text}</a>,
          },
          {
            title: '操作',
            width: 400,
            render: () => <LinkButton onClick={ () => {
                this.setState({
                    showStatus: 2
                })
            }}>修改分类</LinkButton>
          },

        ];
    }
    getCategorys = async () => {
        this.setState({
            loading: true
        })
        const result = await reqCategorys()
        this.setState({
            loading: false
        })
        if(result.status === 0){
            const categorys = result.data 
            this.setState({
                categorys
            })
        } else{
            message.error('获取分类列表失败')
        }
    }
    handleOk = () => {

        this.form.current.validateFields().then(async values => {
        //发添加分类的请求
        const { categoryName } = values
        const result = await reqAddCategory(categoryName)   
        this.setState({
            showStatus: 0
        })
        if(result.status === 0){
            this.getCategorys() 
            message.success("添加分类成功")
          } else{
              message.error("添加分类失败")
          }
        })
        
       
    }
    handleCancel =() => {
        this.setState({
            showStatus: 0
        })
    }
    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getCategorys()
    }
    render() {
        //取出状态数据
        const { categorys, loading, showStatus } = this.state
        //Card右侧添加
        const extra = (
            <Button type="primary" onClick={() => { this.setState({showStatus: 1}) }}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card extra={extra}>
                <Table
                    bordered   
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={categorys}     
                    pagination={{ defaultPageSize: 7, showQuickJumper: true}}     
                />
                <Modal title={ showStatus === 1 ? "添加分类" : "修改分类"} visible={ showStatus!== 0} 
                        onOk={this.handleOk} 
                        onCancel={this.handleCancel}>
                {/* 将子组件传递过来的form对象保存到当前组件对象上 */}
                  <AddUpdateForm setForm={form => this.form = form}/>
                </Modal>
            </Card>
        )
    }
}

export default Category
