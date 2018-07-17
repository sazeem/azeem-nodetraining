function secondLargest(array) {
  var lar=array[0],secLar;

  for (var i = 1; i < array.length; i++) {
    if (array[i] > lar) {
      lar = array[i];
    }
  }
    
  if(array[0]==lar)
      secLar=array[1];
  else
      secLar=array[0];
    
  for (var j = 0; j < array.length; j++) {
    if (array[j] >= secLar && array[j] < lar && secLar != lar) {
      secLar = array[j];
    }
  }

  return secLar;
}
