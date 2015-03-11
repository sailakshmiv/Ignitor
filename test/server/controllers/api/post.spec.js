var api = require('../../support/api')

describe('controllers.api.posts', function () {
	describe('GET /api/posts', function () {
		it('exists', function (done) {
			api.get('/api/posts')
			.expect(200)
			.end(done)
		})
	})
})