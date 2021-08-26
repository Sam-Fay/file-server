const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({
  host: 'localhost', // change to IP address
  port: 4042
});

const askQuestion = (callback) => {
  rl.question(`> `, (answer) => {
    callback(null, answer);
  });
};

client.setEncoding('utf8'); // interpret data as text

client.on('connect', () => {

  client.on('data', (data) => {
    console.log(data);

    askQuestion((error,answer) => {
      if (error) {
        return error;
      } else {
        return client.write(answer);
      }
    });
  });
});

//Add event listener for close events
client.on('close', () => {
  console.log(`Server disconnected`);
  process.exit();
});

//Add listener for error events
client.on('error', error => {
  console.log(`Error : ${error}`);
});