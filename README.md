A Application Management System that uses node.js, angular.js, mongo db and express.js

Requires Node.js and Mongodb installed.

To install node, go to http://nodejs.org/ and click the download button.

To install mongodb, go to http://www.mongodb.org/downloads and choose your os. 

After installing. Start the app with this command:
<pre><code>
nodemon server.js
</code></pre>
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
Then add the api inside controllers/api folder. Example, post.js:<br>
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

Then go http://localhost:3000/api/posts to see the post you hit the db with the curl command.

<strong>Views</strong> are routed inside /controllers/static.js and are called from the /views folder. Add routes like so:
<pre><code>
router.get('/hello-world', function (req, res) {
  res.render('hello-world.html.ejs')
})
</code></pre>
<strong>Saving Posts</strong> Use a post service controller like so, inside the ng/ folder:
<pre><code> 
app.controller('PostsCtrl', function ($scope, PostsSvc) {
  $scope.addPost = function () {
    if ($scope.postBody) {
      PostsSvc.create({
          username: 'bigbassroller',
          body: $scope.postBody
        })
        .success(function (post) {
          $scope.posts.unshift(post)
          $scope.postBody = null
        })
    }
  }
  PostsSvc.fetch()
  .success(function (posts) {
    $scope.posts = posts
  })
})
</code></pre>
<strong>Displaying post</strong> create a service file inside the ng/ folder like so:
<pre><code>
angular.module('app')
.service('PostsSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/posts')
  }
  this.create = function (post) {
    return $http.post('/api/posts', post)
  }
})
</code></pre>
<strong>To add post on the client</strong>. For example inside views/post.html.ejs:
```HTML
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
```
<strong>Add the route to /views/posts.html.ejs page template inside static.js, inside the controllers folder.</strong>
<pre><code>
router.get('/', function (req, res) {
  res.render('posts.html.ejs')
})
</code></pre>
Hint: res.render() calls from the views folder.<br><br>

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
<strong>mount inside server.js</strong> like so:
<pre><code>
app.use(require('./controllers/api/posts')) 
</code></pre>

<strong>To disply in reverse order on the client, post.html.ejs:</strong>
```HTML
<div ng-controller='PostsCtrl' class='container'>
  <ul class='list-group'>
    <li ng-repeat="post in posts | orderBy:'-date'" class='list-group-item'>
      <strong>@{{ post.username }}</strong>
      <span>{{ post.body }}</span>
    </li>
  </ul>
</div>
```

<strong>Gulp File</strong>
Run <pre>gulp dev</pre> to watch both css and js file changes.
Add new css and js files by adding them to their repectitive files inside the gulp file, inside src array.
You can also add task inside the /gulp folder and add them to the gulp dev task inside gulp.js. 
