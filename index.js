const { sendToKafka } = require('./producer');
const { consumer } = require('./consumer');

consumer.on('ready', () => {
  console.log('Consumer is ready');
});

sendToKafka('my-topic', 'Hello World 1 2 3');