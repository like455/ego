<template>
  <el-pagination
  background
  layout="total,prev, pager, next,jumper"
  :page-size='pageSize'
  @current-change="changePage"
  :total="total">
</el-pagination>
</template>

<script>
export default {
    props:{
        pageSize:{
            type:[Number,String],
            defaule:10
        },
        total:{
            type:[Number,String],
            defaule:100
        }
    },
    methods:{
        changePage(val){
            // console.log(val);
            //子传父
            this.$emit('changeCurrent',val)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>