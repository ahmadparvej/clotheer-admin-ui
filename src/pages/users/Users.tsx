import { Breadcrumb } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export const UsersPage = () => {

  const breadcrumbItems = [
    { title: <Link to={'/'}>Dashboard</Link>},
    { title: 'Users' }
  ]

  return (
    <>
      <Breadcrumb separator={<RightOutlined />} items={breadcrumbItems} />
    </>
  )
}
