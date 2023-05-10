import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "dayjs/locale/zh-cn";
import { http } from "../../utils/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/index";
import { observer } from "mobx-react-lite";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const { channelStore } = useStore();
  const channelList = channelStore.channelList;
  const [params, setParams] = useState({ page: 1, per_page: 10 });
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    list: [],
    count: 0,
  });

  useEffect(() => {
    const loadList = async () => {
      const res = await http.get("/mp/articles", { params });
      const { results, total_count } = res.data
      setArticleData({
        list: results,
        count: total_count
      })

    };
    loadList();
  }, [params]);
  const formatStatus = (type) => {
    const TYPES = {
      0: <Tag>草稿</Tag>,
      1: <Tag>待审核</Tag>,
      2: <Tag>审核通过</Tag>,
      3: <Tag>审核失败</Tag>,
    };
    return TYPES[type];
  };
  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`);
    setParams({ ...params, page: 1 });
  };
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`);
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        if(cover.images.length>0){
          return<img
          src={cover.images[0] || null}
          width={80}
          height={80}
          alt="加载失败"
        />
        }
        return "没图片的哥们~"
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (type) =>{
        return formatStatus(type)
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => goPublish(data)}
              shape="circle"
              icon={<EditOutlined />}
            />
            <Button
              type="primary"
              danger
              onClick={() => delArticle(data)}
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  const onFinish = (values) => {
    const { channel_id, date, status } = values;
    const _params = {};
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (status !== -1) {
      _params.status = status;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    setParams({ ...params, ..._params });
  };
  //   const onShowSizeChange = (current, pageSize) => {
  //     setParams({...params,page: current, per_page: pageSize })
  // console.log(current, pageSize);
  //   };
  const pageChange = (page) => {
    setParams({ ...params, page });
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
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
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
              {channelList.map((Item) => {
                return (
                  <Option key={Item.id} value={Item.id}>
                    {Item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            {/* 当前版本在form表单中获取不到值，包裹整个app即可 */}
            <RangePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${articleData.list.length} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            // defaultCurrent: "1",
            pageSize: params.per_page,
            total: articleData.count,
            // totalPages: articleData.list.length,
            // showSizeChanger: true,
            // onShowSizeChange: onShowSizeChange,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default observer(Article);
