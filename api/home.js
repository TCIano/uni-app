import fly from '@/utils/request.js'

export const getBannersApi = () => fly.get('/home/swiperdata')
//获取nav
export const getNavsApi = () => fly.get('/home/catitems')
//获取楼层列表
export const getFloorApi = () => fly.get('/home/floordata')