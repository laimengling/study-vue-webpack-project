/*
入口文件
* */
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";

//按需导入Mint-UI中的组件
import { Header,Swipe, SwipeItem , Button} from 'mint-ui';
Vue.component(Header.name, Header);
//轮播图组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//请求数据 vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
import app from './App.vue';

//导入自己的router.js路由模块
import router from './router';
import moment from "moment";


Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.filter("dateFormat",function (dateStr,pattern='YYYY-MM-DD HH:MM:SS'){
    return moment(dateStr).format(pattern);
    }
);

var vm = new Vue({
    el:"#app",
    render:c=>c(app),
    router
})