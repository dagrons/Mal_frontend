import React, { useContext } from "react";
import { Tabs, Table, Typography, List } from "antd";

import { ReportContext } from "../context";

export default () => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { behavior, procmemory } = useContext(ReportContext);

  const propsMemTable = {
    dataSource: procmemory,
    columns: [
      {
        title: "标志",
        dataIndex: "protect",
      },
      {
        title: "起始地址",
        dataIndex: "addr",
      },
      {
        title: "结束地址",
        dataIndex: "end",
      },
      {
        title: "状态位",
        dataIndex: "state",
      },
      {
        title: "类型",
        dataIndex: "type",
      },
      {
        title: "大小",
        dataIndex: "size",
      },
    ],
  };

  const propsExtractedTable = {
    dataSource: behavior.extracted,
    columns: [
      {
        title: "category",
        dataIndex: "category",
      },
      {
        title: "pid",
        dataIndex: "pid",
      },
      {
        title: "name",
        dataIndex: "raw",
      },
      {
        title: "program",
        dataIndex: "program",
      },
    ],
  };

  const propsDroppedTable = {
    dataSource: behavior.dropped,
    columns: [
      {
        title: "name",
        dataIndex: "name",
      },
      {
        title: "filepath",
        dataIndex: "filepath",
      },
    ],
  };

  return (
    <Tabs defaultActiveKey="1" tabPosition="top">
      {/* 内存分布 */}
      {procmemory.length > 0 && (
        <TabPane tab="内存分布" key="1">
          <Table {...propsMemTable} />
        </TabPane>
      )}

      {/* 注册表 */}
      {behavior && behavior.regkey_read.length > 0 && (
        <TabPane tab="注册表" key="2">
          <List
            bordered
            dataSource={behavior.regkey_read}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      )}

      {/* 文件操作 */}
      {behavior &&
        (behavior.file_created.length > 0 ||
          behavior.file_opened.length > 0 ||
          behavior.file_read.length > 0 ||
          behavior.file_recreated.length > 0) && (
          <TabPane tab="文件操作" key="3">
            <div>
              <Title level={5}>文件创建</Title>
              <List
                bordered
                dataSource={behavior.file_created}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Title level={5}>文件重创建</Title>
              <List
                bordered
                dataSource={behavior.file_recreated}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Title level={5}>文件打开</Title>
              <List
                bordered
                dataSource={behavior.file_opened}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Title level={5}>文件读取</Title>
              <List
                bordered
                dataSource={behavior.file_read}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          </TabPane>
        )}

      {/* 互斥量 */}
      {behavior && behavior.mutex.length > 0 && (
        <TabPane tab="互斥量" key="4">
          <List
            bordered
            dataSource={behavior.mutex}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      )}

      {/* 动态链接库 */}
      {behavior && behavior.dll_loaded.length > 0 && (
        <TabPane tab="动态链接库" key="5">
          <List
            bordered
            dataSource={behavior.dll_loaded}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      )}

      {/* 解析出的可能恶意脚本 */}
      {behavior && behavior.extracted.length > 0 && (
        <TabPane tab="可能的恶意脚本" key="6">
          <Table {...propsExtractedTable} />
        </TabPane>
      )}

      {/* 投放的恶意软件 */}
      {behavior && behavior.dropped.length > 0 && (
        <TabPane tab="投放的恶意软件" key="7">
          <Table {...propsDroppedTable} />
        </TabPane>
      )}
    </Tabs>
  );
};
