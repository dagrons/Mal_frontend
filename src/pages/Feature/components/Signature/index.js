import { Alert, Card, Spin, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import "@antv/graphin-components/dist/index.css"; // Graphin 组件 CSS

import { ReportContext } from "../../context";
import B from "./components/BehaviorGraph";

import "./index.scss";

export default () => {
  const { _id: id, signatures } = useContext(ReportContext);
  const [isLoading, setIsLoading] = useState(true); // is the preprocessing finished?
  const [bData, setBData] = useState(null);
  const [TTPMsg, setTTPMsg] = useState([]);

  useEffect(() => {
    setBData(
      // 处理signature到图信息，以及处理ttp msg
      (function make_tree() {
        const data = { id: id, children: [] };
        for (let i = 0; i < signatures.length; i++) {
          if (signatures[i].marks.length == 0)
            data.children[i] = {
              id: signatures[i].description + "__" + i.toString(),
            };
          else
            data.children[i] = {
              id: signatures[i].description + "__" + i.toString(),
              children: [],
            };
          for (let j = 0; j < signatures[i].marks.length; j++) {
            const type = signatures[i].marks[j].type;
            if (type == "call") {
              let id = signatures[i].marks[j].call.api;
              id += "(";
              const args = signatures[i].marks[j].call.arguments;
              for (const [k, v] of Object.entries(args)) id += " " + v;
              id += " )";
              data.children[i].children[j] = {
                id: id.slice(0, 400) + "__" + i.toString() + j.toString(),
              };
              /* data.children[i].children[j] = { 'id': JSON.stringify(signatures[i].marks[j]) + '__' + i.toString() + j.toString()}; */
            } else if (type == "ioc")
              data.children[i].children[j] = {
                id:
                  JSON.stringify(signatures[i].marks[j]).slice(0, 400) +
                  "__" +
                  i.toString() +
                  j.toString(),
              };
            else
              data.children[i].children[j] = {
                id:
                  JSON.stringify(signatures[i].marks[j]).slice(0, 400) +
                  "__" +
                  i.toString() +
                  j.toString(),
              };
          }
        }
        return data;
      })()
    );
    if (!signatures) {
      setIsLoading(true); // 原报告中没有signature信息
    } else {
      // data = preprocessing(signatures);
      let ttp_msg_list = [];
      for (let i = 0; i < signatures.length; i++) {
        let ttp = signatures[i].ttp;
        for (let k in ttp) {
          ttp_msg_list.push({
            stage: k,
            long: ttp[k].long,
            short: ttp[k].short,
          });
        }
      }
      setTTPMsg(ttp_msg_list);
      setIsLoading(false);
    }
  }, []);

  const propsTable = {
    title: () => "TTP阶段分析",
    dataSource: TTPMsg,
    columns: [
      {
        title: "阶段",
        dataIndex: "stage",
      },
      {
        title: "简介",
        dataIndex: "short",
      },
      {
        title: "描述",
        dataIndex: "long",
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : signatures ? (
        <>
          <Card title="攻击行为图">
            <B data={bData} />
          </Card>
          <Card title="预警信息">
            <Table {...propsTable} />
          </Card>
        </>
      ) : (
        <Alert type="warning" message="暂无预警信息" />
      )}
    </div>
  );
};
