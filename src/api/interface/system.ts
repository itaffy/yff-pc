import { ReqPage } from './index'

// 用户账号模块
export namespace UserAccount {
  export interface ReqUserAccountParams extends ReqPage {
    userName: string
    userPhone: number
  }
  export interface ResUserAccountList {
    Id: number
    AddTime: string
    CustomerId: number
    IdentityID: number
    PrecinctNames: string
    RoleNames: string
    Sex: string
    State: boolean
    UserName: number
    UserPhone: string
  }
  export interface AddUserAccountForm {
    Id: number | string | undefined
    UserName: string
    UserPhone: string
    Sex: string
    PassWord: string
    userRole: number | string
    areaAuth: number | string
    RoleIds: string
    PrecinctIds: string
  }
  export interface ResUserRoleList {
    Id: number
    Name: string
    Text: string
    Explan: string
    AddTime: string
    State: boolean
    CustomerId: number
    MenuIds: string | Array<[]>
    BigMenuIds: string | Array<[]>
    AppMenuIds: string | Array<[]>
    AppBigMenuIds: string | Array<[]>
    DisableRole: boolean
    EnableRole: boolean
  }
  export interface ResUserAreaAuthList {
    Id: number
    Name: string
    Explan: string
    State: boolean
    AreaIds: string
    BigAreaIds: string
    CustomerID: number
    AddID: number
    AddTime: string
    UpdateID: number
    UpdateTime: string
  }
  export interface UpdateUserAccountForm {
    Id: number
    UserName: string
    UserPhone: string
    Sex: string
    AddTime: string
    State: boolean
    CustomerId: number
    Roles: ResUserRoleList[]
    Precincts: ResUserAreaAuthList[]
    PassWord: string
    RoleIds: string
    PrecinctIds: string
    IdentityID: number
  }

  export interface ResStatus {
    userLabel: string
    userValue: number
  }
  export interface ResGender {
    genderLabel: string
    genderValue: number
  }
  export interface ResDepartment {
    id: string
    name: string
    children?: ResDepartment[]
  }
  export interface ResRole {
    id: string
    name: string
    children?: ResDepartment[]
  }
}
