import React from 'react'
import './index.less'

// {...props}：将接受的所有书信
// children标签属性：
//  字符串： <LinkButton>xxxx<LinkButton>
//   标签对象：<LinkButton><span></span><LinkButton>
//  标签对象的数组对象：<LinkButton><span></span><span></span><LinkButton>
//
export default function LinkButton(props) {
    return <button className="link-button" {...props} />
}
