import React, { useContext } from "react";
import { Tabs, Table, Typography, List, Image } from "antd";

import { ReportContext } from "../context";

export default () => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const report = useContext(ReportContext);

  const propsIOTable = (x) => {
    return {
      dataSource: x,
      columns: [
        {
          title: "API",
          dataIndex: "name",
        },
        {
          title: "地址",
          dataIndex: "address",
        },
      ],
    };
  };

  const propsSectionTable = {
    dataSource: report.static.pe_sections,
    columns: [
      {
        title: "段名",
        dataIndex: "name",
      },
      {
        title: "虚拟地址",
        dataIndex: "virtual_address",
      },
      {
        title: "大小",
        dataIndex: "size_of_data",
      },
      {
        title: "分配空间",
        dataIndex: "virtual_size",
      },
    ],
  };

  return (
    <Tabs defaultActiveKey="1" tabPosition="top">
      <TabPane tab="导入导出表" key="1">
        {report.static.pe_imports.map((pe_import) => (
          <div>
            <Title level={5}>{pe_import.dll}</Title>
            <Table {...propsIOTable(pe_import.imports)} />
          </div>
        ))}
      </TabPane>

      <TabPane tab="节段信息" key="2">
        <Table {...propsSectionTable} />
      </TabPane>

      <TabPane tab="字符串" key="3">
        <List
          bordered
          dataSource={report.static.strings}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </TabPane>

      <TabPane tab="灰度图" key="4">
        <Image width={200} src={"/feature/bmp/get/" + report._id} />
      </TabPane>
    </Tabs>
  );
};
