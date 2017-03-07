import ProcessDoughnut from '../charts/ProcessDoughnut.js';
import ProcessLine from '../charts/ProcessLine.js';
import OSMemoryPie from '../charts/OSMemoryPie.js';
import OSMemoryLine from '../charts/OSMemoryLine.js';
import OSCPUSUsedLine from '../charts/OSCPUSUsedLine.js';
import V8HeapSpacePie from '../charts/V8HeapSpacePie.js';
import V8HeapSpaceBar from '../charts/V8HeapSpaceBar.js';
import fakeData from './fakeData.json'

function fake() {
    let dataLength = fakeData.length;
    let count = 0;
    setInterval(() => {
        if (count >= dataLength) count = 0;
        let data = fakeData[count];
        count++

        let processData = data[0].value;
        let v8Data = data[1].value;
        let osData = data[2].value;

        // Fake process
        this.rss = processData.rss;
        this.heapTotal = processData.heapTotal;
        this.heapUsed = processData.heapUsed;
        this.processLineData = ProcessLine.caculateData({ type: 'rss', value: this.rss });
        this.processLineData = ProcessLine.caculateData({ type: 'heapTotal', value: this.heapTotal });
        this.processLineData = ProcessLine.caculateData({ type: 'heapUsed', value: this.heapUsed });

        // Fake os
        this.freeMem = osData.freeMem;
        this.totalMem = osData.totalMem;
        this.osMemoryPieData = OSMemoryPie.caculateData(this.freeMem, this.usedMem);
        this.osMemoryLineData = OSMemoryLine.caculateData('freeMem', this.freeMem);

        this.cpus = osData.cpus;
        this.osCPUSUsedLineData = OSCPUSUsedLine.caculateData(this.cpus);

        // Fake v8Data
        this.newSpace = v8Data.heapSpace[0];
        this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('newSpace', this.newSpace.space_size);
        this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('newSpace', (this.newSpace.space_used_size / this.newSpace.space_size) * 100);

        this.oldSpace = v8Data.heapSpace[1];
        this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('oldSpace', this.oldSpace.space_size);
        this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('oldSpace', (this.oldSpace.space_used_size / this.oldSpace.space_size) * 100);

        this.codeSpace = v8Data.heapSpace[2];
        this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('codeSpace', this.codeSpace.space_size);
        this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('codeSpace', (this.codeSpace.space_used_size / this.codeSpace.space_size) * 100);

        this.mapSpace = v8Data.heapSpace[3];
        this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('mapSpace', this.mapSpace.space_size);
        this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('mapSpace', (this.mapSpace.space_used_size / this.mapSpace.space_size) * 100);

        this.largeObjectSpace = v8Data.heapSpace[4];
        this.v8HeapSpacePieData = V8HeapSpacePie.caculateData('largeObjectSpace', this.largeObjectSpace.space_size);
        this.v8HeapSpaceBarData = V8HeapSpaceBar.caculateData('largeObjectSpace', (this.largeObjectSpace.space_used_size / this.largeObjectSpace.space_size) * 100);

    }, 1000);
}

export default fake;