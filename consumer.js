const { KafkaClient, Consumer } = require('kafka-node');
const { KAFKA_TOPIC, KAFKA_BROKER_URL, KAFKA_BROKER_URL2, KAFKA_BROKER_URL3 } = require('./constants');

const brokers = [KAFKA_BROKER_URL, KAFKA_BROKER_URL2, KAFKA_BROKER_URL3]
const client = new KafkaClient({ kafkaHost: brokers.join(',') });
const consumer = new Consumer(client, [{ topic: KAFKA_TOPIC }], { autoCommit: true });

consumer.on('message', (message) => {
  console.log(`Message received from Kafka topic ${message.topic}: ${message.value}`);
});

consumer.on('error', (err) => {
  console.error('Error in Kafka consumer:', err);
});

module.exports = { consumer };