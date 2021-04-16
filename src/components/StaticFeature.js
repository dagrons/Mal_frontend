/**
 * libs 
 */
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Table, Typography, List, Image } from 'antd';

/**
 * local components
 */
import { REPORT } from '../pages/Feature';

/**
 * unpack
 */
const { TabPane } = Tabs;
const { Title } = Typography;

/**
 * config for components
 */
const config = {
  pe_imports_columns: [
    {
      title: 'API',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ],

  pe_sections_columns: [
    {
      title: '段名',
      dataIndex: 'name',
    },
    {
      title: '虚拟地址',
      dataIndex: 'virtual_address',
    },
    {
      title: '大小',
      dataIndex: 'size_of_data',
    },
    {
      title: '分配空间',
      dataIndex: 'virtual_size',
    },
  ]
}

export default () => {
  /**
   * state
   */
  const report = useContext(REPORT)

  /**
   * unpack
   */
  const id = report._id;
  const { pe_imports, pe_sections, strings } = report.static;

  /**
   * ui
   */
  return (
      <Tabs defaultActiveKey="1" tabPosition="top">

        <TabPane tab="导入导出表" key="1">
          {pe_imports.map((pe_import) => (
            <div>
              <Title level={5}>{pe_import.dll}</Title>
              <Table dataSource={pe_import.imports} columns={config.pe_imports_columns} />
            </div>
          ))}
        </TabPane>

        <TabPane tab="节段信息" key="2">
          <Table dataSource={pe_sections} columns={config.pe_sections_columns} />
        </TabPane>

        <TabPane tab="字符串" key="3">
          <List
            bordered
            dataSource={strings}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab="灰度图" key="4">
          
          <Image 
            width={200}
            src={"/feature/bmp/get/"+id}
          />
        </TabPane>

      </Tabs>
  );
}
