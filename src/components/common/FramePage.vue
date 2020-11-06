<template>
    <iframe :src="src"></iframe>
</template>

<script>
    export default {
        name:'FramePage',
        props: {
            src: {
                type: String,
                required:true 
            },
        },
    };
</script>

<style scoped>
    iframe{width:100%; height:900px; border:none; padding:0px; margin: 0px;}
</style>