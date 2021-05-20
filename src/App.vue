<!--
 * @Author: your name
 * @Date: 2021-04-15 14:33:47
 * @LastEditTime: 2021-05-20 16:33:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\App.vue
-->
<template>
  <div id="app">
    <lineSvg :configs="datas" :width="300" :height="100"/>
    <circelsvg :configs="datas2" :width="100" :height="100" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import lineSvg from './components/temps/components/linesvg/index'; 
import circelsvg from './components/temps/components/circelsvg/index';
export default {
  name: 'App',
  data(){
       return{
          datas2:{
               propressNum:'70%',
               borderWidth:5,
               propressStyle:{
                         areaColor:'#008c8c'
                             
               },
               fluteStyle:{
                         areaColor:'#ccc'
                  },
         
          }, 
          datas:{
               Xline:{
                   fontSize:'11',
                   color:'#008c8c',
                   lineColor:'#FDEB82',
               },
               Yline:{
                   fontSize:'11',
                   color:'#008c8c',
                   lineColor:'#FDEB82',
               },
               barStyle:{
                    areaColor:['#F78FAD'],
                    textStyle:{
                        color:'#008c8c',
                        fontSize:'12',
                        show:true
                    }
               },
               
               data:[
                        {
                            name:'北京',
                            type:16
                        },{
                            name:'天津',
                            type:28
                        },{
                            name:'北京',
                            type:144
                        },{
                            name:'天津',
                            type:130
                        },{
                            name:'北京',
                            type:10
                        },{
                            name:'北京',
                            type:1000
                        },{
                            name:'天津',
                            type:130
                        },{
                            name:'北京',
                            type:144
                        }
                        ]
               
          }
       }
  },
  components: {
    // HelloWorld,
    lineSvg,circelsvg
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
