import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

function caculateData(heapFree, heapUsed) {
  heapFree = heapFree / 1024 / 1024;
  heapUsed = heapUsed / 1024 / 1024;

  return {
    labels: [
      "heapFree",
      "heapUsed",
    ],
    datasets: [
      {
        data: [heapFree, heapUsed],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FF6384",
        ]
      }]
  };
}

let doughnut = Doughnut.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, {
      title: {
        display: true,
        text: 'Process Memory Stat',
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            let val = data.datasets[item.datasetIndex].data[item.index];
            return Math.floor(val * 100) / 100 + ' MB';
          }
        }
      },
      animation: false,
    })
  }
});

doughnut.caculateData = caculateData;

export default doughnut;