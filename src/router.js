import VueRouter from 'vue-router'
import HomeContainer from  './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import newsList from "./components/news/newsList.vue";
import newsInfo from "./components/news/newsInfo.vue";
import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";
import GoodList from "./components/goods/GoodList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:"/",redirect:"/home"},
    {path:"/home",component:HomeContainer},
    {path:"/member",component:MemberContainer},
    {path:"/shopcar",component:ShopcarContainer},
    {path:"/search",component:SearchContainer},
    {path:"/home/newList",component:newsList},
    {path:"/home/newsInfo/:id",component:newsInfo},
    {path:"/home/photolist",component:PhotoList},
    {path:"/home/photoInfo/:id",component:PhotoInfo},
    {path:"/home/goodlist",component:GoodList},
    {path:"/home/goodsinfo/:id",component:GoodsInfo},
    {path:"/home/goodsdesc/:id",component:GoodsDesc,name:"goodsdesc" },
    {path:"/home/goodscomment/:id",component:GoodsComment,name:"goodscomment"}
  ],
  linkActiveClass:"mui-active"
})

// 把路由对象暴露出去
export default router