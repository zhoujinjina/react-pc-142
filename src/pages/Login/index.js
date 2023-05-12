import { Card, Button, Checkbox, Form, Input, message } from "antd";
import logo from "../../assets/logo.png";
import "./index.scss";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginStore } = useStore();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      //验证身份是否正确
      await loginStore.getToken({
        mobile: values.username,
        code: values.password,
      });
      //跳转页面
      navigate("/", { replace: false }); //true则不能通过按钮返回原页面
      message.success("登录成功");
    } catch (error) {
      message.error(error.response?.data?.message || "登录失败");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="logo" />
        {/* 登录表单 */}
        <Form
          validateTrigger={["onBlur", "onSubmit"]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入手机号！",
                validateTrigger: "onSubmit",
              },
              {
                pattern: /^1[3-9]\d{9}/,
                message: "请输入正确的手机号",
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
                validateTrigger: "onSubmit",
              },
              {
                len: 6,
                message: "请输入正确的验证码",
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item
          className="login-checkbox-label"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject("请同意用户协议"),
              },
            ]}
          >
            <Checkbox>
              我已阅读并同意<a href="www.baidu.com">用户协议</a>
            </Checkbox>
          </Form.Item>
         
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
