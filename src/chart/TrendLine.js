import { Line } from 'vue-chartjs'
import variables from '@/config/variables'

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
        type: String,
        default: 'primary'
    },
    suggestedMax: {
        type: Number,
        default: 0,
    },
    dark: {
        type: Boolean,
        default: false,
    }
  },
  mounted () {
    let ctx = this.$refs.canvas.getContext('2d');
    let grd = ctx.createLinearGradient(200, 0, 200, 150)
    grd.addColorStop(0, variables[this.type]);

    this.dark
     ? grd.addColorStop(1, 'rgba(8, 0, 51,0)')
     : grd.addColorStop(1, 'rgba(255,255,255,0)')

    this.renderChart({
        labels: this.data,
        datasets: [
            {
                data: this.data,
                borderColor: variables[this.type],
                backgroundColor: grd,
                pointRadius: 0,
                fill: true,
            }
        ]
    }, {
        layout: {
            padding: {
                top: 10,
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            displayColors: false,
            callbacks: {
                title: (tooltipItem, data) => {
                    return null
                }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false,
                ticks: {
                    suggestedMax: this.suggestedMax,
                }
            }],
        }
    })
  }
}