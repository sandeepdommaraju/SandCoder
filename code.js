var fs = require('fs');
var app = require('express');

// create Solution.java file with content from req
exports.compile = function(javacode, response){
	console.log('test compilation');
	console.log(javacode);

	//create Solution.java
	//compile and return the result
	createSrcFile(javacode);

	//response.writeHead(200, {'Content-Type': 'text/html'});
	compiler(response);

}

function createSrcFile(code){

	console.log('lets create Solution.java !!');
	fs.writeFile('Solution.java', code, function(err){
		if(err){
			return console.log(err);
		}
		console.log('saved java file!');
	});

}

function compiler(response){

	var terminal = require('child_process').spawn('bash');

	terminal.stdout.on('data', function(data){
		console.log('stdout: '+ data);
	});

	terminal.stderr.on('data', function(data) {
    	console.log('ERROR:', String(data));
    	//response.write('Compilation Error: ', String(data));
    	//response.send('Compilation Error: ', String(data));
    	response.send(String(data));
   });

	terminal.on('exit', function(exitcode){
		console.log('child process exited with code: '+exitcode);
	});

	setTimeout(function(){
			console.log('SENDING');
			terminal.stdin.write('javac Solution.java');
			terminal.stdin.end();
	},1000)
	console.log('Got all files!');

}
