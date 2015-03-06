var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ignitor', function () {
	console.log('mongodb connected')
})
module.exports = mongoose