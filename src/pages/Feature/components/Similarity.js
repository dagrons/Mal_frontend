import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Table, Divider, Typography, Spin } from "antd";
import Graphin, { Utils } from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // 引入Graphin CSS

import { ReportContext } from "../context";

export default () => {
  const { Title, Paragraph } = Typography;
  const { five_most_like: sim, _id: id } = useContext(ReportContext);
  const [isLoading, setIsLoading] = useState(true); // is the gdata loaded?
  const [graphinData, setGraphinData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    let tdata = [];
    for (const t of sim) {
      tdata.push({ name: t[0], value: t[1].toString() });
    }
    setGraphinData(preprocessing(id.length, sim));
    setTableData(tdata);
    setIsLoading(false);
  }, []);

  const propsTable = {
    dataSource: tableData,
    columns: [
      {
        title: "样本ID",
        dataIndex: "name",
        key: "name",
        render: (name) => (
          <Link target={"_blank"} to={"/feature/" + name}>
            {name}
          </Link>
        ),
      },
      {
        title: "相似度",
        dataIndex: "value",
        key: "value",
      },
    ],
  };

  function preprocessing(id, sim) {
    // 从sim中构造节点和边信息
    const data = Utils.mock(sim.length + 1)
      .circle()
      .graphin();
    data.nodes[0].label = id;

    for (let i = 1; i < sim.length + 1; i++) {
      data.nodes[i].label = sim[i - 1][0];
    }

    for (let i = 0; i < sim.length; i++) {
      data.edges[i].source = "node-0";
      data.edges[i].target = "node-" + (i + 1).toString();
      data.edges[i].label = sim[i][1].toString().slice(0, 4);
    }
    data.edges = data.edges.slice(0, sim.length);
    return data;
  }

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <div>
          <Row>
            <Title level={5}>同源分析结果</Title>
            <Graphin
              data={graphinData}
              layout={{ name: "force", options: { preset: "concentric" } }}
            />
          </Row>
          <Table {...propsTable} />
        </div>
      )}
      <Divider>模型描述</Divider>
      <Row>
        <Paragraph>
          恶意代码同源分析基于Doc2Vec，将第一阶段的恶意代码样本经过基因特征提取模型得到的opcode切片为若干语义序列，划分为若干恶意语义句。经过Doc2Vec模型将恶意代码编码为低纬度高层级的抽象语义信息，组合所有的语义向量，在向量空间中寻找分布程度最为接近的恶意代码样本。根据同源分析的结果，系统可以找出关联程度最高的样本，并根据样本之间的时间节点做出攻击推定。
        </Paragraph>
      </Row>
    </div>
  );
};
