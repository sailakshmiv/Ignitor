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

<strong>Views</strong> are full page templates consisting of partials stored inside the views folder.
Add the layout file to server.js like so (replacing post.html with the name of your template):
<pre><code>
app.get('/', function (req, res) {
	res.sendfile('layouts/posts.html')
})
</code></pre>
Save Post to the api with this code inside your layout file. Here is an example inside a controller function:
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
<strong>To add post on the client</strong> inside your template file add:
<code><pre>
<div ng-controller='PostsCtrl' class='container'>
  <form role='form'>
    <div class='form-group'>
      <div class="input-group">
        <input ng-model="postBody" class='form-control'>
        <span class='input-group-btn'>
          <button ng-click='addPost()' class='btn btn-default'>Add Post</button>
        </span>
      </div>
    </div>
  </form>
</div>
</pre></code>
<strong>Add route to page template inside static.js, inside the controllers folder.</strong>
<pre><code>
router.get('/', function (req, res) {
	res.render('posts.html.ejs')
})
</code></pre>
res.render() calls from the views folder.<br><br>
<strong>To Display Post</strong> Inside controllers/api/ make a file for your controller. Here is an example of post.js:
<pre><code>
var Post = require('../../models/post')
var router = require('express').Router()

router.get('/api/posts', function (req, res, next) {
	Post.find(function(err, posts) {
		if (err) {
			return next(err)
		} 
		res.json(posts)
	})
})

router.post('/api/posts', function (req, res, next) {
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

module.exports = router
</code></pre>
<strong>To disply in reverse order from the server</strong>
<pre><code>
app.get('/api/posts', function (req, res, next) {
	Post.find()
	.sort('-date')
	.exec(function(err, posts) {
		if (err) {
			return next(err)
		}
		res.json(posts)
	})
})
</code></pre>
<strong>To disply in reverse order from the server, inside as controller routed and mounted:</strong>
<pre><code>
var Post = require('../../models/post')
var router = require('express').Router()

router.get('/api/posts', function (req, res, next) {
	Post.find()
	.sort('-date')
	.exec(function(err, posts) {
		if (err) {
			return next(err)
		}
		res.json(posts)
	})
})
</code></pre>
and mount inside server.js like so:
<pre><code>
app.use(require('./controllers/api/posts'))	
</code></pre>

<strong>To disply in reverse order on the client:</strong>
```HTML
<pre>
<div ng-controller='PostsCtrl' class='container'>
  <ul class='list-group'>
    <li ng-repeat="post in posts | orderBy:'-date'" class='list-group-item'>
      <strong>@{{ post.username }}</strong>
      <span>{{ post.body }}</span>
    </li>
  </ul>
</div>
</pre>
```