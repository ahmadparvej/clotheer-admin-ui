import { Col, Form, Row, Select, Space } from "antd";
import { Card } from "antd";
import { Input } from "antd";

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
                  rules={[{ required: true }]}
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
