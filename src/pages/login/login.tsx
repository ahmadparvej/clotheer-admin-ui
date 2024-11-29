import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
  Typography,
} from "antd";
import { KeyOutlined, LockFilled, UserOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const { Title } = Typography;

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title level={2}>Clotheer</Title>
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form initialValues={{ remember: true }}>
              <Form.Item
                name="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="Password"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Flex justify="space-between">
                  <Checkbox>Remember me</Checkbox>
                  <Button type="link" size="small">Forgot password?</Button> 
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
