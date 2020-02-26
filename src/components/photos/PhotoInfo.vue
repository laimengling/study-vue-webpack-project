<template>
    <div>
        <div class="PhotoInfo-container">
            <h1 class="title">{{ imageInfo.title }}</h1>
            <p class="subTitle">
                <span>发表时间：{{ imageInfo.add_time | dateFormat }}</span>
                <span>点击：{{ imageInfo.click }}次</span>
            </p>
            <hr>

            <!--缩略图区域-->
            <div class="thumbs">
                <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
            </div>

            <!--图片内容区域-->
            <div class="content" v-html="imageInfo.content">

            </div>

            <!--评论区域-->
            <comment :artid=id></comment>
        </div>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    import comment from "../subComponents/comment.vue";
    export default {
        data:function () {
            return{
                id:this.$route.params.id,
                imageInfo:[],
                slide1:[]
            }
        },
        created() {
            this.getPhoto();
            this.getHumImages();
        },
        methods:{
            getPhoto(){
                this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/"+this.id).then( result => {
                    if( result.body.status === 0 ){
                        this.imageInfo = result.body.message[0];
                    }else{
                        Toast("数据请求失败");
                    }
                })
            },
            handleClose () {
                console.log('close event')
            },
            getHumImages(){
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then( result => {
                    if(result.body.status === 0){
                     result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc=item.src;
                        });
                        this.slide1 = result.body.message;
                        console.log(this.slide1);
                    }
                })
            }
        },
        components:{
            comment
        }
    }
</script>

<style scoped lang="scss">
.PhotoInfo-container{
        padding: 10px;
    .title{
        font-size:16px;
        color: #26a2ff;
        text-align: center;
    }
    .subTitle{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }

}
</style>