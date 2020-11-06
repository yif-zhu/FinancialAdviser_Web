<template>
	<div id="baseInfo">
		<ul ref="baseInfoUl" class="clearfix">
			<slot></slot>
		</ul>
	</div>
</template>

<script>
import {addClass} from '@/utils/dom.js'
export default {
	data() {
		return {

		}
	},
	props:{
		line:{
			type:Number,
			default:2
		}
	},
	created() {
		var self = this
		this.$nextTick(() => {
			self.children = self.$refs.baseInfoUl.children
			for (var i = 0; i < self.children.length; i++) {
				if (this.line) {
					self.children[i].style.width = 100/self.line+'%'
				}else{
					self.children[i].style.width = 100/2+'%'
				}
				addClass(self.children[i],'li'+self.line)
				addClass(self.children[i].children[0],'title')
				addClass(self.children[i].children[1],'text')
			}
		})

	},
	methods:{

	}
}
</script>
<style lang="scss">
#baseInfo {
	width: 100%;
	ul{
		width: 100%;
	}
	li{
		display: inline-block;
		width: 50%;
		line-height: 30px;
		display: flex;
		float: left;
		.title{
			color: $--color-grey;
		}
		&.li0{
			.title{
				flex:0 0 210px;
			}
			.text{
				flex:3;
			}
		}
		&.li2{
			.title{
				flex:0 0 130px
			}
			.text{
				flex:1;
			}
		}
		&.li3{
			.title{
				flex:1;
			}
			.text{
				flex:1;
			}
		}
	}
}
</style>
