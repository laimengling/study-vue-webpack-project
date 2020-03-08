<template>
    <!--问题： 我们不知道什么时候能够拿到max值，但是，总归有一刻，会得到一个真正的 max 值-->
    <!--我们可以使用 watch 属性来监听， 监听 父组件传递过来的 max 值，不管 watch 会被监听会被触发几次，
    但是最后一次肯定是一个合法的 max 数值-->
    <div class="mui-numbox" data-numbox-min="1" >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    export default {

        mounted() {
            mui('.mui-numbox').numbox();
        },
        props:["max"],
        methods:{
            countChanged(){
                //每当 文本框的数据被修改的时候，立即把 最新的数据，通过事件调用 传递给父组件
                this.$emit("getcount",parseInt(this.$refs.numbox.value));
            }
        },
        watch:{
            "max":function (newVal,oldVal) {
                mui(".mui-numbox").numbox().setOption("max",newVal);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>