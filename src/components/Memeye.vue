<template>
    <div id="memeye">

        <h1> Wellcome to Memeye !</h1>
        <h2>Indicators Panels</h2>
        <Panel 
            :rss="rss" 
            :heapFree="heapFree" 
            :heapUsed="heapUsed"
            :freeMem="freeMem"
            :totalMem="totalMem"
            :newSpace="newSpace"
            :oldSpace="oldSpace"
            :codeSpace="codeSpace"
            :mapSpace="mapSpace"
        ></Panel>

        <h2>Process Memory Usage</h2>
        <div id="process">
            <process-line class="chart" :chart-data="processLineData" :width="700"  :height="400" ></process-line>        
            <process-doughnut class="chart"  :chart-data="processDoughnutData" :width="300" :height="400" ></process-doughnut>
        </div>

        <h2>v8Data Heap Statistices</h2>
        <div id="v8Data">
            <V8HeapSpaceBar class="chart" :chart-data="v8HeapSpaceBarData" :width="600" :height="450"></V8HeapSpaceBar>                                  
            <V8HeapSpacePie class="chart" :chart-data="v8HeapSpacePieData" :width="400" :height="450"></V8HeapSpacePie>  
        </div>

        <h2>OS Statistices</h2>
        <div id="os">
            <OSMemoryPie class="chart" :chart-data="osMemoryPieData" :width="300" :height="600"></OSMemoryPie>
            <div>
                <OSMemoryLine  class="chart" :chart-data="osMemoryLineData" :width="700" :height="300" ></OSMemoryLine>
                <OSCPUSUsedLine  class="chart" :chart-data="osCPUSUsedLineData" :width="700" :height="300" ></OSCPUSUsedLine>
            </div>
        </div>

    </div>
</template>

<script>
    // import socketio from 'socket.io-client';
    import Panel from './Panel.vue';
    import ProcessDoughnut from './charts/ProcessDoughnut.js';
    import ProcessLine from './charts/ProcessLine.js';
    import OSMemoryPie from './charts/OSMemoryPie.js';
    import OSMemoryLine from './charts/OSMemoryLine.js';
    import OSCPUSUsedLine from './charts/OSCPUSUsedLine.js';
    import V8HeapSpacePie from './charts/V8HeapSpacePie.js';
    import V8HeapSpaceBar from './charts/V8HeapSpaceBar.js';
    import faker from './fake/Faker.js';

    // let io = socketio('http://localhost:23333');

    export default {
        name: 'memeye',
        data: () => {
            return {
                // Process Indicators
                rss: null,
                heapTotal: null,
                heapUsed: null,

                // OS Indicators
                totalMem: null,
                freeMem: null,
                cpus: null,

                // v8Data Indicators
                newSpace: null,
                oldSpace: null,
                codeSpace: null,
                mapSpace: null,
                largeObjectSpace: null,

                // Chart Data Collection
                processDoughnutData: null,
                processLineData: null,
                osMemoryPieData: null,
                osMemoryLineData: null,
                osCPUSUsedLineData: null,
                v8HeapSpacePieData: null,
                v8HeapSpaceBarData: null,
            }
        },
        mounted () {
            faker.call(this);
        },
        components: {
            Panel,
            ProcessDoughnut,
            ProcessLine,
            OSMemoryPie,
            OSMemoryLine,
            OSCPUSUsedLine,
            V8HeapSpacePie,
            V8HeapSpaceBar,
        },
        computed: {
            heapFree: function () {
                return (this.heapTotal - this.heapUsed);
            },
            usedMem: function() {
                return (this.totalMem - this.freeMem);
            }
        },
        watch: {
            heapFree: function(val) {
                this.processDoughnutData = ProcessDoughnut.caculateData(val, this.heapUsed);
            },
            usedMem: function(val) {
                this.osMemoryLineData = OSMemoryLine.caculateData('usedMem', val);
            }
        },
    }
</script>

<style>

#memeye {
    display: flex;
    flex-direction: column;
    justify-content: center;    
}

#process, #os, #v8Data {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
}

#process .chart {
    margin: 30px;
}

#os .chart {
    margin: 30px;
}

#v8Data .chart {
    margin: 30px;
}

</style>