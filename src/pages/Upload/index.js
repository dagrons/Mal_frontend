import { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default () => {
  const { Dragger } = Upload;
  const forceUpdate = useForceUpdate(); // 为了让文件列表实时刷新

  function useForceUpdate() {
    const [_, setValue] = useState(0);
    return () => setValue((value) => value + 1);
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
      <Dragger {...propsDragger}>
        <p className="ant-uploading-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          🐱‍🚀Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          👀当文件上传完毕，点击下方链接即可查看任务状态
        </p>
      </Dragger>
    </>
  );
};
