import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Form, Modal, Space, Table, TableProps, theme } from "antd";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "./../../store/store";
import UserFilter from "./UserFilter";
import UserForm from "./forms/UserForm";

const columns: TableProps<User>["columns"] = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (text, record) => {
      return (
        <Link to={`/users/${record.id}`}>
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
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const { token: { colorBgLayout } } = theme.useToken();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Breadcrumb
        style={{ margin: "0 0 16px 0" }}
        separator={<RightOutlined />}
        items={breadcrumbItems}
      />
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <UserFilter
          onFilterChange={(filterName, filterValue) => {
            console.log("filter changed", filterName, filterValue);
          }}
          onCreateClick={() => {
            setOpen(true);
          }}
        />
        {users && <Table columns={columns} dataSource={users} />}
        <Modal
          title="Modal 1000px width"
          styles={{ body: { backgroundColor: colorBgLayout } }}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form layout="vertical">
            <UserForm/>
          </Form>
        </Modal>
      </Space>
    </>
  );
};
