const secondLargest = function (array) {

  var lar = array[0],secLar;

  for (var index = 1; index < array.length; index++){
    if (array[index] > lar) {
      lar = array[index];
    }
  }

  if(array[0]==lar)
      secLar=array[1];
  else
      secLar=array[0];
    
  for (var index = 0; index < array.length; index++) {
    if (array[index] >= secLar && array[index] < lar && secLar != lar){
      secLar = array[index];
    }
  }
  return(secLar);
}

module.exports = {secondLargest};