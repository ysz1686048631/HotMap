<!--
 * @Author: your name
 * @Date: 2021-05-20 15:11:52
 * @LastEditTime: 2021-05-20 16:37:39
 * @LastEditors: 圆环进度条
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\components\temps\components\circelsvg\index.vue
-->
<template>
     <div>
          <svg :width="width" :height="height">
                 <!-- 凹槽 -->
                <circle class="line"  
                :cx="(width/2)" 
                :cy="(height/2)" 
                :r="(width-dataConfig.borderWidth*2)/2" 
                :stroke-width="dataConfig.borderColor"  
                :stroke="dataConfig.fluteStyle.areaColor" 
                stroke-linejoin="round" 
                stroke-linecap="round"
                :stroke-dasharray="[girth, girth]"
                />
                <!-- 进度条 -->
                <circle 
                fill="#fff" 
                :cx="(width/2)" 
                :cy="(height/2)" 
                :r="(width-dataConfig.borderWidth*2)/2"  
                :stroke-width="dataConfig.borderWidth"  
                :stroke="dataConfig.propressStyle.areaColor" 
                :stroke-dasharray="[propress, girth]"
                stroke-linejoin="round" 
                stroke-linecap="round"
                
                />
                <!-- 数字 -->
                    <text
                      text-anchor="middle"
                      :x="(width)/2"
                      :y="(height)/2+dataConfig.textStyle.fontSize/2"
                      :fill="dataConfig.textStyle.color"
                      :font-size="dataConfig.textStyle.fontSize"
                     >
                      {{ dataConfig.propressNum }}
                    </text>
          
              </svg> 
     </div>
</template>

<script>
export default {
    name:'circelsvg',
    props:{
         /**
          * @description: 宽度 
          * @param {Number}
          * @return {*}
          */        
         width:{
              type:Number,
              default:()=>{
                   return 100; 
              }
         },
         /**
          * @description: 高度 
          * @param {Number}
          * @return {*}
          */         
         height:{
              type:Number,
              default:()=>{
                   return 100; 
              }
         },
         /**
          * @description: 整体配置 
          * @param {Object<String | Object>}
          * @return {*}
          */           
         configs:{
               type:Object,
               default:()=>{
                     return {}
               }
         },
            
    },
    data(){
         return {
             /**
              * @description: 默认配置 
              * @param {*}
              * @return {*}
              */             
             dataConfig:{
                  borderWidth:10,
                  /**
                   * @description: 进度条样式
                   * @param {*}
                   * @return {*}
                   */                  
                  propressStyle:{
                         areaColor:'#008c8c'    
                  },
                  /**
                   * @description: 凹槽样式
                   * @param {*}
                   * @return {*}
                   */                  
                  fluteStyle:{
                         areaColor:'#008c8c'
                  },
                  /**
                   * @description: 文字样式
                   * @param {*}
                   * @return {*}
                   */                  
                  textStyle:{
                         color:'#008c8c',
                         fontSize:10
                  },
                  /**
                     * @description: 进度（%）
                     * @param {*}
                     * @return {*}
                     */  
                    propressNum:{
                        type:String,
                        default:()=>{
                                return '10%'; 
                        }
                    }
                                  
                  
             },
             /**
              * @description: 克隆数据--浅克隆 
              * @param {*}
              * @return {*}
              */              
             mergedConfig:{},
             /**
              * @description: 进度值 
              * @param {*}
              * @return {*}
              */             
            
             girth:0,         // 圆周长
             propress:0,      // 进度  
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
           * @description: 初始化数据
           * @param {*}
           * @return {*}
           */          
          initDatas(){
                  let { mergedConfig } = this;
                  let pronum = mergedConfig.propressNum;                          // 数字 
                      pronum = parseInt(pronum.replace(/%$/g,''));
                  let r = (this.width-mergedConfig.borderWidth*2)/2;              // 半径  
                  this.girth = 2*3.14*r;  // 圆周长 2 π r   
                  this.propress = Math.round((pronum/100) * (this.girth));      // 进度 
          }
    }
}
</script>

<style>

</style>