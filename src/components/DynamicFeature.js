/**
 * libs
 */
import React, { useContext } from 'react';
import { Tabs, Table, Typography, List } from 'antd';

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
* config
*/
const config = {
  // 进程内存分布表
  procMemory_columns: [
    {
      title: '标志',
      dataIndex: 'protect',
    },
    {
      title: '起始地址',
      dataIndex: 'addr',
    },
    {
      title: '结束地址',
      dataIndex: 'end',
    },
    {
      title: '状态位',
      dataIndex: 'state',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '大小',
      dataIndex: 'size',
    },
  ],
  // 可能的恶意脚本信息
  extracted_columns: [
    {
      title: 'category',
      dataIndex: 'category',
    },
    {
      title: 'pid',
      dataIndex: 'pid',
    },
    {
      title: 'name',
      dataIndex: 'raw',
    },
    {
      title: 'program',
      dataIndex: 'program',
    }
  ],
  // 投放的恶意软件信息
  dropped_columns: [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'filepath',
      dataIndex: 'filepath',
    },
  ]
}

export default () => {
  /**
   * state
   */
  const { behavior, procmemory } = useContext(REPORT);

  /**
   * ui
   */
  return (
    <Tabs defaultActiveKey='1' tabPosition="top">

      {/* 内存分布 */}
      {procmemory &&
        <TabPane tab="内存分布" key="1">
          <Table dataSource={procmemory} columns={config.procMemory_columns} />
        </TabPane>
      }

      {/* 注册表 */}
      {behavior &&
        <TabPane tab="注册表" key='2'>
          <List
            bordered
            dataSource={behavior.regkey_read}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </TabPane>
      }

      {/* 文件操作 */}
      {behavior != null &&
        <TabPane tab="文件操作" key='3'>
          <div>
            <Title level={5}>文件创建</Title>
            <List
              bordered
              dataSource={behavior.file_created}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
            <Title level={5}>文件重创建</Title>
            <List
              bordered
              dataSource={behavior.file_recreated}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
            <Title level={5}>文件打开</Title>
            <List
              bordered
              dataSource={behavior.file_opened}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
            <Title level={5}>文件读取</Title>
            <List
              bordered
              dataSource={behavior.file_read}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </div>
        </TabPane>
      }

      {/* 互斥量 */}
      {behavior &&
        <TabPane tab="互斥量" key='4'>
          <List
            bordered
            dataSource={behavior.mutex}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </TabPane>
      }

      {/* 动态链接库 */}
      {behavior &&
        <TabPane tab="动态链接库" key='5'>
          <List
            bordered
            dataSource={behavior.dll_loaded}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </TabPane>
      }

      {/* 解析出的可能恶意脚本 */}
      {behavior.extracted &&
        <TabPane tab="可能的恶意脚本" key="6">
          <Table dataSource={behavior.extracted} columns={config.extracted_columns} />
        </TabPane>
      }

      {/* 投放的恶意软件 */}
      {behavior.dropped &&
        <TabPane tab="投放的恶意软件" key="7">
          <Table dataSource={behavior.dropped} columns={config.dropped_columns} />
        </TabPane>
      }
    </Tabs>
  );
}