<template>
    <div>
        <!--顶部滑动条区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" >
                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
                    <a :class="['mui-control-item' ,item.id == 0 ? 'mui-active' : '']"  v-for="item in categories" :key="categories.id"
                       @tap="getImages(item.id)">
                        {{ item.title }}
                    </a>

                </div>
            </div>

        </div>

        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1. 导入 mui 的js 文件
    import mui from '../../lib/mui/js/mui.min.js';
    import { Toast } from "mint-ui";

    export default {
        data:function () {
            return{
                categories:[],
                list:[]
            }
        },
        created() {
            this.getImgCategory();
            this.getImages(0);
        },
        mounted(){
            //当html结构挂载到页面上的时候，会执行这个钩子函数
            // 2. 初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getImgCategory(){
                this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result =>{
                    if (result.body.status === 0 ){
                        this.categories = result.body.message;
                        var category = {
                          title : "全部",
                             id : 0
                        };
                        this.categories.unshift(category);
                    }else{
                        return Toast("分类数据请求失败");
                    }

                })
            },
            getImages(cateId){
                this.$http.get("http://www.liulongbin.top:3005/api/getimages/" + cateId).then(result => {

                    if(result.body.status === 0){
                       this.list = result.body.message;
                        console.log(this.list);
                   }else{
                       Toast("数据请求失败");
                   }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    *{
        touch-action: pan-y;
    }
    .photo-list{
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li{
            background-color: #ccc;
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            image[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info{
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color:rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }

    }

</style>