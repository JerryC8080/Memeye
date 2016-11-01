/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:34:12
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-11-01 16:49:17
 * @Description
 */

import chalk from 'chalk';

const logMap = {
    'err': 0,
    'warn': 1,
    'info': 2,
    'debug': 3,
};

function log(level, message) {
    let levelOption = global.options.log.level;
    if (typeof levelOption === 'string') {
        levelOption = logMap[levelOption];
    }

    let index = logMap[level];

    if (index <= levelOption) {
        console.log(message);
    }
}

export default {
    err: (token) => log('err', chalk.styles.red.open + token + chalk.styles.red.close),
    warn: (token) => log('warn', chalk.styles.yellow.open + token + chalk.styles.yellow.close),
    debug: (token) => log('debug', chalk.styles.blue.open + token + chalk.styles.blue.close),
    info: (token) => log('info', chalk.styles.green.open + token + chalk.styles.green.close),
};