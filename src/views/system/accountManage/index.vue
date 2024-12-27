<template>
  <div class="card content-box">
    <div class="table-box">
      <ProTable ref="proTable" :columns="columns" :request-api="getUserAccountList" :data-callback="dataCallback">
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
          <!-- <el-button type="primary" :icon="Download" plain @click="downloadFile">导出</el-button> -->
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <!-- <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button> -->
        </template>
      </ProTable>
      <UserAccountDrawer ref="drawerRef" />
    </div>
  </div>
</template>

<script setup lang="ts" name="accountManage">
import { ref, reactive } from 'vue'
import ProTable from '@/components/ProTable/index.vue'
import { ProTableInstance, ColumnProps } from '@/components/ProTable/interface'
import { UserAccount } from '@/api/interface/system'
// import { ElMessage } from 'element-plus'
import { CirclePlus, EditPen } from '@element-plus/icons-vue'
import { getUserAccountList, updateUserAccount } from '@/api/modules/system'
import UserAccountDrawer from '@/views/system/accountManage/UserAccountDrawer.vue'
// ProTable 实例
const proTable = ref<ProTableInstance>()

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
// const initParam = reactive({
//   userName: '',
//   userPhone: ''
// })

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.Data,
    total: data.TotalCount
  }
}

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
// const getTableList = (params: any) => {
//   let newParams = JSON.parse(JSON.stringify(params))
//   console.log('newParams', newParams)
//   // newParams.createTime && (newParams.startTime = newParams.createTime[0])
//   // newParams.createTime && (newParams.endTime = newParams.createTime[1])
//   // delete newParams.createTime
//   return getUserAccountList(newParams)
// }

// 表格配置项
const columns = reactive<ColumnProps<UserAccount.ResUserAccountList>[]>([
  { type: 'index', label: '序号', width: 70 },
  { prop: 'UserName', label: '用户名', search: { el: 'input' } },
  { prop: 'UserPhone', label: '手机号码', search: { el: 'input' } },
  { prop: 'RoleNames', label: '角色名称' },
  { prop: 'PrecinctNames', label: '区域权限' },
  { prop: 'State', label: '状态' },
  { prop: 'AddTime', label: '添加时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
])

const drawerRef = ref<InstanceType<typeof UserAccountDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<UserAccount.AddUserAccountForm> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title ? updateUserAccount : undefined,
    getTableList: proTable.value?.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
