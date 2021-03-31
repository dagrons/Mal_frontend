/**
 * libs
 */
import React, { useEffect, useState, createContext } from 'react';
import { PageHeader, Button, Tabs, Spin, Result } from 'antd';
import { useParams, Link } from 'react-router-dom';

/**
 * local components
 */
import StaticFeature from '../components/StaticFeature.js';
import DynamicFeature from '../components/DynamicFeature.js';
import NetworkFeature from '../components/NetworkFeature.js';
import Classification from '../components/Classification';
import Similarity from '../components/Similarity.js';
import Signature from '../components/Signature.js';
import Connection from '../components/Connection';
import './Feature.css';

/**
 * globals context
 */
export const REPORT = createContext({}); REPORT.displayName = 'report';  // for dev-tools // all capital for context
let report = null; // report will be initialized multiple times. // use report as value for REPORT context

/**
 * unpack
 */
const { TabPane } = Tabs; // another way to import name

/**
 * let's go 
 */
export default () => {

	const { id } = useParams()

	/**
	 * states
	 */
	const [isLoading, setIsLoading] = useState(true); // page in loading state?
	const [isValid, setIsValid] = useState(true); // id exists?

	/**
	 * actions
	 */
	function polling() {
		fetch('/feature/report/get/' + id)
			.then(res => res.json())
			.then((data) => {
				report = data;
				report.id = id;
			})
			.then(() => {
				setIsLoading(report.cuckoo===null);
				setIsValid(report.isvalid);
				if (report.isvalid && report.cuckoo === null) setTimeout(polling ,3000);
			})
	}

	/**
	 * effects
	 */
	useEffect(() => {
		polling()
	}, []) // [] here ensures polling runs only once

	/**
	 * ui
	 */
	return (
		isValid ?
			isLoading ?
				<div className="loading"><Spin tip="当前任务正在进行ing" /></div>
				:
				<REPORT.Provider value={report}>  {/* 提供全局上下文，对于简单的逻辑足够了 */}
					{/* 页头 */}
					<div>
						<Link to="/task">
							<PageHeader
								className="site-page-header"
								onBack={() => null}
								title={report.id + " 分析报告"}
								subTitle="">
							</PageHeader>
						</Link>
					</div>
					<div>
						<Tabs defaultActiveKey="1" tabPosition="left">
							<TabPane tab="静态特征" key="1"><StaticFeature /></TabPane>
							<TabPane tab="动态特征" key="2"><DynamicFeature /></TabPane>
							<TabPane tab="网络特征" key="3"><NetworkFeature /></TabPane>
							<TabPane tab="家族分类" key="4"><Classification /></TabPane>
							<TabPane tab="同源分析" key="5"><Similarity /></TabPane>
							<TabPane tab="预警分析" key="6"><Signature /></TabPane>
							<TabPane tab="关联分析" key="7"><Connection /></TabPane>
						</Tabs>
					</div>
				</REPORT.Provider>
			:
			<Result
				status="404"
				title="404"
				subTitle={"😂对不起，没找到" + report.id + " 可能文件名输错了呢😁"}
				extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
			/>
	)
}