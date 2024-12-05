import { Typography } from "antd";
import { Card, Row, Col, List, Tag, Button } from "antd";

const { Title } = Typography;

export const HomePage = () => {
  // const salesData = [
  //   { name: "1 Jan", sales: 10000 },
  //   { name: "2 Jan", sales: 15000 },
  //   { name: "3 Jan", sales: 25000 },
  //   { name: "4 Jan", sales: 20000 },
  //   { name: "5 Jan", sales: 30000 },
  //   { name: "6 Jan", sales: 35000 },
  // ];

  const recentOrders = [
    {
      name: "Rakesh Kohali",
      address: "main street, bandra",
      amount: "₹1250",
      status: "Preparing",
    },
    {
      name: "John Doe",
      address: "side street, bandra",
      amount: "₹900",
      status: "On the way",
    },
    {
      name: "Naman Kar",
      address: "down street, bandra",
      amount: "₹1900",
      status: "Delivered",
    },
    {
      name: "Naman Kar",
      address: "down street, bandra",
      amount: "₹1900",
      status: "Delivered",
    },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Title level={4}>Welcome, Parvej 😊</Title>
      <Row gutter={12}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Total orders" bordered={false}>
                <h2>28</h2>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Total sale" bordered={false}>
                <h2>₹ 50 000</h2>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="Sales"
                bordered={false}
                extra={
                  <Button.Group>
                    <Button>W</Button>
                    <Button type="primary">M</Button>
                    <Button>Y</Button>
                  </Button.Group>
                }
              ></Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card title="Recent orders" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentOrders}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.name}</span>}
                    description={item.address}
                  />
                  <div>
                    <span>{item.amount}</span>{" "}
                    <Tag
                      color={
                        item.status === "Delivered"
                          ? "green"
                          : item.status === "On the way"
                          ? "blue"
                          : "red"
                      }
                    >
                      {item.status}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
            <div style={{ textAlign: "right" }}>
              <a href="#">See all orders</a>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
