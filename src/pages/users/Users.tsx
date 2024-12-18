import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
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
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUsers, updateUser } from "../../http/api";
import { UpdateUser, User } from "../../types";
import { useAuthStore } from "./../../store/store";
import UserFilter from "./UserFilter";
import UserForm from "./forms/UserForm";
import { createUser } from "./../../http/api";
import { PER_PAGE_LIMIT } from "./../../constants/constants";
import { debounce } from "lodash";

let columns: TableProps<User>["columns"] = [
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
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    render: (tenant) => tenant?.name ?? "-",
  }
];

const breadcrumbItems = [
  { title: <Link to={"/"}>Dashboard</Link> },
  { title: "Users" },
];

export const UsersPage = () => {
  const { user } = useAuthStore();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
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

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: async (user: UpdateUser) => {
      await updateUser(user, editUser!.id);
    },
    mutationKey: ["updateUser"],
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      messageApi.success("User updated successfully", 5);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditUser(null);
    },
    onError: (error) => {
      messageApi.error(error.message, 5);
    }
  });

  const onHandleSubmit = async () => {
    if (editUser) {
      await form.validateFields();
      // remove confirmPassword
      const payload = form.getFieldsValue();
      delete payload.confirmPassword;
      console.log(payload)
      updateUserMutation(payload);
    } else {
      await form.validateFields();
      createUserMutation(form.getFieldsValue());
    }
  };

  const onFilterChange = () => {
    const formData = filterForm.getFieldsValue();

    // remove undefined or null values
    Object.keys(formData).forEach((key) => {
      if (formData[key] === undefined || formData[key] === null) {
        formData[key] = "";
      }
    });
    
    // if formData is not empty, set queryParams to formData
    debouncedQUpdate(formData);
  }

  const debouncedQUpdate = useMemo(() => debounce(
    (formData) => {
      setQueryParams((prev) => ({
        ...prev,
        ...formData,
        page: 1
      }))
    },
    500
  ), []);

  useEffect(() => {
    if (editUser) {
      form.setFieldsValue(editUser);
    }
  }, [editUser]);

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
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UserFilter
            onCreateClick={() => {
              setEditUser(null);
              form.resetFields();
              setOpen(true);
            }}
          />
        </Form>
        <Table
          columns={[...columns, 
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => {
                return (
                  <Space>
                    <Button
                      type="link"
                      onClick={() => {
                        setEditUser(record);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                );
              },
            }]}
          dataSource={users?.data}
          rowKey="id"
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.limit,
            total: users?.total,
            onChange: (page) => {
              setQueryParams((prev) => ({
                ...prev,
                page,
              }));
            },
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
          }}
        />
        <Modal
          title={editUser ? "Edit User" : "Create User"}
          centered
          open={open}
          onOk={() => onHandleSubmit()}
          onCancel={() => setOpen(false)}
          width={1000}
          okText={"Save"}
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Modal>
      </Space>
    </>
  );
};
