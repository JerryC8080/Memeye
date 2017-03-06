import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

let space = {
    newSpace: 0,
    oldSpace: 0,
    codeSpace: 0,
    mapSpace: 0,
    largeObjectSpace: 0,
}

function caculateData(type, val) {
    space[type] = val;
    return {
        labels: [
            'newSpace',
            'oldSpace',
            'codeSpace',
            'mapSpace',
            'largeObjectSpace',
        ],
        datasets: [
            {
                label: 'Space Used Percent',
                backgroundColor: [
                    '#9CCC65',
                    // 'rgba(156, 204, 101, 0.8)',
                    '#42A5F5',
                    // 'rgba(33, 150, 243, 0.8)',
                    '#5C6BC0',
                    '#FFCA28',
                    '#8D6E63',
                ],
                borderColor: [
                    '#9CCC65',
                    '#42A5F5',
                    '#5C6BC0',
                    '#FFCA28',
                    '#8D6E63',
                ],
                borderWidth: 2,
                data: [
                    space.newSpace,
                    space.oldSpace,
                    space.codeSpace,
                    space.mapSpace,
                    space.largeObjectSpace,
                ],
            },
        ]
    };
}

let bar = Bar.extend({
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, {
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        return Math.floor(item.xLabel * 100) / 100 + ' %';
                    }
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            },
            title: {
                display: true,
                text: 'Space Used Percent',
            },
            animation: false,
        }, 'horizontalBar');
    }
});
bar.caculateData = caculateData;

export default bar;