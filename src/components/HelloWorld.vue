<template>
      <div class="hotmap-content">
        <div class="svg" style="margin-right:1rem">
          <!-- 环形进度条 -->
               <svg :width="width" :height="height">
                 <!-- 凹槽 -->
                <circle class="line"  
                :cx="(width/2)" 
                :cy="(height/2)" 
                :r="(width-w*2)/2" 
                stroke-width="10"  
                stroke="#ccc" 
                stroke-linejoin="round" 
                stroke-linecap="round"
                :stroke-dasharray="[girth, girth]"
                />
                <!-- 进度条 -->
                <circle 
                fill="#fff" 
                :cx="(width/2)" 
                :cy="(height/2)" 
                :r="(width-w*2)/2"  
                stroke-width="5"  
                stroke="hsl(160,80%,50%)" 
                :stroke-dasharray="[lineNum, girth]"
                stroke-linejoin="round" 
                stroke-linecap="round"
                
                />
                <!-- 数字 -->
                    <text
                      text-anchor="middle"
                      :x="(width)/2"
                      :y="(height)/2+fontSize/2"
                      fill="#008c8c"
                      :font-size="fontSize"
                      font-weight="100"
                     >
                      {{ textNum }}%
                    </text>
          
              </svg>
          
        </div>
          
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
                <p>前提需要安装echarts</p>
                 <div class="charts map">
                    <my-maps-charts
                    :addresinfo="addresinfo" 
                    :maptype="maptype"
                    :mapName="mapName"
                  ></my-maps-charts>
                  
               </div>
               <div class="charts table">
                    <cate-bar-charts 
                     typename="bar"
                     :addresinfo="addresinfo"
                    ></cate-bar-charts>
               </div>
                 <div class="charts table">
                    <cate-line-charts 
                     typename="line"
                     :addresinfo="addresinfo"
                    ></cate-line-charts>
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

import china from 'echarts/map/json/china.json';

import echarts from 'echarts';

export default {
  name: 'HelloWorld',
  data(){
     return{
     
         w:20,
         width:150,
         height:150,
          lineNum:0,
         girth:0,
        
         textNum:0,


         fontSize:16, // 字体大小
         offsetY:10,  // 纵向偏移
         offsetX:20,  // 横向偏移
         line:[],     // 柱子数据
      
         yline:[],    // 灰色标线
         hline:[],    // y轴数字
         textline:[], // x轴文字
            
        
         activeIndex:0,
         activeIndex2:0,
         maptype:china,
         mapName:'china',
         addresinfo:[
           {
              name:'北京',
              type:16
           },{
              name:'天津',
              type:28
           },{
              name:'北京',
              type:80
           },{
              name:'天津',
              type:120
           }
        ],
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
  components: {
    // HelloWorld
    // lineSvg
  },
  mounted(){
    /**
     * 
     * 圆形滚动条
     * 
     */
    let num2 = "99%";
        num2 = parseInt(num2.replace(/%$/g,''));
        console.log(num2)
        this.textNum = num2;
    //  圆周长 566,1193.2 =>596.6
   let r = (this.width-this.w*2)/2; 
   this.girth = 2*3.14*r+3.14*(this.width-this.w*2);
   this.lineNum = Math.round((num2/100) * (this.girth/2));
   
   console.log(this.lineNum)



   

  
    /**
     * 
     *svg 柱状图
     * 需要找到 最大值 然后运算
     * 需要 将 数值拿出来 进行排序
     * 总体难点 
     * 1. 需要考虑 柱子的自适应宽度 和 位置 
     * 2. 需要考虑 自适应横纵、纵坐标 文字、数字位置 
     * 3. 数字 比例 自适应 这里以5的公倍数来计算
     * 
     */
     let len = this.addresinfo.length;
    let sortarr = [];
    this.addresinfo.forEach((item)=>{
             sortarr.push(item.type)
    })
    // 排序
    let len2 = sortarr.length-1;
    let tmp=null;
    for(var j=0; j<len2; j++){      //循环9次
        for(var i=0; i<len2-j; i++){    //每次比较10-j-1次数
        if(sortarr[i]>sortarr[i+1]){
            tmp = sortarr[i+1];
            sortarr[i+1] = sortarr[i];
            sortarr[i] = tmp;
        }
       }
    }
    
   
    let num = sortarr[len2]; // 假设 最大值  重点值
    var yline = num+Math.abs(5-(num%5));
    if(num%5==0){
        yline = num;
    }
  
  //  设置 主子 和 横坐标文字位置
    this.addresinfo.forEach((item,index)=>{
    
         let h = (Math.round(item.type/yline * 10000) / 100.00); // 计算高度占比
        
         let obj = {
                value:item.type,
                name:item.name,
                y:this.height-(h/100*this.height)+this.offsetY,                     // 纵坐标 必须高度-高度百分比==实际高度
                h:h/100*this.height,
                w:parseInt(this.width/len)-20,       // 计算 自适应宽度
                x:parseInt(this.width/len)*index+20+this.offsetX/2  // 计算 自适应横向间隔
         }
         this.line.push(obj);
         this.textline.push(obj)
    })
 
  //  设置 纵坐标 数字和标线的位置
    for(let n = 0;n<5;n++){
      
          let obj = {
               y:10+(this.height/5)*n,   // 计算纵坐标的位置       位置是以左上角为准 需要更精确化
               value:(yline/5)*(5-n)     // 计算自适应纵坐标的值   因为坐标是从上到下的 所以 需要倒叙计算
          }
          let obj2 = {
               x:3-String((yline/5)*(5-n) ).length,
               y:10+(this.height/5)*n,   // 计算纵坐标的位置       位置是以左上角为准 需要更精确化
               value:(yline/5)*(5-n)     // 计算自适应纵坐标的值   因为坐标是从上到下的 所以 需要倒叙计算
               
        }
          this.yline.push(obj);
          this.hline.push(obj2);
    }
      this.yline; 
   









    // 地图 标注 
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
     .line{
        fill: transparent;
        stroke-width: 10px;
        transition: all .2s ease-in 0s;
     }
     #circle {
        stroke-dasharray: 250.921;
        // stroke-dashoffset: 20;
        // animation: round 3s linear infinite;
      }
       @keyframes round {
    to {
      stroke-dashoffset: 0;
    }
  }
     .charts{
        background: rgb(38, 36, 61);
     }
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
