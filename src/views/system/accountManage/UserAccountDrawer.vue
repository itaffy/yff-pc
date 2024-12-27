<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="手机号码" prop="UserPhone">
        <el-input v-model="drawerProps.row!.UserPhone" placeholder="请填写用户手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="Sex">
        <el-select v-model="drawerProps.row!.Sex" placeholder="请选择性别" clearable>
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" prop="UserName">
        <el-input v-model="drawerProps.row!.UserName" placeholder="请填写用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="PassWord">
        <el-input v-model="drawerProps.row!.PassWord" placeholder="请填写密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="userRole">
        <el-select v-model="drawerProps.row!.userRole" clearable placeholder="请选择" multiple>
          <el-option v-for="item in roleOptions" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="区域权限" prop="areaAuth">
        <el-select v-model="drawerProps.row!.areaAuth" clearable placeholder="请选择" multiple>
          <el-option v-for="item in areaAuthOptions" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { UserAccount } from '@/api/interface/system'
import { getUserRoleList, getUserAreaAuth } from '@/api/modules/system'

const rules = reactive({
  avatar: [{ required: true, message: '请上传用户头像' }],
  photo: [{ required: true, message: '请上传用户照片' }],
  username: [{ required: true, message: '请填写用户姓名' }],
  gender: [{ required: true, message: '请选择性别' }],
  idCard: [{ required: true, message: '请填写身份证号' }],
  email: [{ required: true, message: '请填写邮箱' }],
  address: [{ required: true, message: '请填写居住地址' }]
})

let roleOptions = reactive<UserAccount.ResUserRoleList[]>([])
let areaAuthOptions = reactive<UserAccount.ResUserAreaAuthList[]>([])

interface DrawerProps {
  title: string
  isView: boolean
  row: Partial<UserAccount.AddUserAccountForm>
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}

const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  row: {}
})

// 接收父组件传过来的参数
const acceptParams = async (params: DrawerProps) => {
  drawerProps.value = params
  drawerVisible.value = true
  getUserRoleHandler()
  // getUserAreaAuthHandler()
}

const getUserRoleHandler = async () => {
  const { data } = await getUserRoleList()
  console.log(data)
  roleOptions = data
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams
})
</script>
