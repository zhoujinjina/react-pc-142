import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useStore from "../../store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
const { Header, Sider } = Layout;

const GeekLayout = () => {
  const navigate = useNavigate();
  const {userStore,loginStore,channelStore}=useStore()
  //获取路径
  const { pathname } = useLocation();
  useEffect(()=>{
 userStore.getUserInfo()
 channelStore.loadChannelList()
  },[userStore,channelStore])
  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "数据概览",
    },
    {
      key: "/article",
      icon: <DiffOutlined />,
      label: "内容管理",
    },
    {
      key: "/publish",
      icon: <EditOutlined />,
      label: "发布文章",
    },
  ];
  const onclick = (e) => {
    switch (e.key) {
      case "/":
        navigate("/");
        break;
      case "/article":
        navigate("/article");
        break;
      case "/publish":
        navigate("/publish");
        break;
      default:
        navigate("/");
    }
  };
const onConfirm=()=>{
       //退出登录 删除token 跳回登陆
       loginStore.loginOut()
       navigate("/login")
 }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/* name刷新消失的bug 因为mobx更新了数据 没有用observer包裹组件 无法通知视图更新 */}
          <span className="user-name">{userStore.userinfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout >
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={(e) => onclick(e)}
            selectedKeys={pathname}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);
