<template>
  <div class="table-show">
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th v-for="(col, idx) in headData" :key="idx">{{col.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="(col, index) in headData" :key="index">{{row[col.prop]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TableShow',
  props: ['headData', 'data']
}
</script>
<style scoped>
.table-show {
  overflow: auto;
}
.table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 0 auto;
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
.table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>th {
  font-weight: 600;
}
.table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    border: 1px solid #ddd;
}
.table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}
.table-hover>tbody>tr:hover {
    background-color: #f5f5f5;
}
</style>
