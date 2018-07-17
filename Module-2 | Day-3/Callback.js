const fs = require('fs');

fs.readFile('file1.txt', (err, data) => {	
	fs.appendFile('file2.txt', data,  (err) => {
		if (err) throw err;
    else
		  console.log('Content of file1 appended to file2!');
		fs.readFile('file2.txt', (err, data) => {
			fs.writeFile('file3.txt', data,  (err) => {				
				if (err) throw err;
        else
				  console.log('Content of file2 saved to file3!');
			});  
		});		
	});	
});
