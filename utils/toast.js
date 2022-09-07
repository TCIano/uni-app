//基础提示
function toast(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "none",
    duration,
  });
}
//错误提示
toast.err = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "error",
    duration
  });
}
//成功提示
toast.success = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "success",
    duration
  });
}
//加载提示
toast.loading = function(title, duration) {
  uni.showToast({
    title,
    icon: "loading"
  })
}
export default toast
