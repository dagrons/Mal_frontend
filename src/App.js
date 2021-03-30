/**
 * libs
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * locals
 */
import Dashboard from './pages/Dashboard';
import Task from './pages/Task';
import Feature from './pages/Feature';
import Prolayout from './layouts/prolayout';
import B from './components/BehaviorGraph';
import 'antd/dist/antd.min.css';
import './App.css';

/**
 * let's go
 */
export default () => {
	/**
	 * ui
	 */
	return (
		<Switch>

			{/* 文件上传页面 */}
			<Route path="/task">
				<Prolayout>
					<Task />
				</Prolayout>
			</Route>

			{/* 特征展示页面 */} {/* 特征展示页面使用自己的布局 */}
			<Route path='/feature/:id' >
				<Feature />
			</Route>

			{/* 数据面板页面 */}
			<Route path="/">
				<Prolayout>
					<Dashboard />
				</Prolayout>
			</Route>
		</Switch>
	);
}