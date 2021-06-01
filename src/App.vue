<!--
 * @Author: your name
 * @Date: 2021-04-15 14:33:47
 * @LastEditTime: 2021-05-24 09:59:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \silders\src\App.vue
-->
<template>
  <div id="app">
    <lineSvg :configs="datas" :width="300" :height="100"/>
    <circelsvg :configs="datas2" :width="100" :height="100" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <svg-icon iconClass="bug" color="#f40"></svg-icon>
    <svg-icon iconClass="chart" color="#f40"></svg-icon>
    <div v-for="(item,index) in svgdatas" :key="index">
              <svg-icon :iconClass="item" color="#f40"></svg-icon>  
    </div>


    <div class="avatar">
             <svg  width="100%" height="100%">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke-width="6"  
                    stroke="#ccc"
                    fill="#fff" 
                ></circle>
                <image
                   xlink:href="https://images.cnblogs.com/cnblogs_com/newmiracle/1588319/o_191112022504qrcode_for_gh_3b9ed2775d3c_258%20(1).jpg"
                   x="50"
                   y="50"
                   height="30" 
                   width="30"></image>
            </svg>    
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import lineSvg from './components/temps/components/linesvg/index'; 
import circelsvg from './components/temps/components/circelsvg/index';
 const req = require.context('./assets/icons/svg', false, /\.svg$/)
            const requireAll = requireContext => requireContext.keys()
 
            const re = /\.\/(.*)\.svg/

            const icons = requireAll(req).map(i => {
               
            return i.match(re)[1]
            })
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
               
          },
          svgdatas:[]
       }
  },
  components: {
    // HelloWorld,
    lineSvg,circelsvg
  },
  mounted(){
       
         
            this.svgdatas = icons.splice(0,8);
            
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
.avatar{
    width: 100px;
    height: 100px;
}
</style>
