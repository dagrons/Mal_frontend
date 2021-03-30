/**
 * libs
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { AreaChartOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { NavLink, Route, Switch, useLocation, useHistory } from 'react-router-dom';

/**
 * locals
 */
import prolayout from './layouts/prolayout';
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Feature from './pages/Feature';
import 'antd/dist/antd.min.css';
import './App.css';

/**
 * unpack
 */
const { Header, Content, Footer } = Layout;

/**
 * let's go
 */
export default () => {
	const location = useLocation(); // 用于选择 Menu.Item key=location
	const history = useHistory();
	/**
	 * ui
	 */
	return (
		<Switch>

			{/* TODO：写一个布局组件，将需要使用这个布局的页面封装到这个layout组件中，而不是通过路由选择layout，将layout和router解耦 */}

			{/* 特征展示页面 */} {/* 特征展示页面使用自己的布局 */}
			<Route path='/feature/:id'>
				<Feature />
			</Route>

			{/* 文件上传页面 | 数据面板页面 */}
			<Route path='/'>
				<Layout className="layout" theme="light">

					{/* 导航栏 */}
					<Header
						style={{
							background: '#fff'
						}}
					>
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

					<Switch>

						{/* 文件上传页面 */}
						<Route path="/task">
							<Content style={{ padding: '50px 50px 50px 50px' }}>
								<Task />
							</Content>
						</Route>

						{/* 数据面板页面 */}
						<Route path="/">
							<Content style={{ padding: '50px 50px 50px 50px' }}>
								<Dashboard />
							</Content>
						</Route>

					</Switch>

					{/* 页尾 */}
					<Footer style={{ textAlign: 'center' }}>
						🐱‍🏍Mal is a platform for malware analysis
	    			</Footer>
				</Layout>
			</Route>

		</Switch>
	);
}