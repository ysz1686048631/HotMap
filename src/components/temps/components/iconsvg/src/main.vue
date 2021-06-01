<!--
 * @Author: your name
 * @Date: 2021-05-21 09:53:27
 * @LastEditTime: 2021-06-01 09:27:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\components\temps\components\iconsvg\iconsvg.vue
-->
<template>
      <svg class="svgClass" :fill="color" :width="size" :height="size" aria-hidden="true" v-on="$listeners">
           <!-- 注意：需要安装svg-sprite-loader 才能使用引入的svg模块  -->
         <use :xlink:href="iconName" />
     </svg>
</template>

<script>
export default {
    name:'iconsvg',
    props:{
        /**
         * @description: 图表名称 
         * @param {*}
         * @return {*}
         */         
        iconClass:{
             type:String,
             default:()=>{
                  return '#icon-table' 
             }
        },
    /**
     * @description: 图表大小 
     * @param {*}
     * @return {*}
     */ 
        size:{
             type:String,
             default:()=>{
                  return '30' 
             }
        },
    /**
     * @description: 颜色
     * @param {*}
     * @return {*}
     */   
        color:{
             type:String,
             default:()=>{
                  return '#008c8c' 
             }
        },        
    },
    computed:{
         iconName() {
            return `#icon-${this.iconClass}`
            },
    }
}
</script>

<style>

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  /* 
    扩展颜色继承 currentColor
   */
  fill: currentColor; 
  overflow: hidden;
  color: red;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>