var unflatObject=  {"flatJSON": false, "i": { "am": { "not": { "so": { "flat": true, "unflat": false } }, "a": "tree" } }, "dates": [ { "day": 1 }, { "day": 8947 } ] };
//output =  {"flatJSON": false, "i.am.not.so.flat": true, "i.am.not.so.unflat": false, "i.am.a": "tree", "dates.0.day": 1, "dates.1.day": 8947 }


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

console.log(flatten(unflatObject));