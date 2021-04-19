/**
 * libs
 */
import { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

/**
 * unpack
 */
const { Dragger } = Upload;

/**
 * use forceUpdate() in functional components 
 */
function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

/**
 * let's go
 */
export default () => {
    const forceUpdate = useForceUpdate();

    /**
     * config for dragger
     */
    const props = {
        name: 'file',
        multiple: true,
        action: '/tasks/create',
        onChange(info) {        
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                // 刷新任务列表
                if (info.file.response.status != 'success') {
                    message.error('file type is not pe');
                }
                info.fileList.forEach((it) => {
                    if (it.response) {
                        it.url = '/#/feature/' + it.response.filename;
                        if (it.response.status != "success") {
                            it.status = 'error';
                        }
                    }
                })
                message.success(`'${info.file.name}' file uploaded successfully.`);
            }
            else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }        
            forceUpdate();
        },
    }

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