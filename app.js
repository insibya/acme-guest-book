const http = require('http');

const server = http.createServer((req, res) => {
	try {
		res.write('hello world');
		res.end();
	} catch (ex) {
		res.statusCode = 500;
		res.write(ex.message);
		res.end();
	}
});

server.listen(3000);
