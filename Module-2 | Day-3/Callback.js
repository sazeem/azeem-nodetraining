var fs = require('fs');


fs.readFile('file1.txt', function(err, data) {
	
	fs.appendFile('file2.txt', data, function (err) {
	
		if (err) throw err;
		
		console.log('Content of file1 appended to file2!');

		fs.readFile('file2.txt', function(err, data) {
	
			fs.writeFile('file3.txt', data, function (err) {
				
				if (err) throw err;
				console.log('Content of file2 saved to file3!');

			});  
	
		});
		
	});
	
});





/*
	fs.open('mynewfile2.txt', 'w', function (err, file) {
  		if (err) throw err;
  		console.log('Saved!');
	});	

	

	fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
  		if (err) throw err;
  		console.log('Updated!');
	});

	fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
	  	if (err) throw err;
  		console.log('Replaced!');
	});

	fs.unlink('mynewfile2.txt', function (err) {
  		if (err) throw err;
  		console.log('File deleted!');
	});

	fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  		if (err) throw err;
  		console.log('File Renamed!');
	});
*/
