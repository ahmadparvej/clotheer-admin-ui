import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  message,
  Space,
  Typography,
} from "antd";
import { KeyOutlined, LockFilled, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { login } from './../../http/api';

const LoginPage = () => {
  const { Title } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  
  const loginUser = async ( credentials: Credentials ) => {
    const data = await login(credentials);
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      console.log("success");
      messageApi.info('Hello, Ant Design!');
    },
    onError: (error) => {
      console.log(error);
      messageApi.error(error.message);
    }
  });


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
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => mutate({ email: values.Username, password: values.Password })}
            >
              {contextHolder}
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
                  <Button type="link" size="small">
                    Forgot password?
                  </Button>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
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
