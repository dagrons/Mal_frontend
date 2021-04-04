/**
 * libs
 */
import { Alert, Space, Card, Spin, Table, message } from 'antd';
import Graphin, { Utils } from '@antv/graphin';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

/**
 * local components 
 */
import { REPORT } from '../pages/Feature';
import B from './BehaviorGraph';
import './Signature.css';

/**
 * local attrs
 */
// let data = null;
let ttp_msg_list = [];

/**
 * config 
 */
const config = {
    ttp_table_columns: [
        {
            title: '阶段',
            dataIndex: 'stage',
        },
        {
            title: '简介',
            dataIndex: 'short',
        },
        {
            title: '描述',
            dataIndex: 'long',
        }
    ],
};

/**
 * utils
 */
/* function preprocessing(signatures) { // construct tree nodes and egdes information from signatures
    // 先计算总的节点数
    let count = 1 + signatures.length;
    for (let i = 0; i < signatures.length; i++) {
        count += signatures[i].marks.length;
    }

    // 构造树信息
    // 分配节点和边
    const data = Utils.mock(count).tree().graphin(); // 如果是树的话，边的个数 = 点的个数-1  
    let ndx = 1, edx = 0; // node idx start from 1, edge idx start from 0
    data.nodes[0].label = "";
    data.nodes[0].shape = 'RectNode';

    // 构造过程
    for (let i = 0; i < signatures.length; i++) { // 构造一级节点
        data.nodes[ndx].label = "";
        data.nodes[ndx].shape = 'RectNode';
        data.edges[edx].label = signatures[i].name;
        data.edges[edx].source = 'node-0';
        data.edges[edx].target = 'node-' + ndx;
        edx++; ndx++;
        let pndx = ndx - 1;
        for (let j = 0; j < signatures[i].marks.length; j++) { // 构造二级节点
            if (signatures[i].marks[j] == null) {
                console.log(i.toString() + j.toString())
            }
            let type = signatures[i].marks[j].type;
            if (type == "call") {
                data.nodes[ndx].label = "";
                data.nodes[ndx].shape = 'RectNode';
                data.edges[edx].label = signatures[i].marks[j].call.api;
                data.edges[edx].source = 'node-' + pndx.toString();
                data.edges[edx].target = 'node-' + ndx;
                edx++; ndx++;
            }
            else if (type == "ioc") {
                data.nodes[ndx].label = "";
                data.nodes[ndx].shape = 'RectNode';
                data.edges[edx].label = signatures[i].marks[j].ioc;
                data.edges[edx].source = 'node-' + pndx.toString();
                data.edges[edx].target = 'node-' + ndx;
                edx++; ndx++;
            }
            else {
                data.edges[edx].label = "unknown behavior";
                data.edges[edx].source = 'node-' + pndx.toString();
                data.edges[edx].target = 'node-' + ndx;
                edx++; ndx++;
            }
        }
    }

    return data;
} */

export default () => {
    /**
     * variable defined here should be evaluated whenever it was rendered()
     */

    /**
     * unpack from context
     */
    const { _id, signatures }= useContext(REPORT);
    const id = _id;

    /**
     * 构造树的过程
     */
    const data = (function make_tree() {
        const data = { 'id': id, 'children': [] };
        for (let i = 0; i < signatures.length; i++) {
            if (signatures[i].marks.length == 0) 
                data.children[i] = {'id': signatures[i].description + '__' + i.toString() }
            else data.children[i] = { 'id': signatures[i].description + '__' + i.toString(), 'children': [] };            
            for (let j = 0; j < signatures[i].marks.length; j++) {
                const type = signatures[i].marks[j].type;
                if (type == "call") {
                    let id = signatures[i].marks[j].call.api;
                    id += "(";
                    const args = signatures[i].marks[j].call.arguments;
                    for (const [k, v] of Object.entries(args)) id += " " + v;
                    id += " )";        
                    data.children[i].children[j] = { 'id': id + '__' + i.toString() + j.toString()};
                    /* data.children[i].children[j] = { 'id': JSON.stringify(signatures[i].marks[j]) + '__' + i.toString() + j.toString()}; */
                }
                else if (type == "ioc")                
                    data.children[i].children[j] = { 'id': JSON.stringify(signatures[i].marks[j]) + '__' + i.toString() + j.toString()};
                else
                    data.children[i].children[j] = { 'id': JSON.stringify(signatures[i].marks[j]) + '__' + i.toString() + j.toString() };
            }
        }
        return data;
    })()

    /**
     * state
     */
    const [isLoading, setIsLoading] = useState(true); // is the preprocessing finished?

    /**
     * effects
     */
    useEffect(() => { // 处理signature到图信息，以及处理ttp msg
        if (!signatures) {
            setIsLoading(true); // 原报告中没有signature信息
        }
        else {
            // data = preprocessing(signatures);
            for (let i = 0; i < signatures.length; i++) {
                let ttp = signatures[i].ttp;
                for (let k in ttp) {
                    ttp_msg_list.push({ 'stage': k, 'long': ttp[k].long, 'short': ttp[k].short });
                }
            }
            setIsLoading(false);
        }
    }, []);

    return (
        <div>
            {isLoading ?
                <Spin />
                :
                signatures ?
                    <>
{/*                         <Card title="攻击行为图" >
                            <Graphin data={data} layout={{ name: 'dagre' }} />
                        </Card> */}
                        <Card title="攻击行为图">
                            <B data={data} />
                        </Card>
                        <Card title="预警信息">
                            {/*                   <Space direction="vertical">
                        {ttp_msg_list.map(ttp => (
                            <>
                                <Alert type="warning" message={ttp.stage + " short: " + ttp.short} /> 
                                <Alert type="warning" message={ttp.long} />
                            </>
                        ))}
                    </Space> */}
                            <Table title={() => "TTP阶段分析"} dataSource={ttp_msg_list} columns={config.ttp_table_columns} />
                        </Card>
                    </>
                    :
                    <Alert type="warning" message="暂无预警信息" />
            }
        </div>
    )
}