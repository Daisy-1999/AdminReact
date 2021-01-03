import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

const Item = Form.Item;
//添加分类的Form组件
 class AddUpdateForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }
    componentWillMount(){
        this.props.setForm(this.formRef)
    }
    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    }

    render() {
        const { categoryName } = this.props 
        return (
            <div>
                <Form ref={this.formRef} >
                    <Item
                      initialValue={categoryName || ''}
                      name="categoryName"
                      rules={[{ required: true, message: '分类名称必须输入' },
                             ]}>
                      <Input type="text" placeholder="请输入分类名称" />
                    </Item>
                </Form>
            </div>
        )
    }
}
export default AddUpdateForm
