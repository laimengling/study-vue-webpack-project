<template>
    <div>
        <comment :artid="$route.params.id"></comment>
    </div>
</template>

<script>
    import comment from "../subComponents/comment.vue";
    export default {
        components:{
            comment
        }
    }
</script>

<style scoped lang="scss">

</style>