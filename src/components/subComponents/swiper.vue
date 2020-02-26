<template>
    <div>
        <!--将来，谁使用此轮播组件，谁为我们传递swipeList-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':isFull}">
                {{item.img}}
            </mt-swipe-item>
        </mt-swipe>
        <!--分析：为什么 商品评论中的轮播图那么丑(轮播图可能图片的大小不同)-->
        <!--1. 首页种的图片，他的宽和高都是使用了 100% 的宽度-->
        <!--2. 在商品详情页面中，轮播图的图片，如果夜视仪 宽高为 100% 的话，页面不好看-->
        <!--3. 商品详情页中的轮播图，期望高度是100%，但是宽度自适应-->
        <!--4. 经过分析，得到问题的原因： 首页中的轮播图和详情中的轮播图，分歧点是 宽度到底是100% 还是自适应-->
        <!--5. 既然这俩个 轮播图，其他方面都是没有冲突的，只是宽度有分歧，那么 我们可以定义一个属性，让使用轮播图的调度者手动置顶，是否为100%的宽度-->
    </div>
</template>

<script>
    export default {
        props:["swipeList","isFull"]
    }
</script>

<style scoped lang="scss">
.mint-swipe{
        height: 200px;
  .mint-swipe-item{
      text-align: center;
        img{
            height: 100%;
        }
  }
}
    .full{
        width: 100%;
    }
</style>