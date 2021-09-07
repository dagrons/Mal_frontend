import React, { useContext } from "react";
import { Tabs, Table, Typography, List } from "antd";

import { ReportContext } from "../context";

export default () => {
  const { TabPane } = Tabs;
  const network = sanity_correct(useContext(ReportContext).network);

  function sanity_correct(network) {
    // 删除无效的udp信息
    let udp = [];
    for (let it of network.udp) {
      if (it.dst.includes("192.168.56.255") || it.dst.includes("255.255.255.255")) continue;
      udp.push(it)
    }
    
    // 删除无效的tcp信息
    let tcp = [];
    for (let it of network.tcp) {
      if (it.src.includes("192.168.56.1")) continue;
      tcp.push(it)
    }

    // 删除无效的http信息
    let http = []
    for (let it of network.http) {
      if (it.host.includes("192.168.56.")) continue;
      http.push(it)
    }

    network.udp = udp;
    network.tcp = tcp;
    network.http = http;

    return network
  }

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
