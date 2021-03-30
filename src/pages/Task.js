/**
 * libs
 */
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

/**
 * unpack
 */
const { Dragger } = Upload;

/**
 * config for dragger
 */
const props = {
    name: 'file',
    mutiple: true,
    action: '/tasks/create',
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            info.fileList[info.fileList.length - 1].url = '/#/feature/' + info.file.response.filename;
            message.success(`'${info.file.name}' file uploaded successfully.`);
        }
        else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

export default () => {
    return (
        <>
            {/* 文件上传区 */}
            <Dragger {...props}>
                <p className="ant-uploading-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">🐱‍🚀Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    👀当文件上传完毕，点击下方链接即可查看任务状态
	        </p>
            </Dragger>
        </>
    )
}