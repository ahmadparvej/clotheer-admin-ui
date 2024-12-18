import { Card, Col, Form, Input, Row, Select } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type UserFilterProps = {
  onCreateClick: () => void;
};

const UserFilter = ({ onCreateClick }: UserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row style={{ gap: "10px" }}>
            <Col span={8}>
              <Form.Item name="q" style={{ marginBottom: 0 }}>
                <Input.Search
                  style={{ width: "100%" }}
                  placeholder="Search"
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="role" style={{ marginBottom: 0 }}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Role"
                  allowClear={true}
                >
                  <Select.Option value="admin">admin</Select.Option>
                  <Select.Option value="manager">manager</Select.Option>
                  <Select.Option value="customer">customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="status" style={{ marginBottom: 0 }}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Status"
                  allowClear={true}
                >
                  <Select.Option value="active">active</Select.Option>
                  <Select.Option value="inactive">inactive</Select.Option>
                  <Select.Option value="banned">banned</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
            Create User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
