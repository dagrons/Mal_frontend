import React, { useContext } from "react";
import { Tabs, Table, Typography, List } from "antd";

import { ReportContext } from "../context";

export default () => {
  const { TabPane } = Tabs;
  const network = useContext(ReportContext).network;

  const propsTable = (x) => {
    return {
      dataSource: x,
      columns: [
        {
          title: "源地址",
          dataIndex: "src",
        },
        {
          title: "目的地址",
          dataIndex: "dst",
        },
        {
          title: "目的端口",
          dataIndex: "dport",
        },
        {
          title: "源端口",
          dataIndex: "sport",
        },
      ],
    };
  };

  const propsHTTPTable = {
    dataSource: network.http,
    columns: [
      {
        title: "目标",
        dataIndex: "host",
      },
      {
        title: "路径",
        dataIndex: "path",
      },
      {
        title: "URI",
        dataIndex: "uri",
      },
      {
        title: "主体",
        dataIndex: "body",
      },
      {
        title: "方法",
        dataIndex: "method",
      },
      {
        title: "数据",
        dataIndex: "data",
      },
    ],
  };

  const propsDNSTable = {
    dataSource: network.dns,
    columns: [
      {
        title: "地址",
        dataIndex: "request",
      },
      {
        title: "类型",
        dataIndex: "type",
      },
    ],
  };

  return (
    <Tabs defaultActiveKey="1" tabPosition="top">
      {network.udp.length > 0 && (
        <TabPane tab="UDP" key="1">
          <Table {...propsTable(network.udp)} />
        </TabPane>
      )}

      {network.tcp.length > 0 && (
        <TabPane tab="TCP" key="2">
          <Table {...propsTable(network.tcp)} />
        </TabPane>
      )}

      {network.http.length > 0 && (
        <TabPane tab="HTTP" key="3">
          <Table {...propsHTTPTable} />
        </TabPane>
      )}

      {network.dns.length > 0 && (
        <TabPane tab="DNS" key="4">
          <Table {...propsDNSTable} />
        </TabPane>
      )}
    </Tabs>
  );
};
