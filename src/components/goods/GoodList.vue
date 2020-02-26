<template>
    <div class="goods-container">
       <!--
       <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
       -->
        <!--在网页中有俩种跳转方式：
        方式一：使用 a 标签 的形式叫做 标签跳转
        方式二：使用 window.location.href 的形式，叫做编程式导航
        -->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="addMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    export default {
        data:function () {
            return{
                pageindex:1,
                goodsList:[]
            }
        },
        created() {
            this.getgoodlist();
        },
        methods:{
            getgoodlist(){
                this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex="+this.pageindex).then(result =>{
                    if(result.body.status === 0){
                        this.goodsList = this.goodsList.concat(result.body.message);
                        console.log(this.goodsList);
                    }else {
                        Toast("数据请求失败");
                    }
                });
            },
            addMore(){
                this.pageindex++;
                this.getgoodlist();
            },
            goDetail(id){
                //使用JS的形式进行导航  vue-resource

                //注意：一定要区分 this.$route 和 this.$router 这俩个对象
                // 其中：this.$route 是路由的【 参数对象 】，所有路由中的参数， params query 都属于它
                // 其中： this.$router 是一个【 路由导航对象 】，用它 可以方便的使用 JS 代码，实现路由的前进、后退、跳转到新的URL地址
                this.$router.push("/home/goodsinfo/"+id);
            }
        }
    }
</script>

<style scoped lang="scss">
.goods-container{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item{
        width: 48%;
        border: 1px solid #cccccc;
        box-shadow: 0 0 8px #cccccc;
        margin: 3px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size:14px;
        }
        .info{
            background-color: #eeeeee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 13px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>