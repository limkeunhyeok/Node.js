const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: "192.168.99.100:9092" });
const producer = new Producer(client);

let count = 0;

let obj = {
    dateTime: "2020-04-10",
    type: "test",
    data: "coin"
};

let obj2 = {
    dateTime: "2020-04-14",
    type: "test2",
    data: "btc,eth..."
};

producer.on("ready", () => {
    console.log('Example Kafka is ready!!');
    
    setInterval(() => {
        let payloads = [
            { topic: "test", messages: JSON.stringify(obj) },
            { topic: "test2", messages: JSON.stringify(obj2)}
        ];

        producer.send(payloads, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            };
            console.log('count: ', count);
            count += 1;
        });
    }, 5000);
});

producer.on("error", (err) => {
    console.log(err);
});