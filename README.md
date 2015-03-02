A Application Management System that uses node.js, angular.js, mongo db and express.js

Requires Node.js and Mongodb installed.

To install node, go to http://nodejs.org/ and click the download button.

To install mongodb, go to http://www.mongodb.org/downloads and choose your os. 

To test the API, hit the db with this curl command:
<pre><code>
curl -v -H "Content-Type: application/json" -XPOST --data "{\"username\":\"bigbassroller\", \"body\":\"node rocks\"}" localhost:3000/api/posts</code></pre>

Create a model inside the /models folder like so:<br>
<pre><code>
var db = require('../db')
var Post = db.model('Post', {
	username: { type: String, required: true },
	body: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now}
})
module.exports = Post
</code></pre>

And then add it inside your server.js file:<br>

<pre><code>
var Post = require('./models/post')
app.post('/api/posts', function (req, res, next) {
	var post = new Post({
		username: req.body.username,
		body: req.body.body
	})
	post.save(function (err, post) {
		if (err) { 
			return next(err)
			 }
		res.status(201).json(post)
	})
})
</code></pre>

Then go http://localhost:3000/api/posts to see the post you hit the db with the curl command.

<strong>Layouts</strong> are full page templates consisting of partials stored inside the layouts folder.
Add the layout file to server.js like so (replacing post.html with the name of your template):
<pre><code>
app.get('/', function (req, res) {
	res.sendfile('layouts/posts.html')
})
</code></pre>
Save Post to the api with this code inside your layout file:
<pre><code> 
// Intiate the angular module
var app = angular.module('app', [])
// Create the controller 
app.controller('PostsCtrl', function ($scope, $http) {
$scope.addPost = function () {
  if ($scope.postBody) {
    $http.post('/api/posts', {
      username: 'bigbassroller',
      body: $scope.postBody
    }).success(function (post) {
      $scope.posts.unshift(post)
      $scope.postBody = null
    })
  }
}

$http.get('http://localhost:3000/api/posts')
.success(function (posts) {
  $scope.posts = posts
})
})
</code></pre>