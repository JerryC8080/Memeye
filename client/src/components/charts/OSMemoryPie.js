import { Pie, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

function caculateData(freeMem, usedMem) {
    return {
        labels: [
            "freeMem",
            "usedMem",
        ],
        datasets: [
            {
                data: [freeMem, usedMem],
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

let pie = Pie.extend({
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, {
            title: {
                display: true,
                text: 'OS Memory Stat',
            },
            tooltips: {
                callbacks: {
                    label: (item, data) => {
                        let val = data.datasets[item.datasetIndex].data[item.index];
                        return Math.floor(val / 1024 / 1024 * 100) / 100 + ' MB';
                    }
                }
            },
            animation: false,
        });
    }
});
pie.caculateData = caculateData;

export default pie;