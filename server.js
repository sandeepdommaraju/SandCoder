var path = require('path');
var fs = require('fs');
var express = require('express');
var codethis = require('./code'); 
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/newcoder', function(req, resp){
	console.log('inside foo from bodyParser');
	codethis.compile(req.body.name, resp);
});

app.get('/', function(req, res){
	console.log(req.body)
	res.sendFile('foo.html', { root: path.join(__dirname, '../coder') });

});

app.post('/foo', function(req, resp){
	res.writeHead(200, { 'Content-Type': 'text/plain' });
    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });
    res.end('callback(\'{\"msg\": \"OK\"}\')');
});


app.listen(5420);
console.log('Listening on port 5420...');
