<template>
  <div class="channel">
    <div style="margin-bottom:20px;">
      <el-button @click="dialogFormVisible=true">新建渠道商</el-button>
    </div>
    <el-table
      :data="channelList.list"
      border
      style="width: 100%">
      <el-table-column
        prop="channelName"
        label="商户名称">
      </el-table-column>

      <el-table-column
        prop="contact"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="info"
        label="介绍">
      </el-table-column>
      <el-table-column
        width="300"
        label="操作">
        <template slot-scope="scope">
          <el-button  size="small" @click="editShop(scope.row)">编辑</el-button>
          <el-button  size="small" @click="rmShop(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px; text-align:center;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        layout="prev, pager, next"
        :total="channelList.total">
      </el-pagination>
    </div>
    <el-dialog @closed="dialogClose" width="500px" :title="dialogTitle?'新建渠道商':'编辑渠道商'" :visible.sync="dialogFormVisible" center>
      <el-form :rules="channelRule" :model="channelForm" ref="channelForm">
        <el-form-item prop="channelName" label="渠道商名称：" :label-width="formLabelWidth" >
          <el-input v-model="channelForm.channelName"></el-input>
        </el-form-item>
        <el-form-item  prop="contact" label="联系方式：" :label-width="formLabelWidth" >
          <el-input type="textarea" v-model="channelForm.contact"></el-input>
        </el-form-item>
        <el-form-item prop="info" label="介绍：" :label-width="formLabelWidth" >
          <el-input type="textarea" v-model="channelForm.info"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="subFlag" type="primary" @click="addShop('channelForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'channel',
    props: {
      manage: Object
    },
    computed: {
      ...mapGetters({
        channelList: 'channelList'
      })
    },
    data() {
      return {
        pageNum: 1,
        dialogFormVisible: false,
        copyForm: {},
        subFlag: false,
        formLabelWidth: '120px',
        dialogTitle: true,
        channelForm: {
          channelName: '',
          contact: '',
          info: '',
          id: ''
        },
        channelRule: {
          channelName: [
            { required: true, message: '请输入渠道商名称', trigger: 'blur' }
          ],
          info: [
            { required: true, message: '请输入介绍信息', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.getList()
      this.copyForm = Object.assign({}, this.channelForm);
    },
    methods: {
      addShop(form) {
        this.subFlag = true;
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$store.dispatch('postChannelList', this.channelForm).then(() => {
              this.subFlag = false;
              [this.dialogFormVisible, this.dialogTitle] = [false, true];
              this.$refs[form].resetFields();
              this.$message.success('提交成功');
              this.getList()
            }).catch();
          } else {
            this.subFlag = false;
            this.$message({
              type: 'error',
              message: '请输入正确信息'
            });
          }
        })
      },
      editShop(row) {
        this.channelForm = Object.assign({}, row);
        [this.dialogFormVisible, this.dialogTitle] = [true, false];
      },
      rmShop(n) {
        this.$confirm('此操作将删除该渠道商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteChannelList', n).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          })
        })
      },
      getList() {
        this.$store.dispatch('getChannelList', `?orderBy=created_at desc&pageNum=${this.pageNum}&pageSize=20`);
      },
      handleCurrentChange(v) {
        this.pageNum = v
        this.getList()
      },
      dialogClose() {
        this.channelForm = Object.assign({}, this.copyForm)
        this.dialogTitle = true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .channel{
    padding: 20px;
  }
</style>
