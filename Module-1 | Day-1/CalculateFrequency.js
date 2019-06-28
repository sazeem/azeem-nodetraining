var CalculateFrequency = function(string) {

  var array = string.split("");
  var set = new Set(array);
  var newArray = [...set];
  var output = {};
  var letters = /^[A-Za-z]+$/;

  var charFreq = function(array,char){
      var count = 0;
      for (var index=0; index<array.length; index++){
        if (char==array[index]){
          count+=1;
        }
      }
      return count;
  };

  for (var index = 0;index < newArray.length;index++){      
      var char = newArray[index];
      if(char.match(letters))
        output[char] = charFreq(array,char);
      else
        continue;
  }    
  return(output);
};