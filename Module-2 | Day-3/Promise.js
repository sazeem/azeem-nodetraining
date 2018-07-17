var fs = require('fs');

var readFile1 = function(){
		
	return new Promise((success,error) =>{

    fs.readFile('file1.txt', function(err, data) {
      if(err) 
        return error(err);
      else
        return success(data);

    });    
  });	
};

var appendFile = function(data){

  return new Promise((success,error) => {
  
    fs.appendFile('file2.txt',data, function (err) {     
      
      if (err)
        return error(err);
      
      else {
        console.log('Content of file1 appended to file2!'); 
        return success();
      }
    });
  });
}; 
var readFile2 = function(){
    
  return new Promise((success,error) => {

    fs.readFile('file2.txt', function(err, data) {
      if(err) 
        return error(err);
      else{
        console.log("File2 read!")
        success(data);
      }
    });    
  }); 
};

var writeFile = function(data){

  return new Promise((success,error) => {
  
    fs.writeFile('file3.txt', data, function (err) {        
      
      if (err)
        return error(err);

      else{            
        console.log('Content of file2 saved to file3!');
        return success();
      }

    });
    });
};

var errorCallback = function(err){
  console.log(err);
};


readFile1()
.then(data => appendFile(data))
.then(readFile2)
.then(result => writeFile(result))
.catch(errorCallback);