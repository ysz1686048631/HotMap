<template>
      <div class="hotmap-content">
        <!-- 侧边栏 -->
           <div class="hotmap-content_silder">
                <div class="hotmap-content_silder_title">
                    <div  
                    v-for="(item,index) in titles" :key="index"
                    :class="[index==activeIndex?'active':'']" @click="onchangelist(index)" >{{ item }}</div>
                 
                </div>
                <div class="hotmap-content_silder_list">
                    <div 
                    v-for="(item,index) in datalist" 
                    :key="index"
                    :class="['linerlist',activeIndex2==index?'actives':'']"
                    @click="onClicklistItem(index)"
                    >
                        {{ item }}
                    </div>
                  
                </div>
           </div>
           <div class="hotmap-content_dome">
                <div class="hotmap-content_dome_header">
                <div>{{text}}热力图</div>
                <div>热力值最高：xxx</div>
                </div>
                <div class="hotmap-content_dome_map">
                        <div id="myChartChinas" ref="mapChart" style="width:100%;height:100%"></div>
                </div>
           </div>
         
      </div>
</template>
<script>
/**
 * 
 * G6在 vue4.0下使用会报错的
 * 经测试 在2.0下 使用比较稳定
 * 
 * 
 */
import { encrypt,decrypt } from '../api/jsencrypt';
import china from 'echarts/map/json/china.json';
import echarts from 'echarts'
export default {
  name: 'HelloWorld',
  data(){
     return{
         activeIndex:0,
         activeIndex2:0,
         titles:[
              '菜单一',
              '菜单二',
              '菜单三'
         ],
         list:[
              [
             '数据1',
             '数据1',
             '数据1',
             '数据1',
             '数据1',
              ],
                [
             '数据2',
             '数据2',
             '数据2',
             '数据2',
             '数据2',
             '数据2',
             '数据2',
             '数据2',
              ],
                  [
             '数据3',
             '数据3',
             '数据3',
             '数据3',
             '数据3',
            
              ],
         ],
         data: [
          {name: '北京', value: 150},
          {name: '天津', value: 42},
          {name: '陕西', value: 102},
          {name: '贵州', value: 71},
          {name: '浙江', value: 61},
          {name: '黑龙江', value: 81},
          {name: '安徽', value: 91},
          {name: '安徽', value: 91},
        ],
        datalist:[],
        initlist:[],
        text:''
     }
  },
  
  mounted(){
    // 使用jsencrypt加密数据
    var str = encrypt('16860'); // 加密 
    console.groupCollapsed('加密',str);
    console.log('解密',decrypt(str))   //解密
    this.drawLine();
    this.$nextTick(()=>{
        
         setTimeout(()=>{
                //  异步清空 添加动画
                   this.datalist = this.list[this.activeIndex];    
                   setTimeout(()=>{
                        this.addstyleAnmite()
                   },20)
             },1)
         
              this.activeIndex=0;
              this.text = this.list[0][0];
    })
   
  },
  methods:{
      onClicklistItem(index){
          if(this.activeIndex2==index) return false;
            this.activeIndex2=index;
            this.text = this.list[this.activeIndex][index];
      },
      onchangelist(index){
             if(this.activeIndex==index) return false;
             this.datalist=[];//  异步清空 添加动画
             //     如果直接赋值新数据  vue不能做出检测dom 所以需要异步操作
            
            setTimeout(()=>{
                //  异步清空 添加动画
                   this.datalist = this.list[this.activeIndex];    
                   setTimeout(()=>{
                        this.addstyleAnmite()
                   },20)
             },1)
         
              this.activeIndex=index;
           
      },
      addstyleAnmite(){
         
              let lists = [...document.querySelectorAll('.linerlist')];
                 
              lists.forEach((item,index)=>{
                    item.style['transition']= `transform .2s ease-in ${index*0.1}s`;
              });
              this.showAnmite(lists);           
       },
       showAnmite(lists){
               lists.forEach((item)=>{
                      item.style['transform']='rotateX(0deg)'
                    
               })
       },
    
     drawLine() {
      //  气泡大小  
     var max = 480,
          min = 9 // todo
     var maxSize4Pin = 100,
          minSize4Pin = 20
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChinas");
    
      // 载入地图类型
      echarts.registerMap('china', china);
      var pcdatas = china.features;
      var geoCoordMap = {};
      // 获取 每个地区的坐标
      pcdatas.forEach(cp => {
        var name = cp.properties.name;
        geoCoordMap[name] = cp.properties.cp
      });

      // 过滤格式化数据并进行标点
      var convertData = function (data) {
              var res = [];
              for (var i = 0; i < data.length; i++) {
                  var geoCoord = geoCoordMap[data[i].name];
            
                  if (geoCoord) {
                      res.push({
                          name: data[i].name,
                          value: geoCoord.concat(data[i].value)
                      });
                  }
              }
              return res;
          };

      
 
     
      var myChartChina = this.$echarts.init(myChartContainer);
  
      var optionMap = {
           
            toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                    }, 
           visualMap: {
            show: false,
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], 
            calculable: true,
            seriesIndex: [1],
            inRange: {
              color: ['#FFB5B5', '#EA0000'] 

            }
          },
          geo: {
            show: true,
            map: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: { 
              normal: {
                areaColor: '#d1def3',
                borderColor: '#b4caef',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#9abfff' 
              }
            }
          },
          series: [
         
            {
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(this.data),
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#666'
              }
            }
          },
         
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75, 
            showLegendSymbol: false, 
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            
            animation: false,
            data: this.data
          },
          
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', 
            symbolSize: function (val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min)
              var b = minSize4Pin - a * min
              b = maxSize4Pin - a * max
              return a * val[2] + b
            },
            
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                },
                formatter: '{@[2]}'
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157' 
              }
            },
            zlevel: 1,
            data: convertData(this.data)
          },
          
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(this.data.sort(function (a, b) {
              return b.value - a.value
            }).slice(0, 5)),
            symbolSize: function (val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true  
              }
            },
            itemStyle: {
              normal: {
                color: '#008c8c',
                shadowBlur: 10,
                shadowColor: 'yellow'
              }
            },
            zlevel: 1
          }]
      }
     
      myChartChina.setOption(optionMap);
      window.onresize = function () {
     
        myChartChina.resize();
      };
    },
 
  }
}
</script>

<style lang="less" scoped>
     .disflex(@type){
            display: flex;
            flex-direction:@type;
     } 
     .fontstyle(@color,@size,@weight){
           color:@color;
           font-size: @size;
           font-weight: @weight;
     }
     .hotmap-content{
          width: 95%;
          margin: 0 auto;
          display: inline-block;
          .disflex(row);
          &_silder{
              margin: .5rem 0;
                .disflex(row);
                 width:23%;
              
                 &_title{
                      .fontstyle(#333, .9rem,bold);
                      &>div{
                            //  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            padding: 1rem .5rem;
                            box-sizing: border-box;
                           
                            cursor: pointer;
                           
                            text-align: right;
                         
                            border-radius: .5rem 0 0 .5rem;
                            &.active{
                                    background: #C1E3FF;
                                   
                            }
                      }
                 }
                 &_list{
                       
                       max-height: 25rem;
                       &>div{
                            width:10rem;
                            text-align: center;
                            padding: 1rem 0;
                            background: #C1E3FF;
                            border-bottom: 1px solid #f2f5f8b0;
                            cursor: pointer;
                            .fontstyle(#333, .8rem, 100);
                            transform: rotateX(90deg);
                      
                            &.actives{
                                  color: sandybrown;
                                  background: #ABC7FF;
                                  
                            }
                            &:hover{
                                   color: sandybrown;
                                   background: #ABC7FF;
                                 
                            }
                       }
                 }
          }
          &_dome{
               .disflex(column);
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                padding: .5rem 0;
                margin: .5rem 0;
               width:80%;
               &_header{
                .disflex(column);
                text-align: center;
                .fontstyle(#333, 1rem, bold);
                &>div:nth-of-type(1){
                       .fontstyle(#333, 1rem, bold);
                }
                }
                &_map{
                    width: 95%;  
                    height: 35rem;
                    box-sizing: border-box;
                   
                
                }
          }
     }
</style>
