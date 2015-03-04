angular.module('app')
.controller('PostsCtrl', function ($scope, PostsSvc) {
  $scope.addPost = function () {
    if ($scope.postBody && $scope.postEntry_Title) {
      PostsSvc.create({
        username: 'bigbassroller',
        entry_title: $scope.postEntry_Title,
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