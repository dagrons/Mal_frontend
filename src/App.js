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
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Feature from './pages/Feature';
import Prolayout from './layouts/prolayout';
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
	/**
	 * ui
	 */
	return (
		<Switch>

			{/* 特征展示页面 */} {/* 特征展示页面使用自己的布局 */}
			<Route path='/feature/:id'>
					<Feature />
			</Route>

			{/* 文件上传页面 | 数据面板页面 */}
			<Route path='/'>
					<Switch>

						{/* 文件上传页面 */}
						<Route path="/task">
							<Prolayout>
								<Task />
							</Prolayout>
						</Route>

						{/* 数据面板页面 */}
						<Route path="/">
							<Prolayout>
								<Dashboard />
							</Prolayout>
						</Route>
					</Switch>					
			</Route>

		</Switch>
	);
}