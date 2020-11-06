<template>
	<div class="hart_loading">
		<div class="box">
		    <div :class="className"></div>
            <!-- <div class="loader-03"></div> -->
		</div>
	</div>
</template>

<script type="text/javascript">
    export default {
        props:{
            className: {
                type:String,
                default:'loader-chart'
            }
        }
    }
    
</script>

<style lang="scss" scoped>
.hart_loading{
	width: 100%;
	height: 100%;
	position: absolute;top: 0;
	left: 0;
	background-color: rgba(255,255,255,0.5);
    .box {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        font-size: 30px;
        color: #5caeea;
        padding: 1em;
        margin-bottom: .25em;
        vertical-align: top;
        -webkit-transition: .3s color, .3s border;
        transition: .3s color, .3s border;
        [class*="loader-"] {
            display: inline-block;
            
            color: inherit;
            vertical-align: middle;
            pointer-events: none;
            position: relative;
            top: 40%;
            left: 50%;
            transform:translate(-50%,-50%)
            
        }
        .loader-chart {
            width: 1em;
            height: 1em;
            border: .2em solid transparent;
            border-top-color: currentcolor;
            border-radius: 50%;
            -webkit-animation: 1s loader-05 linear infinite;
            animation: 1s loader-05 linear infinite;
            top: 34%;
            left: 50%;
            margin-left: -15px;
            &:before{
                content: '';
                display: block;
                width: inherit;
                height: inherit;
                position: absolute;
                top: -.2em;
                left: -.2em;
                border: .2em solid currentcolor;
                border-radius: 50%;
                opacity: .5;
            }
        }
        .loader-iframe {
            width: 1.5em;
            height: 1.5em;
            border: .05em solid #5264D9;
            border-bottom-color: transparent;
            border-radius: 50%;
            -webkit-animation: 0.7s loader-03 linear infinite;
            animation: 0.7s loader-03 linear infinite;
        }
    }
}
@-webkit-keyframes loader-05 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes loader-05 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}


@-webkit-keyframes loader-03 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes loader-03 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>