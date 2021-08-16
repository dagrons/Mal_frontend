import { get, post } from "../axios";

// 数据面板
export const getDashboard = () => get("/feature/dashboard");

// 分析报告
export const getReport = (id) => get(`/feature/report/get/${id}`);

// 任务队列
export const getRunningList = () => get('/task/running_list');
export const getStatus = (id) => get(`/task/status/${id}`);
export const getPendingList = () => get('/task/pending_list');  
