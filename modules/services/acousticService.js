/******************
  ACOUSTIC FORMULAS
*********************/

function difference(nf, np) {
  return Math.pow(nf - np, 2);
}

function distance(s, m) {

  // X axis difference
  var xd = difference(s[0], m[0]);
  // Y axis difference
  var yd = difference(s[1], m[1]);
  // Z axis difference
  var zd = difference(s[2], m[2]);

  return Math.sqrt(xd + yd + zd);
}

function minDistance(v) { return v*2;}

/* Function to verify if points are in correct position */
function isCorrect(dis, dmin) { return dis > dmin;}

function isInside(microPos,maxLong) {
  return ((microPos >= 0) && (microPos <= maxLong))
}

function isSameType(x,y,z) {return ((typeof(x) && typeof(y) && typeof(z)) === "number");}

/* Function to get the position */
function getPosition(a,b,c) {
  //var ps = new Array(3);
  var x = parseFloat(document.getElementById(a).value);
  var y = parseFloat(document.getElementById(b).value);
  var z = parseFloat(document.getElementById(c).value);

  if (!isSameType(x,y,z)) {
    x = 0;
    y = 0;
    x = 0;
  }

  return Array(x,y,z);
}

function getVolume(v) {
  return v[0]*v[1]*v[2];
}

function getMinDistance(v,t) {
  var c = 341;
  console.log(v, t);
  var vol = getVolume(v)
  var dmin = 2*Math.sqrt(vol/(c*t));
  console.log("d MINIMA " + dmin);
  return dmin;
}
