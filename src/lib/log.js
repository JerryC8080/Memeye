/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-21 11:34:12
 * @Last Modified by:   JerryC
 * @Last Modified time: 2016-10-21 11:34:12
 * @Description
 */

import chalk from 'chalk';

export default {
    err: (token) => {
        console.log(chalk.styles.red.open + token + chalk.styles.red.close);
    },
    warn: (token) => {
        console.log(chalk.styles.yellow.open + token + chalk.styles.yellow.close);
    },
    debug: (token) => {
        console.log(chalk.styles.blue.open + token + chalk.styles.blue.close);
    },
    info: (token) => {
      console.log(chalk.styles.green.open + token + chalk.styles.green.close);
    }
}