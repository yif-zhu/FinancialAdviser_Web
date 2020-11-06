<template>
<div class="editDiv">
	<quill-editor  v-model="content" :options="editorOption">
		<!-- <div id="toolbar" slot="toolbar">
      <button class="ql-bold" title="加粗">Bold</button>
      <button class="ql-italic" title="斜体">Italic</button>
      <button class="ql-underline" title="下划线">underline</button>
      <button class="ql-strike" title="删除线">strike</button>
      <button class="ql-blockquote" title="引用"></button>
      <button class="ql-code-block" title="代码"></button>
      <button class="ql-header" value="1" title="标题1"></button>
      <button class="ql-header" value="2" title="标题2"></button>
      <button class="ql-list" value="ordered" title="有序列表"></button>
      <button class="ql-list" value="bullet" title="无序列表"></button>
      <select class="ql-header" title="段落格式">
        <option selected>段落</option>
        <option value="1">标题1</option>
        <option value="2">标题2</option>
        <option value="3">标题3</option>
        <option value="4">标题4</option>
        <option value="5">标题5</option>
        <option value="6">标题6</option>
      </select>
      <select class="ql-size" title="字体大小">
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px" selected>16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>
      <select class="ql-color" value="color" title="字体颜色"></select>
      <select class="ql-background" value="background" title="背景颜色"></select>
      <select class="ql-align" value="align" title="对齐"></select>
      <button class="ql-clean" title="还原"></button>
    </div> -->
	</quill-editor>
	<p class="btnp"><el-button @click="closeEdit" size="mini">取消</el-button><el-button @click="saveEdit" size="mini" type="primary">保存</el-button></p>
</div>
</template>

<script>
import { quillEditor,Quill } from 'vue-quill-editor';
// 自定义字体大小
  let Size = Quill.import('attributors/style/size')
  Size.whitelist = ['12px', '14px', '16px', '18px', '22px']
  Quill.register(Size, true)

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ]
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts
  Quill.register(Font, true)
export default {
	data() {
		return {
			content:'',
      editorOption: {
        placeholder: "请输入",
        theme: "snow", // or 'bubble' 
        modules: {
          toolbar:  [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{'header':[]}],
            [{ 'size': ['12px', '14px', '16px' ,'18px', '22px'] }],
            [{ 'color': [] }],
            [{ 'background': [] }],
            [{ 'align': [] }],
            ["image"] //上传图片
          ],
        }
      }
		}
	},
	props:{
		projectContent:[String]
	},
	created() {
		this.content = this.projectContent
	},
	methods:{
		saveEdit() {
			if (this.content == '') {
				this.$message.info('输入内容不能为空！')
				return
			}
			this.$emit('editContent',this.content)
			console.log(this.content)
		},
		closeEdit() {
			this.$emit('closeEdit')
		}
	}
}
</script>

<style lang="scss">
.editDiv{
	p.btnp{
		text-align:center;
		margin-top: 40px;
	}
	.quill-editor {
    height: 350px;
    .ql-container{
    	height: calc(100% - 42px);
    }
	}
}
</style>