import http from "../axios";
import { queryParams } from "../tools/util";

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {String} token
 */
export function login(username, password) {
  return http.post("/admin/login", {
    username,
    password,
  });
}

export function getinfo() {
  return http.post("/admin/getinfo");
}

export function logout() {
  return http.post("/admin/logout");
}

export function updatepassword(data) {
  return http.post("/admin/updatepassword", data);
}

export function getManagerList(page, query = {}) {
  let r = queryParams(query);
  return http.get(`/admin/manager/${page}${r}`);
}

/**
 * 修改管理员状态
 * @param {Number} id 管理员ID
 * @param {Number} status 是否启用：0禁用1启用
 * @returns
 */
export function updateManagerStatus(id, status) {
  return http.post(`/admin/manager/${id}/update_status`, {
    status,
  });
}

export function createManager(data) {
  return http.post(`/admin/manager`, data);
}

export function deleteManager(id) {
  return http.post(`/admin/manager/${id}/delete`);
}

export function updateManager(id, data) {
  return http.post(`/admin/manager/${id}`, data);
}
