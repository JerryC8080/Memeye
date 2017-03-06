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

        <h2>V8 Heap Statistices</h2>
        <div id="v8">
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
    import socketio from 'socket.io-client';
    import Panel from './Panel.vue';
    import ProcessDoughnut from './charts/ProcessDoughnut.js';
    import ProcessLine from './charts/ProcessLine.js';
    import OSMemoryPie from './charts/OSMemoryPie.js';
    import OSMemoryLine from './charts/OSMemoryLine.js';
    import OSCPUSUsedLine from './charts/OSCPUSUsedLine.js';
    import V8HeapSpacePie from './charts/V8HeapSpacePie.js';
    import V8HeapSpaceBar from './charts/V8HeapSpaceBar.js';

    let io = socketio('http://localhost:23333');

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

                // V8 Indicators
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
            io.on('indicators:rss', msg => {
                this.rss = msg;
                this.processLineData = ProcessLine.caculateData({type: 'rss', value: msg});                                
            });
            io.on('indicators:heapTotal', msg => {
                this.heapTotal = msg;
                this.processLineData = ProcessLine.caculateData({type: 'heapTotal', value: msg});                
            });
            io.on('indicators:heapUsed', msg => {
                this.heapUsed = msg
                this.processLineData = ProcessLine.caculateData({type: 'heapUsed', value: msg});                
            });
            io.on('indicators:freeMem', msg => {
                this.freeMem = msg;
                this.osMemoryPieData = OSMemoryPie.caculateData(this.freeMem, this.usedMem);
                this.osMemoryLineData = OSMemoryLine.caculateData('freeMem', this.freeMem);                
            });
            io.on('indicators:totalMem', msg => {
                this.totalMem = msg;
                this.osMemoryPieData = OSMemoryPie.caculateData(this.freeMem, this.usedMem);
            });
            io.on('indicators:cpus', msg => {
                this.cpus = msg;
                this.osCPUSUsedLineData = OSCPUSUsedLine.caculateData(this.cpus);
            });
            io.on('indicators:newSpace', msg => {
                this.newSpace = msg;
                this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('newSpace', this.newSpace.space_size);
                this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('newSpace', (msg.space_used_size / msg.space_size) * 100);
            });
            io.on('indicators:oldSpace', msg => {
                this.oldSpace = msg;
                this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('oldSpace', this.oldSpace.space_size);       
                this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('oldSpace', (msg.space_used_size / msg.space_size) * 100);                         
            });
            io.on('indicators:codeSpace', msg => {
                this.codeSpace = msg;
                this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('codeSpace', this.codeSpace.space_size); 
                this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('codeSpace', (msg.space_used_size / msg.space_size) * 100);                                               
            });
            io.on('indicators:mapSpace', msg => {
                this.mapSpace = msg;
                this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('mapSpace', this.mapSpace.space_size); 
                this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('mapSpace', (msg.space_used_size / msg.space_size) * 100);                                               
            });
            io.on('indicators:largeObjectSpace', msg => {
                this.largeObjectSpace = msg;
                this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('largeObjectSpace', this.largeObjectSpace.space_size);    
                this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('largeObjectSpace', (msg.space_used_size / msg.space_size) * 100);                                            
            });
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

#process, #os, #v8 {
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

#v8 .chart {
    margin: 30px;
}

</style>