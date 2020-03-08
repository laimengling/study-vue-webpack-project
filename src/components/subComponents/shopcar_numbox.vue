<template>

    <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" readonly  @change="countChanged" ref="numbox">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";
    export default {
        mounted() {
            mui('.mui-numbox').numbox();
        },
        props:["initCount","initId"],
        methods:{
            countChanged(){
                this.$store.commit("updateGoodsCount",{id:this.initId,count:this.$refs.numbox.value});
                // 数量改变了
            }
        }
    }
</script>

<style scoped lang="scss">

</style>