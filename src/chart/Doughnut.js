import { Doughnut } from 'vue-chartjs'
import variables, { colors } from '@/config/variables'

export default {
  extends: Doughnut,
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
    let chartdata = this.chartdata;

    chartdata.datasets = chartdata.datasets.map((set, index) => {
      Object.assign(set, {
        backgroundColor: colors,
      })

      return set;
    })

    this.renderChart(chartdata, this.options)
  }
}