<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>

    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="ToGoodsDetailPage(item.goods_id)" style="width: 100%;" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i">
        <image @click="ToNavs(item)" :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image @click="toGoodsList(item.product_list[0].navigator_url)" class="left-img"
              :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}">
            </image>
            <!-- 右侧 4 个小图片的盒子 -->
          </view>
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image @click="toGoodsList(item2.navigator_url)" class="image" :src="item2.image_src" mode="widthFix"
                :style="{width: item2.image_width + 'rpx'}">
              </image>
            </view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  import {
    getBannersApi,
    getNavsApi,
    getFloorApi
  } from '@/api/index.js'
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    methods: {
      async getBanners() {
        const res = await getBannersApi()
        // console.log(res)
        this.swiperList = res.message
      },
      //跳转商品详情页面
      ToGoodsDetailPage(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + id
        })
      },
      //获取导航栏
      async getNavs() {
        const res = await getNavsApi()
        // console.log(res)
        this.navList = res.message
      },
      //跳转导航页面
      ToNavs(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //获取楼层列表
      async getFloor() {
        const res = await getFloorApi()
        // console.log(res)
        this.floorList = res.message
      },
      //跳转到商品列表
      toGoodsList(url) {
        // console.log(url, url.split('?')[1])
        uni.navigateTo({
          url: "/subpkg/goods_list/goods_list?" + url.split('?')[1]
        })
      }

    },
    onLoad() {
      this.getBanners()
      this.getNavs()
      this.getFloor()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 220rpx;
    background-color: #c00000;

    display: flex;
    justify-content: center;
    // overflow: hidden;
    align-items: flex-end;

    .search_btn {
      width: 550rpx;
      height: 30px;
      margin-bottom: 5px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }


  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
