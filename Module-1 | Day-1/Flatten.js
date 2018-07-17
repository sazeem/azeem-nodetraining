function flatten(unflatObject) {     
  var output={};            
  var rec_key='';

  function flatter(unflatObject,rec_key){
    
    for(let key in unflatObject){                     
      if(typeof(unflatObject[key])!='object'){
          output[rec_key+key]=unflatObject[key];
      }
      else{                 
        var temp_key = rec_key;
        rec_key = rec_key + key + ".";          
        Object.assign(output,flatter(unflatObject[key],rec_key));             
        rec_key = temp_key;
      }
    }
  }
  flatter(unflatObject,rec_key);              
  return output;             
}