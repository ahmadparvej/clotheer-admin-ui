import { Col, Form, Row, Select, Space, Input, Card } from "antd";

const UserForm = () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Space direction="vertical">
          <Card title="Basic Info" style={{ width: "100%" }}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Info" style={{ width: "100%" }}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
      <Col span={12}>
        <Card>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="admin">admin</Select.Option>
                  <Select.Option value="manager">manager</Select.Option>
                  <Select.Option value="customer">customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
