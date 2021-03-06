const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "192.168.99.100:9092" });
const consumer = new Consumer(client, [{ topic: "test", partition:0 }, { topic: "test2", partition:0 }], {
    autoComit: false
});

console.log('Consumer start!!');

consumer.on("message", (message) => {
    let msg = JSON.parse(message.value);
    console.log('-----------------------------')
    console.log(msg);
});
