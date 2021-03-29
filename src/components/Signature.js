/**
 * libs
 */
import { Alert, Space, Card, Spin, message } from 'antd';
import Graphin, { Utils } from '@antv/graphin';

import { useContext, useEffect, useState } from 'react';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

/**
 * local components 
 */
import { REPORT } from '../pages/Feature';
import './Signature.css';

/**
 * local attrs
 */
let data = null;
let ttp_msg_list = [];

/**
 * utils
 */
function preprocessing(signatures) { // construct tree nodes and egdes information from signatures
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
}

export default () => {
    /**
     * variable defined here should be evaluated whenever it was rendered()
     */

    /**
     * unpack from context
     */
    const signatures = useContext(REPORT).cuckoo.signatures;

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
            data = preprocessing(signatures);
            for (let i = 0; i < signatures.length; i++) {
                let ttp = signatures[i].ttp;
                for (let k in ttp) {
                    ttp_msg_list.push({ 'stage': k, 'msg': ttp[k] });
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
                signatures?
            <>
                <Card title="攻击行为图" >
                    <Graphin data={data} layout={{ name: 'dagre' }} />
                </Card>
                <Card title="预警信息">
                    <Space direction="vertical">
                        {ttp_msg_list.map(ttp => (
                            <>
                                {/*<Alert type="warning" message={ttp.stage + " short: " + ttp.msg.short} /> */}
                                <Alert type="warning" message={ttp.msg.long} />
                            </>
                        ))}
                    </Space>
                </Card>
            </>
                    :
            <Alert type="warning" message="暂无预警信息" />
            }
        </div>
    )
}