import { useState, useEffect } from "react";
import { Row, Col, Space, Card, Statistic, Table } from "antd";
import { Line, Bar, RingProgress, TinyArea } from "@ant-design/charts";

import { getDashboard, getPendingCnt } from "../../api";

import "antd/dist/antd.css";
import "./index.scss";

export default () => {
  const [pendingCnt, setPendingCnt] = useState(0);
  const [current, setCurrent] = useState(0);  
  const [uploaded, setUploaded] = useState(0);
  const [recent, setRecent] = useState(0);
  const [tinyarea_data, setTinyAreaData] = useState([]);
  const [typeres_data, setTyperesData] = useState([]);  
  const [dist, setDist] = useState([
    { type: "Ramnit", value: 0 },
    { type: "Lollipop", value: 0 },
    { type: "Kelihos_ver3", value: 0 },
    { type: "Vundo", value: 0 },
    { type: "Simda", value: 0 },
    { type: "Tracur", value: 0 },
    { type: "Kelihos_ver1", value: 0 },
    { type: "Obfuscator", value: 0 },
    { type: "Gatak", value: 0 },
  ]);

  useEffect(() => {
    getPendingCnt()
    .then(res => res.data)
    .then(data => {
      setPendingCnt(data);;
    })
  });

  useEffect(() => {
    getDashboard()
      .then((res) => res.data)
      .then((data) => {
        setUploaded(data.samples_count);
        setCurrent(data.current_count);
        setRecent(data.recent_count);
        setTinyAreaData(data.trend_area);
        const typeres = [];

        let cnt = 0;
        for (const [k, v] of Object.entries(data.type_res)) {
          typeres.push({ family: k, count: v });
          cnt += v;
        }
        setTyperesData(typeres);

        let idx = 0;
        let t = [];
        for (const [k, v] of Object.entries(data.type_res)) {
          t[idx++] = { type: k, value: v / cnt };
        }
        setDist(t);
      });
  }, []);

  const propsTinyArea = {
    height: 100,
    autoFit: false,
    data: tinyarea_data,
    smooth: true,
  };

  const propsBar = {
    data: typeres_data,
    height: 400,
    xField: "count",
    yField: "family",
    seriesField: "family",
    legend: { position: "top-left" },
  };

  const propsTable = {
    dataSource: typeres_data,
    columns: [
      {
        title: "family",
        dataIndex: "family",
        key: "family",
      },
      {
        title: "count",
        dataIndex: "count",
        key: "count",
      },
    ],
    size: "small",
    showHeader: false,
    pagination: { position: ["none", "none"] },
  };

  return (
    <div className="dashboard-content">
      <Row gutter={[16, 16]}>
        <Col flex="1 1 auto">
          <Card
            title="数据概览"
            style={{
              height: "188px",
            }}
          >
            <Space>
              <Statistic title="上传数" value={uploaded} />
              <Statistic title="等待处理" value={pendingCnt} />
              <Statistic title="正在处理" value={current} />
              <Statistic title="近期上传样本数" value={recent} />
            </Space>
          </Card>
        </Col>
        <Col flex="1 1 auto">
          <Card title="样本分布">
            <div>
              <Space>
                {dist.map((t) => (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {t.type}
                    <RingProgress
                      width={60}
                      height={60}
                      percent={t.value}
                      color={["#30BF78", "#E8EDF3"]}
                    />
                  </div>
                ))}
              </Space>
            </div>
          </Card>
        </Col>
        <Col flex="1 1 auto">
          <Card
            title="趋势图"
            style={{
              height: "188px",
            }}
          >
            <TinyArea {...propsTinyArea} />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: "16px", // Row和Row之间的margin用marinTop处理
        }}
      >
        <Col flex="auto">
          <Card title="各个家族分布">
            <Row gutter={16} align="middle">
              <Col span={16}>
                <Bar {...propsBar} />
              </Col>
              <Col span={8}>
                <Table {...propsTable} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* <Row
        gutter={16}
        style={{
          marginTop: "16px",
        }}
      >
        <Col flex="auto">
          <Card title="流行趋势图">
            <Line {...propsLine} />
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};
