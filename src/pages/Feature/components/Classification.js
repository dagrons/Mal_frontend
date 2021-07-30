import React, { useContext, useEffect } from "react";
import { Pie, Bar } from "@antv/g2plot";
import { Row, Col, Divider, Space, Typography } from "antd";

import { ReportContext } from "../context";

export default () => {
  const { Title, Paragraph } = Typography;
  const report = useContext(ReportContext);

  useEffect(() => {
    let pr = report.local.malware_classification_resnet34;
    let prob = [];
    for (const [k, v] of Object.entries(pr)) {
      prob.push({ type: k, value: v });
    }
    const piePlot = new Pie("pie", {
      appendPadding: 10,
      data: prob,
      angleField: "value",
      colorField: "type",
      radius: 0.75,
      label: {
        type: "spider",
        labelHeight: 28,
        content: "{name}\n{percentage}",
      },
      interactions: [{ type: "element-selected" }, { type: "element-active" }],
    });
    piePlot.render();
    const barPlot = new Bar("bar", {
      data: prob,
      xField: "value",
      yField: "type",
      seriesField: "type",
      legend: {
        position: "top-left",
      },
    });
    barPlot.render();
  }, []);

  /**
   * ui
   */
  return (
    <div>
      <Row>
        <Col span={12}>
          <Title level={5}>视觉Transformer家族分类概率柱状图</Title>
          <div id="bar"></div>
        </Col>

        <Col span={11}>
          <Title level={5}>视觉Transformer家族分类概率饼图</Title>
          <div id="pie"></div>
        </Col>
      </Row>

      <Divider>模型描述</Divider>

      <Row>
        <Col span={21}>
          <Paragraph>
            上述结果通过基于视觉Transformer的家族分类模型得到，将恶意代码基因特征提取模型得到的恶意代码图像分割为若干大小相同的语义切片，进行编码后送入视觉Transformer模型，应用自注意力机制对同一恶意代码家族中具有恶意语义的潜在图像语义信息进行关联，能够稳定高效的对恶意代码家族做出判断
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};
