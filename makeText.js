/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const process = require('process')
const argv = process.argv

const markov = require('./markov')

function newText(text) {
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
}

function textFromFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not read file');
            process.exit(1);
        }
        else {
            newText(data)
        }
    })
}

async function textFromUrl(url) {
    try {
        let res = await axios.get(url);
        let data = res.data;
        newText(data);
    } catch (e) {
        console.log('Could not read from URL');
        process.exit(1);
    }
}


if (argv[2] === 'file') {
    textFromFile(argv[3]);
}
else if (argv[2] === 'url') {
    textFromUrl(argv[3]);
}
else if (argv[2] !== 'file' || argv[2] !== 'url') {
    console.log('Could not recognize source')
}

module.exports = {
    newText,
    textFromFile,
    textFromUrl
}