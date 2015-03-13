describe('posts.ctrl', function () {
	beforeEach(module('app'))
	var $scope

	beforeEach(inject(function ($rootScope, $controller) {
		$scope = $rootScope.$new()
		$controller('postsCtrl', {
			$scope: $scope
		})
	}))

	it('loads posts from the service', function () {
		expect($scope.posts).to.have.length(2)
	})
})