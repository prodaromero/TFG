/******************
  ACOUSTIC FORMULAS
*********************/

function difference(nf, np) {return Math.pow(nf - np, 2);}

function distance(surceObject, microphoneObject) {

  // X axis difference
  var xDifference = difference(surceObject.long, microphoneObject.long);
  // Y axis difference
  var yDifference = difference(surceObject.wide, microphoneObject.wide);
  // Z axis difference
  var zDifference = difference(surceObject.high, microphoneObject.high);

  return Math.sqrt(xDifference + yDifference + zDifference);
}

function minDistance(v) { return v*2;}

/* Function to verify if points are in correct position */
function isCorrect(dis, dmin) { return dis > dmin;}

function compliesRegulation(object) {
  return (object.long >= 1) && (object.wide >= 1) && (object.high >= 1);
}

function isInside(pos,stop) {
  return ((pos >= 0) && (pos <= stop))
}

function isSameType(x,y,z) {return ((typeof(x) && typeof(y) && typeof(z)) === "number");}

/* Function to get the position */
function getPosition(object,x,y,z) {
    object.long = parseFloat(document.getElementById(x).value);
    object.wide = parseFloat(document.getElementById(y).value);
    object.high = parseFloat(document.getElementById(z).value);

    if (!isSameType(object.long,object.wide,object.high)) {
    object.long = 0;
    object.wide = 0;
    object.high = 0;
    alert("Por favor, intruduzca valores validos")
  }

  if (!compliesRegulation(object)) {
    alert("Recuerda que según la normativa UNE-ISO 3382, la distancia mínima entre micro/fuente y cualquier superficie, debe ser de al menos 1 m.\n Revise los datos por favor.")
  }

  return object;
}

function getMinDistance(roomObject,reverTime) {
  var volume = roomObject.volume();
  var dmin = 2*Math.sqrt(volume/(speedSound*reverTime));
  return dmin;
}
