<template>
    <div class="newsInfo-container">
        <h1 class="title">{{newsinfo.title}}</h1>
        <p class="subTitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content">

        </div>
        <comment :artid=id></comment>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    import comment from "../subComponents/comment.vue";
    export default {
        data:function () {
            return {
                id:this.$route.params.id,
                newsinfo:{}
            }
        },
        created() {
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                this.$http.get("api/getnew/" + this.id).then(result => {
                    if(result.body.status === 0){
                        this.newsinfo=result.body.message[0];
                        console.log(this.newsinfo)
                    }
                    else {
                        Toast("数据请求失败");
                    }
                })
            }
        },
        components:{
            comment
        }
    }
</script>

<style lang="scss">
.newsInfo-container{
    padding: 10px;
   .title{
       font-size:16px;
       color: red;
       text-align: center;
   }
    .subTitle{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>