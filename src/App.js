import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Feature from "./pages/Feature";
import Prolayout from "./layouts/prolayout";

import "./App.scss";

export default () => {
  return (
    <Switch>
      {/* 文件上传页面 */}
      <Route path="/upload">
        <Prolayout>
          <Upload />
        </Prolayout>
      </Route>
      {/* 特征展示页面 */} {/* 特征展示页面使用自己的布局 */}
      <Route path="/feature/:id">
        <Feature />
      </Route>
      {/* 数据面板页面 */}
      <Route path="/">
        <Prolayout>
          <Dashboard />
        </Prolayout>
      </Route>
    </Switch>
  );
};
