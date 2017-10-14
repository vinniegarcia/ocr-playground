const read = require('./src/read/');

read(process.argv[2]).then((txt) => console.log('text: ' + txt));