<template>
  <view>
    <van-card :thumb="item.goods_small_logo || defaultPic" v-for="item in goodsList" :key="item.goods_id"
      :price="item.goods_price | toFixed" :title="item.goods_name"
      :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" />
  </view>
</template>

<script>
  import toast from '@/utils/toast.js'
  import {
    getGoodsListApi
  } from '@/api/index.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10,
        },
        total: 0,
        goodsList: [],
        //节流阀
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      async getGoodsList(stopPullDown) {
        this.isLoading = true
        const {
          message: {
            total,
            goods
          }
        } = await getGoodsListApi(this.queryData)
        this.isLoading = false
        // console.log(res)
        stopPullDown && stopPullDown()
        this.total = total
        this.goodsList = [...this.goodsList, ...goods]
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.getGoodsList()
    },
    //监听下拉刷新
    onPullDownRefresh() {
      //清空數據
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10,
      }
      this.total = 0
      this.goodsList = []
      //重新發起請求
      //加载完成停止刷新
      this.getGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    //监听上拉触底
    onReachBottom() {
      // console.log('触发上拉刷新')
      //防止重复加载
      if (this.queryData.pagenum * this.queryData.pagesize > this.total) return toast('没有数据啦')
      //加载数据
      if (this.isLoading) return
      this.queryData.pagenum++
      this.getGoodsList()
    }

  }
</script>

<style lang="scss">

</style>
