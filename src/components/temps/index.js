/**
 * IMPORT COMPONENTS
 */
import mapcharts from './components/mapCharts';
import catebarCharts from './components/catebarCharts';
import catelineCharts from './components/catelineCharts';
/**
 * USE COMPONENTS
 */
export default function (Vue) {
  Vue.use(catelineCharts);
  Vue.use(catebarCharts);
  Vue.use(mapcharts);

}
