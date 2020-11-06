<template>
  <div class="highcharts-container" />
</template>

<script>
  import Highcharts from 'highcharts';
  import highcharts3d from 'highcharts/highcharts-3d.js';
  import exporting from 'highcharts/modules/exporting.js';
  import highchartsMore from 'highcharts/highcharts-more.js';//扩展图表类型

  highcharts3d(Highcharts);
  highchartsMore(Highcharts);
  export default {
    name: "Highcharts",
    props: {
      rows: {
        type: Array,
        default: function() {
          return [];
        }
      },
      dims: {
        type: Array,
        default: function() {
          return [];
        }
      },
      options: Object,
      isItExport:{//加一个“isItExport”参数判断图表是否需要导出功能
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      chart: null
    }),
    watch: {
      options (options) {
        if (!this.chart && options) {
          this.renderChart();
        } else {
          this.chart.update(options);
        }
      }
    },
    methods: {
      renderChart() {
        if(this.chart || !this.options) return;
        Highcharts.setOptions({//图表导出
          lang: {
            contextButtonTitle:'导出图表',
            printChart:"打印图表",
            downloadJPEG: "下载JPEG 图片" ,
            downloadPDF: "下载PDF文档"  ,
            downloadPNG: "下载PNG 图片"  ,
            downloadSVG: "下载SVG 矢量图" ,
            exportButtonTitle: "导出图片",
            thousandsSep: ','
          }
        });
        let options = Object.assign({},this.options);
        if (this.dims.length>0 && this.rows.length>0) {
          var seriesObj = {};
          for (var i = 0, len = this.dims.length; i < len; i++) {
            var d = this.dims[i];
            seriesObj[d] = [];
          }
          for (var i = 0, len = this.rows.length; i < len; i++) {
            var r = this.rows[i];
            for (var key in seriesObj) {
              seriesObj[key].push(r[key]);
            }
          }

          var ss = [];
          for (var key in seriesObj) {
            ss.push({
              name: key,
              data: seriesObj[key]
            });
          }

          options.series = ss;
        }

        options.credits = {
          enabled: false
        };
        if(typeof options.series === 'undefined'){
          options.title = {
            text:null
          };
        }
        options.exporting = {
          enabled: this.isItExport
        }
        this.chart = new Highcharts.Chart(this.$el, options);

        //this.dragInit();
      },
      // colorInit(){
      //   Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
      //     return {
      //       radialGradient: {
      //         cx: 0.4,
      //         cy: 0.3,
      //         r: 0.5
      //       },
      //       stops: [
      //         [0, color],
      //         [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
      //       ]
      //     };
      //   });
      // },
      // dragInit(){
      //   let chart = this.chart;
      //   $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
      //     e = chart.pointer.normalize(e);
      //     var posX = e.pageX,
      //       posY = e.pageY,
      //       alpha = chart.options.chart.options3d.alpha,
      //       beta = chart.options.chart.options3d.beta,
      //       newAlpha,
      //       newBeta,
      //       sensitivity = 5; // lower is more sensitive
      //     $(document).bind({
      //       'mousemove.hc touchdrag.hc': function (e) {
      //         // Run beta
      //         newBeta = beta + (posX - e.pageX) / sensitivity;
      //         newBeta = Math.min(100, Math.max(-100, newBeta));
      //         chart.options.chart.options3d.beta = newBeta;
      //         // Run alpha
      //         newAlpha = alpha + (e.pageY - posY) / sensitivity;
      //         newAlpha = Math.min(100, Math.max(-100, newAlpha));
      //         chart.options.chart.options3d.alpha = newAlpha;
      //         chart.redraw(false);
      //       },
      //       'mouseup touchend': function () {
      //         $(document).unbind('.hc');
      //       }
      //     });
      //   });
      // },
      reflow() {
        this.$nextTick(()=>{
          this.chart.reflow();
        });
      }
    },
    mounted() {
      if (!this.chart && this.options !== undefined) {
        this.renderChart();
      }
      exporting(Highcharts);
    },
    beforeDestroy() {
      if(this.chart !== null) {
        this.chart.destroy();
      }
    }
  };
</script>
