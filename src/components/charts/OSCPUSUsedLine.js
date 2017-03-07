import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

const records = 100;

let dynamicData = {
    labels: new Array(records),
    cpus: null,
}

let colorPool = [
    '#F44336',  // Red
    '#9C27B0',  // Purple
    '#2196F3',  // Blue
    '#8BC34A',  // Light Green
    '#FFC107',  // Amber
    '#CDDC39',  // Lime
    '#00BCD4',  // Cyan
];

function caculateData(cpus) {
    let now = new Date();

    let data = {
        labels: dynamicData.labels,
        datasets: [],
    };

    // Initialize cpus
    if (!dynamicData.cpus) {
        dynamicData.cpus = cpus.map(() => new Array(100));
    }

    cpus.forEach(function (item, index) {
        let used = computedUsed(item.times);
        dynamicData.cpus[index].shift();
        dynamicData.cpus[index].push(used);

        data.datasets.push({
            label: `cpu ${index + 1}`,
            pointStyle: 'line',
            fill: false,
            borderColor: colorPool[index],
            backgroundColor: colorPool[index],
            data: dynamicData.cpus[index],
        });
    });

    return data;
}

function computedUsed(value) {
    var total = value.user + value.nice + value.sys + value.idle + value.irq;
    var cpu = ((total - value.idle) / total) * 100;
    return cpu;
}

let line = Line.extend({
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, {
            title: {
                display: true,
                text: 'CPUs Used',
            },
            tooltips: {
                callbacks: {
                    label: (item, data) => {
                        let label = data.datasets[item.datasetIndex].label;
                        return label + ': ' + Math.floor(item.yLabel * 100) / 100 + ' %';
                    }
                }
            },
            animation: false
        })
    }
});

line.caculateData = caculateData;

export default line;
