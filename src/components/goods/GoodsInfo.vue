<template>
    <div class="goodsInfo-container">
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :swipeList="slide1" :isFull="false"></swiper>
                </div>
            </div>
        </div>

        <!--购买信息-->
        <div class="mui-card">
            <div class="mui-card-header">{{ details.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：￥<del class="market">{{ details.market_price }}</del>
                        销售价：<span class="sales">￥{{ details.sell_price }}</span>
                    </p>
                    <p class="num">购买数量
                        <numbox @getcount="getSelectNum" :max="details.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" >立即购买</mt-button>
                        <mt-button type="danger" @click="addToShopcar">加入购物车</mt-button>
                    </p>
                    <!--分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                    <!--1. 经过分析发现： 按钮 属于goodsInfo页面， 数字属于numberbox组件-->
                    <!--2. 由于涉及到父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到 选中的商品数量值-->
                    <!--3. 怎么解决这个问题：涉及到 子组件向父组件传值（时间调用机制）-->
                    <!--4. 事件调用的本质： 父向子传递方法，自调用这个方法，同时把数据当做参数传递给父组件-->
                </div>
            </div>

        </div>
        <!--
           加入购物车：
            vuex是Vue配套的 公共数据管理工具，他可以把一些共享的数据，保存到vuex中，
            方便整个程序中的任何组件直接获取或修改我们的公共数据

            理解：
            1. 三层组件嵌套，在原始中，最外层组件获取最里层组件数据，需要中间组件传递，
            但中间组件可能不需要该数据
            2. 不同组件不存在父子关系，数据的传递
            3. Vuex是为了保存 组件之间共享数据而诞生的，如果组件之间有要共享的数据，
            可以直接挂载到vuex中，而不必通过 父子组件之间传值，如果 组件的数据不需要
            共享。如果不需要共享的私有数据，没有必要放到vuex中；
            4. ** 只有共享的数据，才有去哪里放到 vuex中，私有的数据只要放到组件的data
             props 和 data 和vuex 的区别；
            5. 结论：Vuex是一个全局的共享数据存储区域，就相当于是一个数据的仓库

        -->

        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ details.goods_no }}</p>
                    <p>库存情况：{{ details.stock_quantity }}件</p>
                    <p>上架时间：{{ details.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>

    import swiper from "../subComponents/swiper.vue";
    import numbox from "../subComponents/goodsinfo_numbox.vue";
    import { Toast } from "mint-ui";
    export default {
        data:function () {
            return{
                id:this.$route.params.id,//将路由参数对象中的id挂载到 data ，方便后期调用
                slide1:[],// 轮播图的数据
                details:{},// 获取到的商品的信息
                ballFlag:false,//控制小球的隐藏和显示的标识符
                selectNum:1//保存用户选择的商品数量
            }
        },
        created() {
            this.getlunbo();
            this.getdetail();
        },
        methods:{
            getlunbo(){
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then( result => {
                    if(result.body.status === 0){
                        result.body.message.forEach(item => {
                            item.img=item.src;
                        })
                        this.slide1 = result.body.message;
                    }
                })
            },
            getdetail(){
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getinfo/"+this.id).then(result => {
                    if(result.body.status === 0){
                        this.details=result.body.message[0];
                    }else{
                        Toast("请求数据失败");
                    }
                })
            },
            goDesc(id){
                this.$router.push({
                    name:"goodsdesc",
                    params:{
                        id
                    }
                });
            },
            goComment(id){
                this.$router.push({
                    name:"goodscomment",
                    params:{
                        id
                    }
                });
            },
            addToShopcar(){
                this.ballFlag=!this.ballFlag;
                //
                var goodsinfo={id: this.id, count: this.selectNum, price: this.details.sell_price, selected: false};
                //调用 store 中的mutations 来将商品加入购物车
                this.$store.commit("addToCar" , goodsinfo);
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;
                /*
                * 小球动画优化思路：
                * 1. 先分析导致 动画 不准确的本质原因：
                * 我们把 小球 最终 唯一到的位置，已经局限在了某一分辨率的
                * 滚动条未滚动的情况下
                * 2. 只要分辨率 和 测试的时候不一样或者滚动条有一定的滚动距离之后，问题就出现了
                * 3. 因此，我们经过分析，得到结论：不能把位置的横纵坐标直接写死，而是应该
                * 根据不同情况，动态计算这个坐标值
                * 4. 经过分析 ，得出阶梯思路：先得到 徽标的 横纵 坐标，
                * 在得到 小球 的横纵坐标，然后 让y值来求差，x值也求差，得到的结果，就是横纵坐标要位移的距离
                * 5. 如何 获取 会标和小球的位置 domObject.getBoundingClientRect()
                * */
                //获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document
                    .getElementById("badge")
                    .getBoundingClientRect();

                const xDist = badgePosition.left-ballPosition.left;
                const yDist = badgePosition.top -  ballPosition.top;



                el.style.transform=`translate(${xDist}px, ${yDist}px)`;
                el.style.transition="all .8s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            getSelectNum(count){
                //当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
                this.selectNum=count;
                console.log("父组件拿到的数字："+count)
            }

        },
        components:{
            swiper,
            numbox
        }
    }
</script>

<style scoped lang="scss">
.goodsInfo-container{
    background-color: #ccc;
    overflow: hidden;

    .ball{
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        z-index: 99;
        top: 390px;
        left: 140px;
    }
    .sales{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin-top: 10px;
            margin-bottom: 5px;
        }
    }
}
</style>