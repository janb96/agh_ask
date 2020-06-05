#!/usr/bin/env node

let amqp = require('amqplib/callback_api');
let temperature = require("./Temperature");
let mongo_db_connection = require("./connect_mongoose");
let moment = require('moment');

const opt = { credentials: require('amqplib').credentials.plain('user', 'bitnami') };

function addToDatabase(tempData) {

    const temp = {
        temperature: JSON.parse(tempData),
        dateOfTemperature: moment()
    }

    temperature.create(temp, function (err, response) {
                if(err) {
                    console.log(err);
                }
                console.log("\nTEMPERATURE ADDED TO THE DATABASE\n");
    });

}

amqp.connect('amqp://rabbitmq', opt, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = 'temperature';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log("TEMPERATURE:\n");
            console.log(msg.content.toString());
            addToDatabase(msg.content.toString());
        }, {
            noAck: true
        });
    });
});
