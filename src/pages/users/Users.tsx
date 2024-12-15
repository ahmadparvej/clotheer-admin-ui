import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Flex,
  Form,
  message,
  Modal,
  Space,
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "./../../store/store";
import UserFilter from "./UserFilter";
import UserForm from "./forms/UserForm";
import { createUser } from "./../../http/api";
import { PER_PAGE_LIMIT } from "./../../constants/constants";

const columns: TableProps<User>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (text, record) => {
      return (
        <Link to={`/users/${record.id}`} style={{ color: "#1890ff" }}>
          {text} {record.lastName}
        </Link>
      );
    },
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <span>
        <Link to={`/users/${record.id}/edit`}>Edit</Link>
      </span>
    ),
  },
];

const breadcrumbItems = [
  { title: <Link to={"/"}>Dashboard</Link> },
  { title: "Users" },
];

export const UsersPage = () => {
  const { user } = useAuthStore();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: PER_PAGE_LIMIT,
  });

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString();
      return getUsers(queryString);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: createUserMutation } = useMutation({
    mutationFn: async (user: User) => {
      await createUser(user);
    },
    mutationKey: ["createUser"],
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      messageApi.success("User created successfully", 5);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      messageApi.error(error.message, 5);
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    createUserMutation(form.getFieldsValue());
  };

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {contextHolder}
      <Flex justify="space-between">
        <Breadcrumb
          style={{ margin: "0 0 16px 0" }}
          separator={<RightOutlined />}
          items={breadcrumbItems}
        />
        {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
        {isError && (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        )}
      </Flex>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <UserFilter
          onFilterChange={(filterName, filterValue) => {
            console.log("filter changed", filterName, filterValue);
          }}
          onCreateClick={() => {
            setOpen(true);
          }}
        />
        <Table
          columns={columns}
          dataSource={users?.data}
          rowKey="id"
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.limit,
            total: users?.total,
            onChange: (page) => {
              console.log("page changed", page);
              setQueryParams((prev) => ({
                ...prev,
                page,
              }));
            },
          }}
        />
        <Modal
          title="Create new user"
          centered
          open={open}
          onOk={() => onHandleSubmit()}
          onCancel={() => setOpen(false)}
          width={1000}
          okText="Save"
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Modal>
      </Space>
    </>
  );
};
