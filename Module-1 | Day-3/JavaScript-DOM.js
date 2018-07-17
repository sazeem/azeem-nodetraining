var colorSelected;

function colorValue(color){
  colorSelected=color;
}

function colorMe(number){
  document.getElementById(number).style.backgroundColor=colorSelected;
}

function refresh(){
  window.location.reload();
}

