const chalk = require('chalk');

module.exports = {
    err: (token) => {
        console.log(chalk.styles.red.open + token + chalk.styles.red.close);
    },
    print: (token) => {
        console.log(chalk.styles.yellow.open + token + chalk.styles.yellow.close);
    },
    log: (token) => {
        if(process.env.LOG == 'print'){
            console.log(chalk.styles.blue.open + token + chalk.styles.blue.close);
        }
    }
}