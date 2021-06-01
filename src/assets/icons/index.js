/*
 * @Author: your name
 * @Date: 2021-03-10 14:04:53
 * @LastEditTime: 2021-05-21 16:06:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2admin\src\assets\icons\index.js
 */
import Vue from 'vue'
import SvgIcon from '../../components/temps/components/iconsvg/src/main'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 使用require.context实现前端工程自动化  自动导入
const req = require.context('./svg', false, /\.svg$/);
// 将自身当作参数传递给req
// const map = {}
// for (const key of req.keys()) {
//     console.log(key,req(key))
// }
// console.log(req.keys().map(req))
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req);

