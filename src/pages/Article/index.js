import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  ConfigProvider,
} from "antd";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Home",
                href: "/",
              },
              {
                title: "内容管理",
              },
            ]}
          ></Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ status: -1, channel_id: "jack" }}
          onFinish={onFinish}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              //   defaultValue="lucy"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <ConfigProvider locale={locale}>
              <RangePicker />
            </ConfigProvider>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Article;
