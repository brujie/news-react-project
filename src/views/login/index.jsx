import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./index.css"
import { withRouter } from 'react-router-dom';


function Login(props) {
    const onFinish = (value) => {
        React.$http.get(`/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role`).then((res) => {
            if (res.length === 0) {
                message.error("账号或密码错误!")
            } else {
                localStorage.setItem("token", JSON.stringify(res[0]))
                props.history.push("/")
            }
        })

    }
    return (
        <div style={{ backgroundColor: "#272a49", height: "100%", overflow: "hidden" }}>
            <div className="loginWrap">
                <div className="loginTitle">新闻发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default withRouter(Login)