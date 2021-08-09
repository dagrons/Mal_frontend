import React, { useEffect, useState } from "react";
import { PageHeader, Button, Tabs, Spin, Result } from "antd";
import { useParams, Link } from "react-router-dom";

import StaticFeature from "./components/StaticFeature";
import DynamicFeature from "./components/DynamicFeature";
import NetworkFeature from "./components/NetworkFeature";
import Classification from "./components/Classification";
import Similarity from "./components/Similarity";
import Signature from "./components/Signature";
import Connection from "./components/Connection";
import { ReportContext } from "./context";

import { getReport, getStatus } from "../../api";

import "./index.scss";

export default () => {
  const { TabPane } = Tabs; // another way to import name
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true); // page in loading state?
  const [isValid, setIsValid] = useState(true); // id exists?
  const [msg, setMsg] = useState("正在查询任务状态"); // 如果获取失败, 展示的消息
  const [report, setReport] = useState(null);

  useEffect(() => {
    polling();
  }, []); // [] here ensures polling runs only once

  function polling() {
    // 这里应该先setReport, 然后再setIsLoading, setIsValid, 思考为什么
    getStatus(id)
      .then((res) => res.data)
      .then((data) => {
        if (data === "reported") {
          setMsg("正在获取报告");
          getReport(id)
            .then((res) => res.data)
            .then((data) => {
              let t = data.report;
              t.five_most_like = data.five_most_like;
              setReport(t);
              setIsLoading(false);
            });
        } else if (data === "exception") {
          setIsValid(false);
          setMsg("任务异常");
        } else if (data === "done") {
          setMsg("任务即将完成");
        } else if (data === "running") {
          setMsg("任务正在进行");
        } else {
          setIsValid(false);
          setMsg("任务不存在");
        }
      });
  }

  return isValid ? (
    isLoading ? (
      <div className="feature-loading">
        <Spin tip={msg} />
      </div>
    ) : (
      <ReportContext.Provider value={report}>
        {" "}
        {/* 提供全局上下文，对于简单的逻辑足够了 */}
        {/* 页头 */}
        <div>
          <Link to="/task">
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title={report._id + " 分析报告"}
              subTitle=""
            ></PageHeader>
          </Link>
        </div>
        <div>
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="静态特征" key="1">
              <StaticFeature />
            </TabPane>

            {report.behavior /* 动态特征为可选字段 */ && (
              <TabPane tab="动态特征" key="2">
                <DynamicFeature />
              </TabPane>
            )}
            <TabPane tab="网络特征" key="3">
              <NetworkFeature />
            </TabPane>
            <TabPane tab="家族分类" key="4">
              <Classification />
            </TabPane>
            <TabPane tab="同源分析" key="5">
              <Similarity />
            </TabPane>
            {report.signatures /* sigature为可选字段 */ && (
              <TabPane tab="预警分析" key="6">
                <Signature />
              </TabPane>
            )}
            <TabPane tab="关联分析" key="7">
              <Connection />
            </TabPane>
          </Tabs>
        </div>
      </ReportContext.Provider>
    )
  ) : (
    <Result
      status="404"
      title="404"
      subTitle={msg || "😂对不起，没找到" + id + " 可能文件名输错了呢😁"}
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};
