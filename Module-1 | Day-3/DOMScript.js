let colorSelected;
let colorRetain;

const colorValue = (color) => {
  colorSelected = color;
};

const colorMe = (number) => {
  document.getElementById(number).style.backgroundColor = colorSelected;
};

const refresh = () => {
  colorRetain=colorSelected;
  colorSelected='gray';
  for(var index=1;index<10;index++){
    document.getElementById(index).style.backgroundColor=colorSelected;
  }
  colorSelected=colorRetain;
};

