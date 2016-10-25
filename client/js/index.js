/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-24 15:09:42
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-25 16:58:59
 * @Description
 */

import Socket from './lib/socket';
import memoryChart from './charts/memory';

// css
require('../css/style.css');

// init socket
Socket.init();

// render charts
let ctxMemory = document.getElementById('memory');
memoryChart.render(ctxMemory);
window.memoryChart = memoryChart;