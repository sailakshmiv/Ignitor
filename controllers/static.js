var express = require('express')
var router  = express.Router()

router.use(express.static(__dirname + '/../assets'))
router.use('/templates', express.static(__dirname + '/../templates'))

router.get('/', function (req, res) {
  res.render('app.html.ejs')
})
router.get('/hello-world', function (req, res) {
  res.render('hello-world.html.ejs')
})

module.exports = router
