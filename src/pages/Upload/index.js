import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Upload, message, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "./index.scss";

export default () => {
  const { Title } = Typography;
  const { Dragger } = Upload;
  const forceUpdate = useForceUpdate(); // 为了让文件列表实时刷新
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("recentTasks") !== null) {
      setRecentTasks(JSON.parse(localStorage.getItem("recentTasks")));
    }
  }, recentTasks);

  function useForceUpdate() {
    const [_, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }

  function clearHistory() {
    localStorage.clear();
    setRecentTasks([]);
  }

  const propsDragger = {
    name: "file",
    multiple: true,
    action: "/task/create",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`'${info.file.name}' file uploaded successfully.`);
        if (info.file.response.status != "success") {
          message.error("server side error");
        } else {
          localStorage.setItem(
            "recentTasks",
            JSON.stringify([
              { name: info.file.name, md5: info.file.response.filename },
              ...recentTasks,
            ])
          );
          setRecentTasks([
            { name: info.file.name, md5: info.file.response.filename },
            ...recentTasks,
          ]);
        }
        info.fileList.forEach((it) => {
          if (it.response) {
            it.url = "/#/feature/" + it.response.filename;
            if (it.response.status != "success") {
              it.status = "error";
            }
          }
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      forceUpdate(); // 保证刷新文件列表
    },
  };

  return (
    <>
      {/* 文件上传区 */}
      <Dragger className="upload-my-dragger" {...propsDragger}>
        <p className="upload-icon">
          <InboxOutlined />
        </p>
        <p className="upload-text">📤点击或拖入文件进行分析</p>
        <p className="upload-hints">
          🖱当文件上传完毕，点击下方链接即可查看任务状态
        </p>
      </Dragger>
      <Title level={3} class="upload-recent-tasks-title">
        最近上传任务
        <button class="upload-clear-history-button" onClick={clearHistory}>
          清空历史记录
        </button>
      </Title>
      <ul>
        {recentTasks.map((it) => (
          <li>
            <Link to={"feature/" + it.md5}>{it.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
