<template>
    <div class="goodsdesc-container">
        <h1>{{info.title}}</h1>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        data:function () {
            return{
                id:this.$route.params.id,
                info:{}
            }
        },
        created() {
            this.getDetail();
        },
        methods:{
            getDetail(){
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getdesc/"+this.id).then(result => {
                   if(result.body.status ===0 ){
                       this.info=result.body.message[0];
                   }

                    console.log(this.info);
                });
            }
        }
    }
</script>

<style  lang="scss">
.goodsdesc-container{
    padding: 10px;
    h1{
        font-size: 16px;
        color:#26a2ff ;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }

}
</style>