import { Pie, mixins } from 'vue-chartjs';
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
                data: [
                    space.newSpace,
                    space.oldSpace,
                    space.codeSpace,
                    space.mapSpace,
                    space.largeObjectSpace,
                ],
                backgroundColor: [
                    '#9CCC65',
                    '#42A5F5',
                    '#5C6BC0',
                    '#FFCA28',
                    '#8D6E63',
                ],
                hoverBackgroundColor: [
                    '#7CB342',
                    '#1E88E5',
                    '#3949AB',
                    '#FFB300',
                    '#6D4C41',
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
                text: 'V8 Heap Sapce',
            },
            tooltips: {
                callbacks: {
                    label: (item, data) => {
                        let val = data.datasets[item.datasetIndex].data[item.index];
                        return Math.floor(val / 1024 * 100) / 100 + ' KB';
                    }
                }
            },
            animation: false,
        });
    }
});
pie.caculateData = caculateData;

export default pie;