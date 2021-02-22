import React from 'react';
import {Row, Col, Image, Layout, Menu, Upload, Input, message} from 'antd';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import {InboxOutlined, CloudUploadOutlined} from '@ant-design/icons';

import 'antd/dist/antd.min.css'

const {Header, Content, Footer} = Layout;
const {Dragger} = Upload;
const {Search} = Input;
const {SubMenu} = Menu;

const props = {
  name: 'file',
  mutiple: true,
  action: '/tasks/create', 
  onChange(info) { // 😆注意，this in onChange此时绑定的是props，而不是Dragger
    const {status} = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      info.fileList[info.fileList.length-1].url = '/feature/show/' + info.file.response.filename;
      message.success(`'${info.file.name}' file uploaded successfully.`);
    }
    else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
}

class App extends React.Component { // wrapper for Dragger to handling polling
  componentDidMount() {
    /* TODO: 此处设计比较奇葩，原因是在onChange中，无法与Dragger通信，
     * 也就是说，onChange中set url时，由于无法与Dragger通信，也就无法触发重新渲染事件，因此，需要在App中进行polling渲染😂 */
    setInterval(this.forceUpdate.bind(this), 500);
  }
  render() {
    return (
      <Layout className="layout" theme="light">
      <Header
      style={{
	background: '#fff'
      }}
      >
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="2"><CloudUploadOutlined style={{fontSize: "16px"}}/>文件上传</Menu.Item>
      <Menu.Item key="3" style={{float: 'right'}}>
      <div
      style={{
        textAlign: 'right',
        height: '64px',
        lineHeight: '64px',
        padding: '0 32px',
        width: '400px',
      }}
        >
      <HeaderSearch
      placeholder="🐱‍🐉特征搜索"
      dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
      onSearch={value => {
        console.log('input', value); // eslint-disable-line
      }}
      onPressEnter={value => {
	let url = '/feature/show/' + value;
	window.open(url);
        console.log('enter', value); // eslint-disable-line
      }}
      />
      </div>
      </Menu.Item>
      </Menu>
      </Header>
      <Content style={{padding: '50px 50px 400px 50px'}}>
      <Dragger {...props}> 
      <p className="ant-uploading-drag-icon">
      <InboxOutlined />
      </p>
      <p className="ant-upload-text">🐱‍🚀Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
      👀当文件上传完毕，点击下方链接即可查看任务状态
      </p>
      </Dragger>
      </Content>
      <Footer style={{textAlign: 'center'}}>
      🐱‍🏍Mal is a platform for malware analysis
      </Footer>
      </Layout>
    );
  }
}

export default App;
