import { Card, Col, Input, Row, Select } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type UserFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void;
};

const UserFilter = ({ onFilterChange }: UserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row style={{ gap: "10px" }}>
            <Col span={8}>
              <Input.Search
                style={{ width: "100%" }}
                placeholder="Search"
                allowClear={true}
                onChange={(e) => onFilterChange("search", e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                placeholder="Role"
                allowClear={true}
                onChange={(value) => onFilterChange("role", value)}
              >
                <Select.Option value="admin">admin</Select.Option>
                <Select.Option value="manager">manager</Select.Option>
                <Select.Option value="customer">customer</Select.Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                placeholder="Status"
                allowClear={true}
                onChange={(value) => onFilterChange("status", value)}
              >
                <Select.Option value="active">active</Select.Option>
                <Select.Option value="inactive">inactive</Select.Option>
                <Select.Option value="banned">banned</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" icon={<PlusOutlined />}>
            {" "}
            Create User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
