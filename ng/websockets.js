angular.module('app')
.service('WebSocketSvc', function ($rootScope, $timeout) {
	var connection
	this.connect = function () {
		var url = 'ws://localhost:3000'
		connection = new WebSocket(url)

		connection.onopen = function () {
			console.log('WebSocket connected')
		}

		connection.onmessage = function (e) {
			console.log(e)
			console.log('On message event')
			var payload = JSON.parse(e.data)
			$rootScope.$broadcast('ws:' + payload.topic, payload.data)
		}

	}
	this.send = function (topic, data) {
		var json = JSON.stringify({topic: topic, data: data})
		connection.send(json)
	}
}).run(function (WebSocketSvc) {
	WebSocketSvc.connect()
})




