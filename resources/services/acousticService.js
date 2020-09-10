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

function getRandomPoint(max) {
  var rand = getRound2Decimals(Math.random() * max)
  if (rand > max - DisMinimaSurface || rand < DisMinimaSurface) {
    rand = getRandomPoint(max);
  }
  return rand;
}

function getRandomPosition(roomObject) {
  var list = [0.0,0.0,0.0];
  list[0] = getRandomPoint(roomObject.long);
  list[1] = getRandomPoint(roomObject.wide);
  list[2] = getRandomPoint(roomObject.high);
  return list;
}

function getSourceMultiplePoints(roomObject, suggestedObject) {
  suggestedObject.firstSuggestedPoint.source.x = DisMinimaSurface;
  suggestedObject.firstSuggestedPoint.source.y = DisMinimaSurface;
  suggestedObject.firstSuggestedPoint.source.z = DisMinimaSurface;

  suggestedObject.secondSuggestedPoint.source.x = DisMinimaSurface;
  suggestedObject.secondSuggestedPoint.source.y = roomObject.wide - DisMinimaSurface;
  suggestedObject.secondSuggestedPoint.source.z = DisMinimaSurface;

  suggestedObject.thirdSuggestedPoint.source.x = roomObject.long - DisMinimaSurface;
  suggestedObject.thirdSuggestedPoint.source.y = roomObject.wide - DisMinimaSurface;
  suggestedObject.thirdSuggestedPoint.source.z = DisMinimaSurface;

  suggestedObject.fourthSuggestedPoint.source.x = roomObject.long - DisMinimaSurface;
  suggestedObject.fourthSuggestedPoint.source.y = DisMinimaSurface;
  suggestedObject.fourthSuggestedPoint.source.z = DisMinimaSurface;

  getSuggestedMultiplePoints(roomObject, suggestedObject);

}

function getMicroMultiplePoints(roomObject, suggestedObject) {
  var list;
  list = getRandomPosition(roomObject);
  suggestedObject.x = list[0];
  suggestedObject.y = list[1];
  suggestedObject.z = list[2];
}

function getSuggestedMultiplePoints(roomObject, suggestedObject) {
  getMicroMultiplePoints(roomObject, suggestedObject.firstSuggestedPoint.firtsMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.firstSuggestedPoint.secondMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.firstSuggestedPoint.thirdMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.secondSuggestedPoint.firtsMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.secondSuggestedPoint.secondMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.secondSuggestedPoint.thirdMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.thirdSuggestedPoint.firtsMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.thirdSuggestedPoint.secondMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.thirdSuggestedPoint.thirdMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.fourthSuggestedPoint.firtsMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.fourthSuggestedPoint.secondMicro)
  getMicroMultiplePoints(roomObject, suggestedObject.fourthSuggestedPoint.thirdMicro)

}
