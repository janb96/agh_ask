#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const axios = require('axios');

async function getTemperature(min, max) {

	let temperature = await axios.get("https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02");
	if(temperature.data) return temperature.data;
	return "ERROR";
	
}

function sendToQueue(temperature) {

	const opt = { credentials: require('amqplib').credentials.plain('user', 'bitnami') }

	amqp.connect('amqp://rabbitmq', opt, function(error0, connection) {
	    if (error0) {
		throw error0;
	    }
	    connection.createChannel(function(error1, channel) {
		if (error1) {
		    throw error1;
		}

		var queue = 'temperature';
		var msg = temperature;

		channel.assertQueue(queue, {
		    durable: false
		});
		channel.sendToQueue(queue, Buffer.from(msg));

		console.log(msg);
	    });
	    setTimeout(function() {
		connection.close();
	    }, 500);
	});
	
}

async function start() {
	let temperature = await getTemperature();
	console.log(temperature);
	sendToQueue(JSON.stringify(temperature));
}

setInterval(() => {
	start();
}, 10000)








