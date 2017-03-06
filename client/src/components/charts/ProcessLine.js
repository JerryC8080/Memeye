import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
const records = 100; // second;

let dynamicData = {
    labels: new Array(records),
    rssData: new Array(records),
    heapTotalData: new Array(records),
    heapUsedData: new Array(records),
}

function caculateData({ type, value }) {

    // dynamicData.labels.shift();
    // dynamicData.labels.push(new Date());

    dynamicData[`${type}Data`].shift();
    dynamicData[`${type}Data`].push(value / 1024 / 1024);

    return {
        labels: dynamicData.labels,
        datasets: [
            {
                label: 'heapUsed',
                pointStyle: 'line',
                // fill: false,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                data: dynamicData.heapUsedData,
            },
            {
                label: 'heapTotal',
                pointStyle: 'line',
                // fill: false,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                data: dynamicData.heapTotalData,
            },
            {
                label: 'rss',
                pointStyle: 'line',
                // fill: false,
                borderColor: "rgba(53, 221, 101, 1)",
                backgroundColor: 'rgba(53, 221, 101, 0.4)',
                data: dynamicData.rssData,
            },
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
                text: 'Process Memory Stat',
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

