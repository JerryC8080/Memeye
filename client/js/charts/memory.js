/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-25 15:51:22
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-25 18:05:35
 * @Description
 */

import Chart from 'chart.js';
import socket from '../lib/socket';

let chart;

function changeUnit(unit) {
  chart.options.scales.xAxes[0].time.unit = unit;
  chart.update();
}

function testPoint() {
  setInterval(function () {
    let value = Math.floor(Math.random() * 10000);
    let time = Date.now();
    let point = {
      x: time,
      y: value,
    };

    chart.data.datasets[0].data.push(point);
    chart.update();
  }, 500)
}

function listenSocket(controller) {
  controller.on('message', (data) => {
    let {rss, heapTotal, heapUsed} = data;
    let heapUsedPoint = { x: Date.now(), y: heapUsed / 1024 };
    let heapTotalPoint = { x: Date.now(), y: heapTotal / 1024 };
    let rssPoint = { x: Date.now(), y: rss / 1024 };

    chart.data.datasets[0].data.push(heapUsedPoint);
    chart.data.datasets[1].data.push(heapTotalPoint);
    chart.data.datasets[2].data.push(rssPoint);

    chart.update();
  });
}

function render(ctx) {

  if (!ctx) return console.error('Can not found #memory');

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'heapUsed',
          pointStyle: 'dash',
          data: [],
          fill: false,
          backgroundColor: 'rgba(0, 255, 0, 0.4)',
          borderColor: 'rgba(0, 255, 0, 0.4)',
        },
        {
          label: 'heapTotal',
          pointStyle: 'dash',
          data: [],
          fill: false,
          backgroundColor: 'rgba(255, 0, 0, 0.4)',          
          borderColor: 'rgba(255, 0, 0, 0.4)',
        },
        {
          label: 'rss',
          pointStyle: 'dash',
          data: [],
          fill: false,
          borderColor: 'rgba(0, 0, 255, 0.4)',
          backgroundColor: 'rgba(0, 0, 255, 0.4)',
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: 'time',
            position: 'bottom',
            time: {
              unit: 'second',
              unitStepSize: 10,
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            position: 'left',
            ticks: {
              suggestedMax: 5000,
              beginAtZero: true,
            }
          }
        ]
      }
    }
  });

  // testPoint();
  listenSocket(socket.controllers.Process);

  return chart;
}

export default {
  render,
  changeUnit,
}