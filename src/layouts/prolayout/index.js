import { Layout, Menu } from "antd";
import HeaderSearch from "ant-design-pro/lib/HeaderSearch";
import { AreaChartOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import "./index.scss";

export default (props) => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation(); // 当前location, 用于选择Menu Item
  const history = useHistory(); // 用于搜索框跳转: history.push()

  return (
    <Layout theme="light" class="my-prolayout">
      {/* 导航栏 */}
      <Header
        style={{
          background: "#fff",
        }}
      >
        {/* 导航菜单 */}
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[location]}>
          <Menu.Item key="/dashboard">
            <AreaChartOutlined style={{ fontSize: "16px" }} />
            <NavLink to="/dashboard">样本统计</NavLink>
          </Menu.Item>
          <Menu.Item key="/upload">
            <CloudUploadOutlined style={{ fontSize: "16px" }} />
            <NavLink to="/upload">文件上传</NavLink>
          </Menu.Item>
          <Menu.Item key="searchEngine" style={{ float: "right" }}>
            {" "}
            <div
              style={{
                textAlign: "right",
                height: "64px",
                lineHeight: "64px",
                padding: "0 32px",
                width: "400px",
              }}
            >
              {/* 搜索框 */}
              <HeaderSearch
                placeholder="📄目标样本md5"
                dataSource={["a58e8e935341b6f5cc1369c616de3765"]}
                onSearch={(value) => {
                  console.log("input", value); // eslint-disable-line
                }}
                onPressEnter={(value) => {
                  history.push("/feature/" + value);
                }}
              />
            </div>
          </Menu.Item>
        </Menu>
      </Header>

      {/* 页面主体 */}
      <Content
        className="my-prolayout-content"
        style={{ padding: "50px 50px 50px 50px" }}
      >
        {props.children}
      </Content>

      {/* 页尾 */}
      <Footer style={{ textAlign: "center" }}> 🐱‍🏍恶意代码自动化分析</Footer>
    </Layout>
  );
};
