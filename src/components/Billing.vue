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
    <!-- dialog嵌套表单 实现弹出对话框输入新商品信息并提交 -->
    <el-dialog title="新增商品信息" :visible.sync="formVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="尺码" :label-width="formLabelWidth">
          <el-input v-model="form.size" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售出价格" :label-width="formLabelWidth">
          <el-input v-model="form.sellPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家发货单号" :label-width="formLabelWidth">
          <el-input v-model="form.express" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="formVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 已写入的数据信息展示 -->
    <el-table :data="billingData">
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="size" label="尺码" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="sellPrice" label="售出价格" width="80">
      </el-table-column>
      <el-table-column prop="express" label="商家发货单号" width="220">
      </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      billingData: [],
      countPay: null,
      countEarn: null,
      formVisible: false,
      form: {
        month: "",
        date: "",
        name: "",
        size: "",
        price: "",
        sellPrice: "",
        express: ""
      },
      formLabelWidth: "120px"
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
    }
  },
  methods: {
    //获取对应路由名称的数据内容
    getBilling() {
      axios.get(`./static/data/billing/${this.$route.name}.json`).then((res) => {
        this.billingData = res.data
        this.payTotal()
        this.earnTotal()
      })
    },
    payTotal() {
      let countArr = [];
      this.billingData.forEach((item) => {
        countArr.push(parseFloat(item.price))
      })
      //reduce计算数组内数字的总和
      this.countPay = countArr.reduce((acc, curr) => {
        return acc + curr
      })
    },
    earnTotal() {
      let countArr = [];
      this.billingData.forEach((item) => {
        countArr.push(parseFloat(item.sellPrice))
      })
      this.countEarn = countArr.reduce((acc, curr) => {
        return acc + curr
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
</style>