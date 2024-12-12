//create a form for below
// {
//     "firstName": "firoz",
//     "lastName": "ahmad",
//     "email": "firoz2@gmail.com",
//     "password": "firoz123@",
//     "tenantId": 1,
//     "role": "manager"
// }

import { Col, Form, Row } from "antd"
import { Card } from 'antd';
import { Input } from 'antd';

const UserForm = () => {
  return (
    <Row>
        <Col span={12}>
            <Card title="Basic Info" style={{width:"100%"}}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
  )
}

export default UserForm