var fs = require('fs')
var parser = require('url')
var handlerFactory = require('./handlers.js')

var handlers = {};

exports.clear = function() { // reset all routes using global variable handler
	handlers = {};
}

exports.register = function(url, method) { // url and callback function in a handler for future use
	handlers[url] = handlerFactory.createHandler(method);
}

exports.route = function(req) { // return the handler class that contains the function to be executed for this url
	var url = parser.parse(req.url, true);
	handler = handlers[url.pathname];
	if (!handler) handler = this.missing(req);
	return handler
}

exports.missing = function(req) { // create a create and store method for the route if none has been registered
	var url = parser.parse(req.url, true)
	var path = __dirname + "/../client/public" + url.pathname + ".html"
	console.log('pather')
	console.log(path)
	try {
		data = fs.readFileSync(path) //where does it error here?
		mime = req.headers.accepts || "text/html"
		return handlerFactory.createHandler(function(req, res){
			res.writeHead(200, {"Content-Type":"text/html"})
			res.write(data)
			res.end()
		})
	} catch(e) {
		return handlerFactory.createHandler(function(req, res){
			res.writeHead(400, {"Content-Type":"text/plain"})
			res.write("No data was found for the requested url " + url.pathname)
			res.end()
		})
	}
}



