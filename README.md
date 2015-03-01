A Application Management System that uses node.js, angular.js, mongo db and express.js

Requires Node.js and Mongodb installed.

To install node, go to http://nodejs.org/ and click the download button.

To install mongodb, go to http://www.mongodb.org/downloads and choose your os. 

TO test the API, hit the db with this curl command:
<curl -v -H "Content-Type: application/json" -XPOST --data "{\"username\":\"bigbassroller\", \"body\":\"node rocks\"}" localhost:3000/api/posts>

Create a model inside the /models folder like so:<br>
<var db = require('../db')
var Post = db.model('Post', {
	username: { type: String, required: true },
	body: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now}
})
module.exports = Post>

And then add it inside your server.js file:<br>

<var Post = require('./models/post')
app.get('/api/posts', function (req, res, next) {
	Post.find(function(err, posts) {
		if (err) {
			return next(err)
		} 
		res.json(posts)
	})
})>