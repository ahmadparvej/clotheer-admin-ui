import { Breadcrumb, Space, Table, TableProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from './../../store/store';

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

  const { user } = useAuthStore();
  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} items={breadcrumbItems} />
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        {users && <Table columns={columns} dataSource={users} />}
      </Space>
    </>
  );
};
