const chalk = require('chalk');

module.exports = {
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