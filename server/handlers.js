Handler = function (method) {
	this.process = function(req, res) {
		params = null;
		return method.apply(this, [req,res,params]) // plug in current req, res to method supplied from earlier and execute
	}
}

exports.createHandler = function(method) {
	return new Handler(method);
}