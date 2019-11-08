import { Line } from 'vue-chartjs'
import variables, { colors } from '@/config/variables'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'primary'
    },
  },
  mounted () {
    let ctx = this.$refs.canvas.getContext('2d');
    let chartdata = this.chartdata;
    
    chartdata.datasets = chartdata.datasets.map((set, index) => {
      let grd = ctx.createLinearGradient(200, 0, 200, 300)
      grd.addColorStop(0, colors[index]);
      grd.addColorStop(1, 'rgba(255,255,255,0)');

      Object.assign(set, {
        borderColor: colors[index],
        backgroundColor: grd,
        fill: true,
      })

      return set;
    })

    this.renderChart(chartdata, this.options)
  }
}