var _ = require('lodash')
var ws = require('ws')
var clients = []

exports.connect = function (server) {
	var wss = new ws.Server({server: server})
	wss.on('connection', function (ws) {
		console.log('connected to ws. brace yourself for some websockets!')
		clients.push(ws)
		console.log('pushed ws')
		exports.broadcast('new client joined')
		console.log('broadcasting!')
		ws.on('close', function () {
			_.remove(clients, ws)
		})
		console.log('removed client')
	})
}

exports.broadcast = function (topic, data) {
	var json = JSON.stringify({topic: topic, data: data})
	clients.forEach(function (client) {
		client.send(json)
	})
}
