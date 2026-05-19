const startKafkaConsumer = async () => {
  // Kafka consumer setup — wire up when KAFKA_BROKERS is configured
  if (!process.env.KAFKA_BROKERS) {
    return;
  }
  console.log('Kafka consumer: not configured yet');
};

module.exports = { startKafkaConsumer };
