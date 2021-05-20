<template>
     <div>
          <div id="myChartChina" :style="{ width:width, height:height }"></div>
     </div>
</template>

<script>
export default {
   name:'myMapsCharts',
   props:{
        /**
        *  数据
        */
         addresinfo:{
              default:()=>{[]}
         },
         /**
          * 宽度
          */
         width:{
                type:String,
                default:()=>{ return '100%' }
          },
         /**
          * 高度
          *  */ 
         height:{
          type:String,
          default:()=>{
              return '420px' 
          }
        },
        /**
         * 文字颜色
         */
        fontColor:{
            type:String,
            default:()=>{
                return '#fff' 
            }
        },
        /**
         * 触碰区域颜色
         */
        areaColor:{
            type:String,
            default:()=>{
                return '#008c8c' 
            }
        },
        /**
         * 色块颜色数组
         */
        areacolorArr:{
             type:Array,
              default:()=>{
                  return ["lightskyblue","#C1E3FF","#ABC7FF","#8DEBFF","#6CACFF"]
              }
        },
        /**
         * 需要展示的地图json 
         */
        maptype:{
             type:Object,
             default:()=>{
                 return {}
             }
        },
        /**
         * 地图名称  例如：hebei
         * 注：地图名称必须与json相对应
         */
        mapName:{
             type:String,
             default:()=>{
                   return 'china'
             }
        }
   },
   mounted(){
        let { drawLine } = this;
        drawLine();
   },
   methods:{
      drawLine(){
       let { addresinfo,fontColor,areaColor,areacolorArr,mapName,maptype } = this;
      // 基于准备好的dom，初始化echarts实例
      const myChartContainer = document.getElementById("myChartChina");
      this.$echarts.registerMap(mapName,maptype);
      const myChartChina = this.$echarts.init(myChartContainer);
      // 绘制图表
      const optionMap = {
            tooltip: {},

            legend: {
              orient: "vertical",
              left: "right",
              data: [""],
            },
            visualMap: {
              show:false,
              realtime: false,
              inRange: {
                color: areacolorArr,
              },
            },
            selectedMode: "single",
            series: [
                
              {
                name: "",
                type: "map",
                mapType:mapName,
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(134, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                      type: 'radial',
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(134, 235, 248, 0)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(134, 235, 248, .2)' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, .3)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                  },
                  emphasis: {
                    // 地图区域的高亮颜色
                    areaColor: areaColor,
                    
                  }
                },
                showLegendSymbol: true,
                label: {
                  normal:{
                    show: true,
                    position: 'center',
                    color: fontColor
                  },
                  emphasis:{
                    show: true,
                  },
                },
                data: addresinfo,
              },
              
            ],
            geo: [
              {
                // 地理坐标系组件
                map:mapName,  //重点
                roam: false, // 可以缩放和平移
            
                  itemStyle: {
                
                      normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                          type: 'radial',
                          x: 0.5,
                          y: 0.5,
                          r: 0.8,
                          colorStops: [{
                            offset: 0,
                            color: 'rgba(147, 235, 200, 0)' // 0% 处的颜色
                          }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                          }],
                          globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, .3)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                      },
                      emphasis: {
                        // 地图区域的高亮颜色
                        areaColor: "#008c8c"
                      }
                    },
                    label: {
                          normal: {
                          show: true, //显示省份标签
                          textStyle: {
                              color: "#6b6b6b", //省份标签字体颜色
                              fontSize: 12
                          }
                          },
                                emphasis: {
                                //对应的鼠标悬浮效果
                                show: true,
                                textStyle: {
                                    // color: "#000",
                                    color: "#007fff"
                                },

                                }
                            },
                // 这里是重点！！！
                regions: [
                  {
                    name: "南海诸岛asd",
                    itemStyle: {
                      // 隐藏地图
                      normal: {
                        show:false,
                        opacity: 0, // 为 0 时不绘制该图形
                      }
                    },
                    label: {
                      show: false // 隐藏文字
                    }
                  }
                ],
              
              }
            ]
          };

      myChartChina.setOption(optionMap);
      window.onresize = function () {
      
        myChartChina.resize();
      };
    },
   }
}
</script>
