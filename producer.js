const { KafkaClient, Producer } = require('kafka-node');
const { KAFKA_BROKER_URL, KAFKA_BROKER_URL2, KAFKA_BROKER_URL3 } = require('./constants');

const brokers = [KAFKA_BROKER_URL, KAFKA_BROKER_URL2, KAFKA_BROKER_URL3]
const client = new KafkaClient({ kafkaHost: brokers.join(",") });
const producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', () => {
  console.log(`Producer is ready`);
});

producer.on('error', (err) => {
  console.error('Error in Kafka producer:', err);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function sendToKafka(topic, message) {
  var i = 0
  while(i < 100) {
    await sleep(2000);
    producer.send([{ topic: topic, messages: [message] }], (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Message sent to Kafka topic ${i} ${topic}: ${message}`);
      }
    });
    i = i + 1
  }
  
}

module.exports = { sendToKafka };