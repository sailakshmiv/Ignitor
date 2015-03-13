describe('posts.ctrl', function () {
	beforeEach(module('app'))
	var $scope

	var mockPostSvc = {}
	beforeEach(inject(function ($q) {
		mockPostSvc.fetch = function () {
			var deferred = $q.defer()
			deferred.resolve([
				{ username: 'bigbassrollertest', body: 'first post'},
				{ username: 'bigbassrollertest', body: 'second post'}
			])
			return deferred.promise
		}
		mockPostSvc.create = function () {
			var deferred = $q.defer()
			deferred.resolve()
			return deferred.promise
		}
	}))

	beforeEach(inject(function ($rootScope, $controller) {
		$scope = $rootScope.$new()
		$controller('postsCtrl', {
			$scope: $scope,
			PostsSvc: mockPostSvc
		})
	}))

	it('loads posts from the service', function () {
		$scope.$digest()
		expect($scope.posts).to.have.length(2)
	})
})

it('sends a new post to the service', function () {
	$sinon.spy(mockPostsSvc, 'create')
	$scope.post = {body: 'my new post'}
	$scope.addPost()
	expect(mockPostsSvc.create).to.have.been.calledWith({body: 'my new post'})
})