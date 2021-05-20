<template>
     <div>
         <div id="main2" :style="{width:width,height:height}"></div>  
     </div>
</template>
<script>

export default {
    name:'cateBarCharts',
    props:{
         /**
          * 数据
          */
          addresinfo:{
             default:()=>{[]}
          },
          /**
           * 宽度
           * 
           */
          width:{
              type:String,
              default:()=>{
                    return '100%'
              } 
          },
          /**
           * 高度
           */
          height:{
              type:String,
              default:()=>{
                    return '13rem'
              } 
          },
          /**
           * 图表类别
           */
          typename:{
               type:String,
               default:()=>{
                    return 'bar';
               }
          },
          colorArr:{
               type:Array,
               default:()=>{
                    return [ '#C1E3FF','#ABC7FF','#8DEBFF','#6CACFF' ]; 
               }
          },
          /**
           * 标题
           */
            title:{
               type:String,
               default:()=>{
                   return '柱状图表';
               }
          }
    },
    data(){
         return{
               Ytableline:[],
               Xtableline:[]
         }
    },
    mounted(){
        let { $nextTick,addresinfo,Xtableline,Ytableline,initTabledata } = this;
        $nextTick(()=>{
               console.log(addresinfo);
              for(let value of addresinfo){
                   Ytableline.push(value.type);
                   Xtableline.push(value.name);  
              }
              initTabledata();
        })
      
    },
    methods:{    
          // 产业数据表
       initTabledata(){
                let { Ytableline,Xtableline,typename,colorArr,title } = this;
                const chartDom = document.getElementById('main2');
                const myChart = this.$echarts.init(chartDom);
                let option;
                option ={
                    tooltip:{},
                    title:{
                        text:title,
                        left: 'center',
                        top: 20,
                        textStyle:{
                            color: '#fff',
                            fontSize:'16'
                        }
                    },
                    xAxis:{
                        type:'category',
                        data:Xtableline,
                        textStyle:{
                            fontSize:'8',
                            color: '#fff',
                        },
                         axisLabel:{ interval: 0, rotate: 30,color: '#fff', },
                        

                    },
                    yAxis:{
                        type: 'value',
                        textStyle:{
                            fontSize:'8',
                            color: '#fff',
                        },
                       axisLabel:{ color: '#fff', },
                        

                    },
                    series: [{
                        data:Ytableline,
                        type:typename,
                        itemStyle:{
                                normal:{color:function(params){
                                        // build a color map as your need.
                                        var colorList = colorArr;
                                        return colorList[params.dataIndex]
                                    },label:{
                                        show: true,
                                        position: 'top',
                                        formatter: '{c}'
                                    }
                                }
                         }
                    }]
                };

               myChart.setOption(option);
             
       }
    }
}
</script>

<style>

</style>