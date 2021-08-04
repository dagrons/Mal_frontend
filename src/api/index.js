import { get, post } from "../axios";

// 数据面板
export const getDashboard = () => get("/feature/dashboard");

// 分析报告
export const getReport = (id) => get(`/feature/report/get/${id}`);
