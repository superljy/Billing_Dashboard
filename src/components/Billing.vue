<template>
  <el-table :data="billingsData">
    <el-table-column prop="date" label="日期" width="120"> </el-table-column>
    <el-table-column prop="size" label="尺码" width="80"> </el-table-column>
    <el-table-column prop="price" label="价格" width="80"> </el-table-column>
    <el-table-column prop="name" label="商品名称"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    let billing = {
      date: '2021-01-08',
      name: 'Supreme Air Force 1 White',
      size: '8.5',
      price: '790'
    }
    return {
      billingsData: Array(10).fill(billing)
    }
  },
  methods: {

  }
}
</script>