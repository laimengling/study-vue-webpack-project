<template>
    <div class="shopcar-container">
        <!--商品数据-->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                            <mt-switch
                                    v-model="$store.getters.getGoodsSelect[item.id]"
                                    @change="selectChanged(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
                            <img :src="item.thumb_path" alt="">
                            <div class="info">
                                <h1>{{ item.title }} </h1>
                                <p>
                                    <span class="price">￥{{ item.sell_price }}</span>
                                    <numbox :initCount="$store.getters.getGoodsCount[item.id]" :initId="item.id"></numbox>
                                    <!--
                                     问题：如何从购物车中获取商品的数量呢
                                     1. 我们可以先创建一个空对象，如何循环购物车中所有商品的数据，
                                     把当前循环这条商品的 Id， 作为 对象 的属性，count 值作为 对象的属性值，
                                     这样，当把所有的商品循环一遍，就会得到一个对象 {88: 2 , 89: 1 , 90: 3}
                                    -->
                                    <a href="#" @click.prevent="remove(item.id , i)">删除</a>
                                </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner sum">
                    <div>
                        <p>总计(不含运费)</p>
                        <p>
                            已勾选商品 <span class="red">{{this.$store.getters.getGoodsCountAndAmount.count}}</span>件，总价：<span class="red">￥{{this.$store.getters.getGoodsCountAndAmount.amount}}</span>
                        </p>
                    </div>
                    <div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from "../subComponents/shopcar_numbox.vue";
    export default {
        data:function () {
            return {
                goodslist:[]
            }
        },
        created() {
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                var idArr = [];
                this.$store.state.car.forEach(item =>{
                    idArr.push(item.id);
                });
                // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if(idArr.length <= 0){
                    return;
                }
                this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
                    if(result.body.status === 0){
                        this.goodslist=result.body.message;
                    }
                });
            },
            remove(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit("removeFormCar",id);
            },
            selectChanged(id,val){
                //每当点击开关，把最新的 开关状态，同步到 store 中
                this.$store.commit("updateGoodsSelected",{id:id,selected:val});
            }
        },
        components:{
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container{
        padding: 5px;
        background-color: #cccccc;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;

            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }

        }
        .sum{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .red{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }

</style>