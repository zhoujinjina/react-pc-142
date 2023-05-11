import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import useStore from "../../store/index";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { http } from "../../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";

const { Option } = Select;

const Publish = () => {
  const [imageCount, setImageCount] = useState(1);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("id: " + id);
  const form = useRef();
  const cacheImageList=useRef()
  const [loading, setLoading] = useState();
  const { channelStore } = useStore();
  const navigate=useNavigate()
  //存放上传图片的列表
  const [fileList, setFileList] = useState([]);
  //上传过程会触发三次 完全上传到接口可以在文件中获取文件地址
  const onUploadChange = ({ fileList }) => {
    //一定要像下面这么写 才能上传成功 受控方式
    setFileList(fileList);
   
  };
  const radioChange = (e) => {
    setImageCount(e.target.value);
  };
  const onFinish = async (values) => {
    const { channel_id, content, title, type } = values;
    const params = {
      channel_id: channel_id,
      content: content,
      cover: {
        type: type,
        images: fileList.map((item) => item.response.data.url),
      },
      type: type,
      title: title,
    };
    if(id){
       await http.put(`mp/articles/${id}?draft=false`, params)
    }else{
      await http.post("/mp/articles?draft=false", params);
    }
    navigate('/article')
  };
  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true)
        const res = await http.get(`/mp/articles/${id}`);
        setLoading(false);
        form.current.setFieldsValue(res.data);
        setFileList([res.data.cover.images])
        cacheImageList.current=[res.data.cover.images]
      } catch (error) {}
    };
    if (id) {
      loadDetail();
    }
  }, [id]);
  if (loading) {
    return <Loading/>
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "首页",
                href: "/",
              },
              {
                title: id?"编辑文章":"发布文章" ,
              },
            ]}
          ></Breadcrumb>
        }
      >
        <Form
          ref={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((Item) => {
                return (
                  <Option key={Item.id} value={Item.id}>
                    {Item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageCount > 0 && (
              <Upload
              ref={cacheImageList}
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imageCount > 0}
                maxCount={imageCount}
                
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id? "更新文章":"发布文章" }
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
