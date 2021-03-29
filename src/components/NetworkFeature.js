/**
 * libs
 */
import React, { useContext } from 'react';
import { Tabs,Table,Typography,List } from 'antd';

/**
 * local components 
 */
import { REPORT } from '../pages/Feature';

/**
 * unpack
 */
const { TabPane } = Tabs;

/**
 * config 
 */
const config = {
    udp_columns: [
        {
            title: '源地址',
            dataIndex: 'src',
        },
        {
            title: '目的地址',
            dataIndex: 'dst',
        },
        {
            title: '目的端口',
            dataIndex: 'dport',
        },
        {
            title: '源端口',
            dataIndex: 'sport',
        },
    ],
    dns_columns: [
        {
            title: '地址',
            dataIndex: 'request',
        },
        {
            title: '类型',
            dataIndex: 'type',
        }
    ]
}

export default () => {
    /**
     * state
     */
    const network = useContext(REPORT).cuckoo.network

    /**
     * ui
     */
    return (
        <Tabs defaultActiveKey='1' tabPosition="top">  

            <TabPane tab='UDP' key='1'>
                <Table dataSource={network.udp} columns={config.udp_columns} />
            </TabPane>
            
            <TabPane tab='TCP' key='2'>
                <Table dataSource={network.tcp} columns={config.udp_columns} />
            </TabPane>

            <TabPane tab='HTTP' key='3'>
                <Table dataSource={network.http} columns={config.udp_columns} />
            </TabPane>

            <TabPane tab='DNS' key='4'>
                <Table dataSource={network.dns} columns={config.dns_columns} />
            </TabPane>

        </Tabs>
    );
}