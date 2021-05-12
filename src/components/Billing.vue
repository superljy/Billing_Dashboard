<template>
  <div>
    <!-- 本月商品整体售出,支出价钱总和与计算得出的利润值展示 -->
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-orange">
          本月支出: {{ countPay }}
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-green">
          本月收入:{{ countEarn }}
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-blue">
          本月利润: {{ countEarn - countPay }}
        </div></el-col
      >
    </el-row>
    <!-- 新增商品信息按钮 -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="formVisible = true"
      style="float: right"
      >添加</el-button
    >
    <!-- 弹出的dialog嵌套表单 实现弹出对话框输入新商品信息并提交 -->
    <el-dialog title="新增商品信息" :visible.sync="formVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            type="date"
            v-model="form.date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="尺码" :label-width="formLabelWidth" prop="size">
          <el-input v-model="form.size" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售出价格" :label-width="formLabelWidth">
          <el-input v-model="form.sellPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家发货单号" :label-width="formLabelWidth">
          <el-input v-model="form.express" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在仓库位置" :label-width="formLabelWidth">
          <el-input v-model="form.store" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <p class="success" v-show="addSuccess">添加成功</p>
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="addData('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 已写入的数据信息展示 -->
    <el-table :data="billingData">
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="name" label="商品名称" width="360">
      </el-table-column>
      <el-table-column prop="size" label="尺码" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="express" label="商家发货单号" width="220">
      </el-table-column>
      <el-table-column prop="sellPrice" label="售出价格" width="80">
      </el-table-column>
      <el-table-column prop="store" label="仓库位置" width="220">
      </el-table-column>
      <!-- 操作: 编辑和删除按钮 -->
      <el-table-column label="操作">
        <div slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="itemEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="itemDelete(scope.$index, scope.row)"
          ></el-button>
        </div>
      </el-table-column>
    </el-table>
    <!-- 点击编辑后的弹出的表单 -->
    <el-dialog title="修改商品信息" :visible.sync="editFormVisible">
      <el-form :model="form" ref="editData">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            v-model="editData.date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="尺码" :label-width="formLabelWidth">
          <el-input v-model="editData.size" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="editData.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售出价格" :label-width="formLabelWidth">
          <el-input v-model="editData.sellPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家发货单号" :label-width="formLabelWidth">
          <el-input v-model="editData.express" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在仓库位置" :label-width="formLabelWidth">
          <el-input v-model="editData.store" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemEditReset">取 消</el-button>
        <el-button type="primary" @click="submitEidt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
export default {
  data() {
    return {
      billingData: [],
      editData: {},
      countPay: null,
      countEarn: null,
      formVisible: false,
      editFormVisible: false,
      form: {
        month: "",
        date: "",
        name: "",
        size: "",
        price: 0,
        sellPrice: 0,
        express: "",
        store: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: [{
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }],
        date: [{
          required: true,
          message: '请输入购买日期'
        }],
        size: [{
          required: true,
          message: '请输入尺码',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入购买的价格',
          trigger: 'blur'
        }]
      },
      addSuccess: false,
      editSuccess: false
    }
  },
  mounted() {
    //页面挂载成功后执行一次数据获取
    this.getBilling()
  },
  watch: {
    //监听路由变化执行获取数据并刷新页面的操作
    $route(to, from) {
      this.getBilling()
    },
    formVisible(newValue, oldValue) {
      if (newValue === false) {
        this.addSuccess = false
      }
    }
  },
  methods: {
    //获取对应路由名称的数据内容
    getBilling() {
      axios.get(`/billings?month=${this.$route.name}`).then((res) => {
        this.billingData = res.data
        this.payTotal()
        this.earnTotal()
        this.form.month = this.$route.name //页面挂在好读取数据时即把当前路由的月份写进form中,保证在本路由下的页面所提交的数据都是这一个月份的数据
      })
    },
    //支出计算
    payTotal() {
      let countArr = [];
      if (this.billingData.length !== 0) {
        this.billingData.forEach((item) => {
          countArr.push(parseFloat(item.price))
        })
        //reduce计算数组内数字的总和
        this.countPay = countArr.reduce((acc, curr) => {
          return acc + curr
        })
      }

    },
    //收入计算
    earnTotal() {
      let countArr = [];
      if (this.billingData.length !== 0) {
        this.billingData.forEach((item) => {
          countArr.push(parseFloat(item.sellPrice))
        })
        this.countEarn = countArr.reduce((acc, curr) => {
          return acc + curr
        })
      }
    },
    //新增数据
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/add', { data: this.form }).then((res) => {
            if (res.status === 200) {
              this.addSuccess = true
            }
            this.$refs[formName].resetFields()
            this.form.sellPrice = ""
            this.form.express = ""
            this.getBilling()
          })
        } else {
          console.log('error')
          return false
        }
      })

    },
    //新增栏取消按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.sellPrice = 0
      this.form.express = ""
      this.form.store = ""
      this.formVisible = false
    },
    //修改
    itemEdit(index, row) {
      this.editFormVisible = true
      this.editData = row
      this.editData.index = index
      this.editData.month = this.$route.name //点击编辑后 将该条信息的月份数据变成当前路由下的月份 确保月份正确
    },
    //编辑弹窗确定按钮
    submitEidt() {
      axios.post('/edit', { data: this.editData }).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.getBilling()
          this.editFormVisible = false
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //编辑栏取消按钮
    itemEditReset() {
      this.editFormVisible = false
    },
    //删除数据
    itemDelete(index, row) {
      console.log(index, row)
      axios.delete('/delete', { data: { id: index, month: this.$route.name } }).then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          this.getBilling()
        }
      })
    }
  }
}

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-orange {
  background: #e6a23c;
}
.bg-green {
  background: #67c23a;
}
.bg-blue {
  background: #409eff;
}
.grid-content {
  border-radius: 4px;
  min-height: 106px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f9fafc;
  font-size: 24px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.success {
  display: inline-block;
  color: crimson;
  margin-right: 50px;
}
</style>