const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('results.txt'),
  output: fs.createWriteStream('sorted.txt'),
  console: false
});

readInterface.on('line', (line) => {
  if (line.indexOf('404') === -1) {
    fs.appendFile('sorted.txt', `${line}\n`, (err) => {
      if (err) console.log(err)
    })
  }
})