var fs = require('fs')
var sys = require('sys')
var http = require('http')
var parser = require('url')

var router = require('./router')

router.register('/', function(req, res){
	console.log('new file')
	var url = parser.parse(req.url, true)
	data = fs.readFileSync(__dirname + "/../client" + url.pathname + 'public/index.html') 
	res.writeHead(200, {'Content-Type':'text/html'})
	res.write(data)
	res.end()
})

var server = http.createServer(function(req,res){
	handler = router.route(req) // returns instance of handler that corresponds with the given path
	handler.process(req, res) //applies the current request and response to the handler
})

var port = 8080
server.listen(port);
sys.puts('Listening to port ' + port)