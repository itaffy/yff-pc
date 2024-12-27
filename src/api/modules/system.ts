import { ResPage } from '@/api/interface/index'
import { UserAccount } from '@/api/interface/system'
import http from '@/api'

// 获取用户账号列表
export const getUserAccountList = (params: UserAccount.ReqUserAccountParams) => {
  return http.get<ResPage<UserAccount.ResUserAccountList>>(`/User/GetList`, params)
}

// 获取用户角色下拉列表
export const getUserRoleList = () => {
  return http.get<ResPage<UserAccount.ResUserRoleList>>(`/User/GetRoleList`)
}

// 获取用户区域权限下拉列表
export const getUserAreaAuth = () => {
  return http.get<UserAccount.ResUserAreaAuthList>(`/User/GetAreaPermissionsList`)
}

// 添加/编辑
export const updateUserAccount = (params: UserAccount.UpdateUserAccountForm) => {
  return http.post('/User/Edit', params)
}
