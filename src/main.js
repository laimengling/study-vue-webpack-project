// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//图片缩略图
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

//导入公共数据管理工具
import  Vuex from "vuex";
Vue.use(Vuex);

var car = JSON.parse(localStorage.getItem("car")||'[]');
var store = new Vuex.Store({
   state:{//this.$store.state.***
       car: car//购物车中的商品的数据，用于一个数组存储起来，在car 数组中，
       // 存储一些商品的对象，咱们可以暂时将这个商品对象，设计成这个样子
       // { id: 商品的id, count: 商品的数量, price: 商品的单价 , selected: 商品是否被选中}
   },
   mutations:{//this.$store.commit("方法名","按需传递唯一的参数")
       addToCar(state,goodsinfo){
           //点击加入购物车，把商品信息，保存到 store 中的 car
           var flag = false;//判定是否找到该物品id
           state.car.some(item =>{
               if(item.id == goodsinfo.id){
                   item.count += parseInt(goodsinfo.count);
                   flag = true;
                   return true;
               }
           });
           if(!flag){
               state.car.push(goodsinfo);
           }

           //当 更新 car 之后，把 car 数组，存储到 本地的 localstorage 中
           localStorage.setItem("car",JSON.stringify(state.car));
       },
       updateGoodsCount(state,obj){
           state.car.some( item=>{
              if(item.id == obj.id){
                  item.count = parseInt(obj.count);
                  return true;
              }
           });
           state.car=car;
           localStorage.setItem("car",JSON.stringify(car));
       },
       removeFormCar(state,id){
           state.car.some((item,i) => {
               if(item.id = id){
                   state.car.splice(i,1);
                   return true;
               }
           });
           localStorage.setItem("car",JSON.stringify(state.car));
       },
       updateGoodsSelected(state, info){
           state.car.some(item =>{
               if(item.id == info.id){
                   item.selected=info.selected;
               }
           });
           localStorage.setItem("car",JSON.stringify(state.car));
       }
   },
   getters:{//this.$store.getters.**
       //相当于计算属性， 也相当于 filters
       getAllCount(state){
           var c = 0;
           state.car.forEach(item =>{
               c += item.count;
           });
           return c;
       },
       getGoodsCount(state){
           var o = {}
           state.car.forEach(item => {
               o[item.id] = item.count
           })
           return o
       },
       getGoodsSelect(state){
           var o = {};
           state.car.forEach(item => {
              o[item.id]=item.selected;
           });
           return o;
       },
       getGoodsCountAndAmount(state){
           var o = {
               count:0,//勾选数量
               amount:0
           };
           state.car.forEach(item => {
               if(item.selected){
                   o.count += item.count;
                   o.amount += item.count * item.price;
               }
           });
           return o;
       }
   }
});

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'





// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 1.4 挂载路由对象到 VM 实例上
    store
})








