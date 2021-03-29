import { useState, useEffect } from 'react';
import { Row, Col, Space, Card, Statistic, Table } from 'antd';
import { Line, Bar, RingProgress, TinyArea } from '@ant-design/charts';

import 'antd/dist/antd.css';
import './Dashboard.css';

const tinyarea_data = [
  264,
  417,
  438,
  887,
  309,
  397,
  550,
  575,
  563,
  430,
  525,
  592,
  492,
  467,
  513,
  546,
  983,
  340,
  539,
  243,
  226,
  192,
];

const tinyarea_config = {
  height: 100,
  autoFit: false,
  data: tinyarea_data,
  smooth: true,
};

const bar_data = [
  {
    family: 'Ramnit',
    count: 315,
  },
  {
    family: 'Lollipop',
    count: 518,
  },
  {
    family: 'Kelihos_ver3',
    count: 692,
  },
  {
    family: 'Vundo',
    count: 444,
  },
  {
    family: 'Simda',
    count: 840,
  },
  {
    family: 'Tracur',
    count: 249
  },
  {
    family: 'Kelihos_ver1',
    count: 283
  },
  {
    family: 'Obfuscator',
    count: 875
  },
  {
    family: 'Gatak',
    count: 465
  },
];

const bar_config = {
  data: bar_data,
  height: 400,
  xField: 'count',
  yField: 'family',
  seriesField: 'family',
  legend: { position: 'top-left' },
}

const table_data = bar_data;

const table_columns = [
  {
    title: 'family',
    dataIndex: 'family',
    key: 'family',
  },
  {
    title: 'count',
    dataIndex: 'count',
    key: 'count',
  }
]

const choices = ["Ramnit", "Lollipop", "Kelihos_ver3", "Vundo", "Simda", "Tracur", "Kelihos_ver1", "Obfuscator", "Gatak"];

export default () => {
  const [line_data, setLineData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json = json.slice(0, 81);
        const s = {}
        for (let i = 0; i < 9; i++) s[i] = 0;
        for (let i = 0; i < json.length; i++) {
          json[i].name = choices[Math.floor(i / Math.floor((json.length / 9)))];
          json[i].year = Math.floor(i % Math.floor(json.length / 9)).toString();
          s[i % Math.floor(json.length / 9)] += Math.random() * 100;
          json[i].gdp = s[i % Math.floor(json.length / 9)];
        }
        setLineData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const line_config = {
    data: line_data,
    height: 300,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000000000).toFixed(1), ' B');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return (
    <div className="content">
      <Row gutter={[16, 16]}>
        <Col flex="1 1 auto">
          <Card title="数据概览" style={{
            height: "188px"
          }}>
            <Space>
              <Statistic title="上传数" value={4723} />
              <Statistic title="处理样本数" value={4681} />
              <Statistic title="近期上传样本数" value={27} />
            </Space>
          </Card>
        </Col>
        <Col flex="1 1 auto">
          <Card title="样本分布">
            <div>
              <Space>
                <div style={{
                  textAlign: 'center'
                }}>
                  Ramnit
                      <RingProgress width={60} height={60} percent={0.12} color={['#30BF78', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Lollipop
                      <RingProgress width={60} height={60} percent={0.14} color={['#F0BF78', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Kelihos_ver3
                      <RingProgress width={60} height={60} percent={0.06} color={['#F00FF8', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Vundo
                      <RingProgress width={60} height={60} percent={0.13} color={['#300F08', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Simda
                      <RingProgress width={60} height={60} percent={0.07} color={['#E0BFE8', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Tracur
                      <RingProgress width={60} height={60} percent={0.12} color={['#606F78', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Kelihos_ver1
                      <RingProgress width={60} height={60} percent={0.08} color={['#909F78', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Obfuscator
                      <RingProgress width={60} height={60} percent={0.11} color={['#505F78', '#E8EDF3']} />
                </div>
                <div style={{
                  textAlign: 'center'
                }}>
                  Gatak
                      <RingProgress width={60} height={60} percent={0.09} color={['#306F68', '#E8EDF3']} />
                </div>
              </Space>
            </div>
          </Card>
        </Col>
        <Col flex="1 1 auto">
          <Card title="趋势图" style={{
            height: "188px",
          }}>
            <TinyArea {...tinyarea_config} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{
        marginTop: '16px', // Row和Row之间的margin用marinTop处理
      }}>
        <Col flex="auto">
          <Card title="各个家族分布" >
            <Row gutter={16} align="middle">
              <Col span={16}>
                <Bar {...bar_config} />
              </Col>
              <Col span={8}>
                <Table
                  dataSource={table_data}
                  columns={table_columns}
                  size="small"
                  showHeader={false}
                  pagination={{ position: ["none", "none"] }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{
        marginTop: '16px',
      }}>
        <Col flex="auto">
          <Card title="流行趋势图">
            <Line {...line_config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
