var db = require('../../db')

describe('making a post', function () {
	it('logs in and creates a new post', function () {
		// go to homepage
		browser.get('http://localhost:3001')
		// click 'login'
		element(by.css('nav .register')).click()
		// fill out and submit login form
		element(by.model('username')).sendKeys('bigbassroller')
		element(by.model('password')).sendKeys('pass')
		element(by.css('form .btn-register')).click()
		// submit a new post on the posts page
		element(by.css('nav .posts')).click()
		var post = 'my new post'
		element(by.model('postBody')).sendKeys(post)
		element(by.css('form .btn-post'))

		// the user should now see their post as the first post on the page
		// after(function () {
		// 	db.connection.db.dropDatabase()
		// })

	})

})