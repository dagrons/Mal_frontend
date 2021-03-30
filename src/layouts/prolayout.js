/**
 * libs
 */
import { Layout, Menu } from 'antd';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { AreaChartOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

/**
 * unpack
 */
const { Header, Content, Footer } = Layout;

export default (props) => {
    const location = useLocation(); // 用于选择 Menu.Item key=location
	const history = useHistory(); // 用于搜索框跳转

    return (
        <Layout className="layout" theme="light">

            {/* 导航栏 */}
            <Header
                style={{
                    background: '#fff'
                }}
            >

                {/* TODO: 这里可能需要重构一下 */}

                {/* 导航菜单 */}
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={[location]}>
                    <Menu.Item key="/dashboard"><AreaChartOutlined style={{ fontSize: "16px" }} /><NavLink to="/dashboard">数据面板</NavLink></Menu.Item>
                    <Menu.Item key="/task"><CloudUploadOutlined style={{ fontSize: "16px" }} /><NavLink to="/task">文件上传</NavLink></Menu.Item>
                    <Menu.Item key="4" style={{ float: 'right' }}> {/* 搜索引擎 */}

                        <div
                            style={{
                                textAlign: 'right',
                                height: '64px',
                                lineHeight: '64px',
                                padding: '0 32px',
                                width: '400px',
                            }}
                        >
                            {/* 搜索框 */}
                            <HeaderSearch
                                placeholder="🐱‍🐉特征搜索"
                                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                                onSearch={value => {
                                    console.log('input', value); // eslint-disable-line
                                }}
                                onPressEnter={value => {
                                    history.push('/feature/' + value)
                                }}
                            />
                        </div>
                    </Menu.Item>
                </Menu>
            </Header>

            {/* 页面主体 */}
            <Content style={{ padding: '50px 50px 50px 50px' }} >
                { props.children }
            </Content>

            {/* 页尾 */}
            <Footer style={{ textAlign: 'center' }}>
                🐱‍🏍Mal is a platform for malware analysis
	    	</Footer>
        </Layout>
    )
}