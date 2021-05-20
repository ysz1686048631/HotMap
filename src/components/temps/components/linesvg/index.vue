<!--
 * @Author: Andy
 * @Date: 2021-05-19 09:32:03
 * @LastEditTime: 2021-05-20 11:36:16
 * @LastEditors: 基于SVG的柱状图组件
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\components\temps\components\linesvg\index.vue
-->
<template>
       <div>
            <svg  :width="`${width+offsetX*2}px`" :height="`${height+offsetY*2+fontSize+10}px`">
                  <!-- 滤镜-渐变 -->
                 
                    <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                         <stop offset="0%" :style="{stopColor:dataConfig.Yline.lineColor,stopCpacity:1}" />
                         <stop offset="100%" :style="{stopColor:dataConfig.barStyle.areaColor,stopOpacity:1}" />
                    </linearGradient>
                    </defs>
                  <!-- logo -->
                     <image v-show="dataConfig.imageSrc" :xlink:href="dataConfig.imageSrc" :x="(width)/2-offsetX" :y="(height)/2+((height)/3)/2" :height="(height)/3" :width="(width)/3" >
                    </image>
                
                  <!-- 标线 -->
                 <line v-for="(items,index4) in Yline" :key="index4 + Math.random()" 
                  :x1="offsetX+5" 
                  :y1="items.y+(offsetY/3)+offsetY" 
                  :x2="width+offsetX" 
                  :y2="items.y+(offsetY/3)+offsetY" 
                  stroke="#ccc" 
                  stroke-width=".5" />
                  <!-- 标块 -->
                  <rect
                   v-for="(item,ind) in barLine" :key="ind + Math.random()"
                   :x="item.x" 
                   :y="item.y-offsetY+offsetY*2" 
                   :width="item.w" 
                   :height="item.h+offsetY-offsetY" 
                   
                   fill="url(#grad1)"
                   >
                      <animate attributeName="height" from="0" :to="item.h+offsetY" dur=".2s" repeatCount="1" />
                   </rect>
                   
                    <!-- 横坐标 -->
                    <text
                    v-for="(items) in  XlineText" :key="items.name + Math.random()"
                    :x="items.x+parseInt(items.w/2)-10" 
                    :y="height+offsetX+(fontSize/2)+offsetY"
                    :font-size="mergedConfig.Xline.fontSize"
                    :fill="mergedConfig.Xline.color"
                    >
                    {{ items.name }}
                    </text>
                    <!-- 纵坐标 数字 -->
                      <text
                       v-for="(items,index3) in YlineNums" :key="index3 + Math.random()"
                       :x="items.x+15" 
                       :y="items.y+offsetY*1.5"
                       :font-size="mergedConfig.Yline.fontSize"
                       :fill="mergedConfig.Yline.color"
                        text-anchor="middle"
                       >
                       {{ items.value }}
                    </text>
                  <!-- 顶部文字 -->
                  <text
                       v-for="(items,index4) in topText" :key="index4 + Math.random()"
                       v-show="dataConfig.barStyle.textStyle.show"
                       :x="items.x" 
                       :y="items.y+offsetY-(fontSize/2)+offsetY"
                       :font-size="dataConfig.barStyle.textStyle.fontSize"
                       :fill="dataConfig.barStyle.textStyle.color"
                      
                        text-anchor="middle"
                       >
                       {{ items.value }}
                    </text> 
                  <!-- X轴 -->
                  <line :x1="offsetX+5" :y1="height+offsetY*2" :x2="width+offsetX+5" :y2="height+offsetY*2" :stroke="dataConfig.Xline.lineColor" stroke-width="1" />
                  <!-- Y轴 -->
                  <line :x1="offsetX+5" :y1="height+offsetY*2" :x2="offsetX+5" :y2="offsetY" :stroke="dataConfig.Yline.lineColor" stroke-width="1" />
              </svg>  
       </div>
</template>

<script>

export default {
     name:'linesvg',
     props:{
          /** 
            数据
          */
          configs:{
               type:Object,
          },
          /**
            容器宽度
           */
          width:{
               type:Number,
               default:()=>{
                    return 300 
               },
               validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    if(typeof value != 'number'){
                          console.warn('width 的值必须是数字，不能携带任何单位传入')
                    }
                    return typeof value == 'number';
                } 
          },

          /**
            容器高度
           */
          height:{
               type:Number,
               default:()=>{
                    return 200 
               },
               validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    if(typeof value != 'number'){
                          console.warn('height 的值必须是数字，不能携带任何单位传入')
                    }
                    return typeof value == 'number';
                } 
          },
         
        
         
     },
     data(){
         return {
              Yline:[],    // 纵轴配置   
              XlineText:[],// 横着标题
              YlineNums:[],// 纵轴标数 
              barLine:[],  // 标块样式
              topText:[],  // 顶部文字
              fontSize:11, // 标准字体
              offsetY:15,  // 纵向偏移
              offsetX:25,  // 横向偏移

             /**
              * @description: 配置数据 
              * @param {Object}
              * @return {*}
              */             
             dataConfig:{
                   /**
                     * @description 横向坐标数据
                     * @type {Object<String>}
                     * @default Yline = {}
                     */
                   Yline:{
                        textcolor:'#008c8c',
                        lineColor:'#008c8c',
                        fontSize:'11',
                   }, 
                     /**
                     * @description Chart data
                     * @type {Object<String>}
                     * @default Xline = {}
                     */
                   Xline:{
                        textcolor:'#008c8c',
                        lineColor:'#008c8c',
                        fontSize:'11',
                   },
                   /**
                    * @description: 图块颜色
                    * @param {Object<string | Object>}
                    * @return {*}
                    */                   
                   barStyle:{
                         areaColor:'#008c8c',
                         textStyle:{
                              color:'#008c8c',
                              fontSize:'12',
                              show:true
                            } 
                   },
                   /**
                    * @description:  logo 需要将图片文件放在项目静态目录下才能正常使用 如果vue2.0需要将图片文件放在static下/vue3.0放在public下  
                    * @param {*}    
                    * @return {*}    放在public下 引入实列 ‘/logo.png’
                    */                   
                   imageSrc:'',
                    /**
                     * @description: 图表数据
                     * @type {Array<Object>}
                     * @return {*}
                     */                    
                   data:[],

             }, 
             /**
              * @description: 克隆数据 
              * @param {*}
              * @return {*}
              */              
             mergedConfig:{}
         }  
     },
     mounted(){
          let { ObjAssign,configs,dataConfig } = this;
          this.$nextTick(()=>{
                ObjAssign(dataConfig,configs);    
          }) 
     },
     methods:{
          /**
           * @description: 数据合并
           * @param {*} data1 目标数据
           * @param {*} data2 源数据
           * @return {*}
           */         
          ObjAssign(data1,data2){
                let { initDatas } = this;
                //  初始化需要对默认数据进行赋值  
                this.dataConfig = this.mergedConfig = Object.assign(data1,data2);
                initDatas();
          },
          /**
           * @description: 初始化配置 
           * @param {*}
           * @return {*}
           */          
          initDatas(){
               let { filterYline,filterXline,mergedConfig } = this;
               let { data } = mergedConfig;
               let sortarr = [];
               data.forEach((item)=>{
                sortarr.push(item.type)
                })
                // 排序
                let len2 = sortarr.length-1;
                let tmp=null;
                for(var j=0; j<len2; j++){          //循环9次
                    for(var i=0; i<len2-j; i++){    //每次比较10-j-1次数
                    if(sortarr[i]>sortarr[i+1]){
                        tmp = sortarr[i+1];
                        sortarr[i+1] = sortarr[i];
                        sortarr[i] = tmp;
                    }
                }
             }
             filterYline(sortarr[len2]);
             filterXline(sortarr[len2]);
          
          },
          /**
           * @description: 处理纵向数据 
           * @param {*} Maxnum 最大值
           * @return {*}
           */          
          filterYline(Maxnum){
             
                   let num = Maxnum; 
                    var yline = num+Math.abs(5-(num%5));
                    if(num%5==0){
                        yline = num;
                    }
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
                            this.Yline.push(obj);
                            this.YlineNums.push(obj2);
                        }
          },
          /**
           * @description: 处理横向数据 
           * @param {*} Maxnum 最大值
           * @return {*}
           */          
          filterXline(Maxnum){
                    let { mergedConfig,offsetY,height,width,offsetX } = this;
                    let { data } = mergedConfig;
                    let len = data.length;
                    let num = Maxnum;                                          //最大值
                    var yline = num+Math.abs(5-(num%5));
                    if(num%5==0){
                        yline = num;
                    }
                                //  设置 主子 和 横坐标文字位置
                    data.forEach((item,index)=>{
                    
                        let h = (Math.round(item.type/yline * 10000) / 100.00); // 计算高度占比
                        let outOffets = 15;                                     // 自适应X轴
                        let obj = {
                                value:item.type,
                                name:item.name,
                                y:height-(h/100*height)+offsetY,                 // 纵坐标 必须高度-高度百分比==实际高度
                                h:h/100*height,
                                w:parseInt(width/len)-20,                        // 计算 自适应宽度
                                x:parseInt(width/len)*index+outOffets+offsetX    // 计算 自适应横向间隔
                        }
                        let obj2 = {
                                 // 横坐标=标块的横坐标+自身宽度的1/2
                                 x:parseInt(width/len)*index+outOffets+offsetX+((parseInt(width/len)-20)/2),
                                 y:height-(h/100*height),
                                 value:item.type
                        }
                        this.topText.push(obj2);
                        this.barLine.push(obj);
                        this.XlineText.push(obj);
                        
                    })
          }
        
     }
}
</script>

<style>

</style>