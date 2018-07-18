var colorSelected;
var colorRetain;

function colorValue(color){
  colorSelected=color;
}

function colorMe(number){
  document.getElementById(number).style.backgroundColor=colorSelected;
}

function refresh(){
  colorRetain=colorSelected;
  colorSelected='gray';
  for(var index=1;index<10;index++){
    document.getElementById(index).style.backgroundColor=colorSelected;
  }
  colorSelected=colorRetain;
}

