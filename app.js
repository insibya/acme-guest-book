const http = require('http');
const fs = require('fs');

const readFileJSON = async (file) => {
	const data = await readFile(file);
	return JSON.parse(data);
};

const readFile = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data.toString());
			}
		});
	});
};

const server = http.createServer(async (req, res) => {
	try {
		if (req.url === '/') {
			const html = await readFile('./index.html');
			res.write(html);
			res.end();
		} else if (req.url === '/api/guests') {
			const guests = await readFileJSON('./guests.json');
			res.write(JSON.stringify(guests));
			res.end();
		}
	} catch (ex) {
		res.statusCode = 500;
		res.write(ex.message);
		res.end();
	}
});

server.listen(3000);
