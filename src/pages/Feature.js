/**
 * libs
 */
import React, { useEffect, useState, createContext } from "react";
import { PageHeader, Button, Tabs, Spin, Result } from "antd";
import { useParams, Link } from "react-router-dom";

/**
 * local components
 */
import StaticFeature from "../components/StaticFeature.js";
import DynamicFeature from "../components/DynamicFeature.js";
import NetworkFeature from "../components/NetworkFeature.js";
import Classification from "../components/Classification";
import Similarity from "../components/Similarity.js";
import Signature from "../components/Signature.js";
import Connection from "../components/Connection";
import "./Feature.css";

/**
 * globals context
 */
export const REPORT = createContext({});
REPORT.displayName = "report"; // for dev-tools // all capital for context
let report = null; // report will be initialized multiple times. // use report as value for REPORT context
let msg = "";

/**
 * unpack
 */
const { TabPane } = Tabs; // another way to import name

/**
 * let's go
 */
export default () => {
  const { id } = useParams();

  /**
   * states
   */
  const [isLoading, setIsLoading] = useState(true); // page in loading state?
  const [isValid, setIsValid] = useState(true); // id exists?

  /**
   * actions
   */
  function polling() {
    fetch("/feature/report/get/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "reported") {
          report = data.report;
          report.five_most_like = data.five_most_like;
        }
        if (data.status == "error") {
          setIsValid(data.isvalid); // 这个也是invalid
          msg = data.msg;
        } else {
          setIsLoading(data.status !== "reported");
          setIsValid(data.isvalid);
          if (data.isvalid && data.status !== "reported")
            setTimeout(polling, 3000); // 如果任务在队列中并且正执行就等会再试
        }
      });
  }

  /**
   * effects
   */
  useEffect(() => {
    polling();
  }, []); // [] here ensures polling runs only once

  /**
   * ui
   */
  return isValid ? (
    isLoading ? (
      <div className="loading">
        <Spin tip="当前任务正在进行ing" />
      </div>
    ) : (
      <REPORT.Provider value={report}>
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
      </REPORT.Provider>
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
