import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const records = 100;

let dynamicData = {
    labels: new Array(records),
    freeMemData: new Array(records),
    usedMemData: new Array(records),
}

function caculateData(type, value) {
    let now = new Date();

    dynamicData[`${type}Data`].shift();
    dynamicData[`${type}Data`].push(value / 1024 / 1024);

    return {
        labels: dynamicData.labels,
        datasets: [
            {
                label: 'freeMem',
                pointStyle: 'line',
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                data: dynamicData.freeMemData,
            },
            {
                label: 'usedMem',
                pointStyle: 'line',
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                data: dynamicData.usedMemData,
            }
        ]
    };
}

let line = Line.extend({
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
                    label: (item) => (Math.floor(item.yLabel * 100) / 100 + ' MB')
                }
            },
            animation: false
        })
    }
});

line.caculateData = caculateData;

export default line;

