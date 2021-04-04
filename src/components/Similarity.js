/**
 * libs
 */
import React, { useContext, useEffect, useState } from 'react';
import { Row, Divider, Typography, Spin } from 'antd';
import Graphin, { Utils } from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

/**
 * local components 
 */
import { REPORT } from '../pages/Feature';

/**
 * unpack
 */
const { Title, Paragraph } = Typography;

/**
 * actions
 */
function preprocessing(id, sim) { // 从sim中构造节点和边信息
    const data = Utils.mock(sim.length + 1)
        .circle()
        .graphin();
    data.nodes[0].label = id;

    for (let i = 1; i < sim.length + 1; i++) {
        data.nodes[i].label = sim[i - 1][0];
    }

    for (let i = 0; i < sim.length; i++) {
        data.edges[i].source = 'node-0';
        data.edges[i].target = 'node-' + (i + 1).toString();
        data.edges[i].label = sim[i][1];
    }
    data.edges = data.edges.slice(0, sim.length);
    return data;
}

let gdata = null;

/**
 * let's go
 */
export default () => {

    /**
     * unpack from context
     */
    const sim = useContext(REPORT).local.asm_res.sim;
    const id = useContext(REPORT)._id;

    /**
     * state
     */
    const [isLoading, setIsLoading] = useState(true); // is the gdata loaded?

    /**
     * effects
     */
    useEffect(() => {
        gdata = preprocessing(id.length, sim);
        setIsLoading(false);
    }, []);

    /**
     * ui
     */
    return (
        <div>
            <Row>
                <Title level={5}>同源分析结果</Title>
                {isLoading?
                    <Spin />
                    :
                    <Graphin
                        data={gdata}
                        layout={{ name: 'force', options: { preset: 'concentric' } }}
                    />
                }
            </Row>
            <Divider>模型描述</Divider>
            <Row>
                <Paragraph>
                    恶意代码同源分析基于Doc2Vec，将第一阶段的恶意代码样本经过基因特征提取模型得到的opcode切片为若干语义序列，划分为若干恶意语义句。经过Doc2Vec模型将恶意代码编码为低纬度高层级的抽象语义信息，组合所有的语义向量，在向量空间中寻找分布程度最为接近的恶意代码样本。根据同源分析的结果，系统可以找出关联程度最高的样本，并根据样本之间的时间节点做出攻击推定。
                </Paragraph>
            </Row>
        </div>
    );
}