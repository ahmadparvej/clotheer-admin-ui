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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { login, self, logout } from "./../../http/api";
import { useAuthStore } from "../../store/store";
import { usePermission } from "./../../hooks/userPermission";

const getSelf = async () => {
  const response = await self();
  console.log("getself", response);
  return response;
};

const LoginPage = () => {
  const { Title } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser, removeUser } = useAuthStore();
  const { isAllowed } = usePermission();

  const loginUser = async (credentials: Credentials) => {
    const data = await login(credentials);
    return data;
  };

  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  // mutate logout
  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      removeUser();
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfData = await refetch();
      console.log("selfdata",selfData)

      if (selfData?.data) {
        if (!isAllowed(selfData.data)) {
          mutateLogout();
          return;
        }
        setUser(selfData.data);
        messageApi.info("Login successful!");
      } else {
        // handle the case where selfData?.data is undefined
        messageApi.error("Failed to retrieve user data");
      }

    },
    onError: (error) => {
      messageApi.error(error.message);
    },
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
              onFinish={(values) =>
                mutate({ email: values.Username, password: values.Password })
              }
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
