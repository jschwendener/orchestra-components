import { Bar } from 'vue-chartjs'
import variables, { colors } from '@/config/variables'

export default {
  extends: Bar,
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
        backgroundColor: colors[index],
      })

      return set;
    })

    this.renderChart(chartdata, this.options)
  }
}