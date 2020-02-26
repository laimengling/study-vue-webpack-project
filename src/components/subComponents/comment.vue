<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多评论120个字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="( item,i ) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼 用户：{{ item.user_name }} 发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-content">
                    {{ item.content === 'undefined'?"该用户很懒，未写评论":item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="addMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data:function () {
            return{
                pageindex:1,
                comments:[],
                msg:""
            }
        },
        props:["artid"],
        created() {
            this.getComment();
        },
        methods:{
            getComment(){
                this.$http.get("http://www.liulongbin.top:3005/api/getcomments/" + this.artid + "?pageindex=" + this.pageindex)
                    .then(result => {
                        if (result.body.status === 0){
                            //为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，
                            // 调用数组的 concat 方法，拼接上新数组
                            this.comments=this.comments.concat(result.body.message);
                        }else{
                            Toast("数据请求失败");
                        }
                    })
            },
            addMore(){
                this.pageIndex++;
                this.getComment();
            },
            postComment(){
                if(this.msg.trim().length === 0 ){
                    return Toast("评论内容不可为空！")
                }
                this.$http.post("api/postcomment/" + this.$route.params.id,{
                    content: this.msg.trim()
                }).then(result =>{
                    if( result.body.status === 0){
                        var cmt={
                            user_name: "匿名用户",
                            add_time:Date.now(),
                            content: this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg="";
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
.cmt-container{

    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 10px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>