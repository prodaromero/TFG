/******************
  ACOUSTIC FORMULAS
*********************/

// ** Generales ** \\
function getSurface(height, width) {return height * width;}

function getRound2Decimals(val) {return Math.round(val*100)/100;}

function isCorrectCoef(coef){return ((coef >= 0) && (coef <= 1));}

function difference(nf, np) {return Math.pow(nf - np, 2);}

function isCorrect(dis, dmin) { return dis > dmin;}

function compliesRegulation(object) {return (object.long >= 1) && (object.wide >= 1) && (object.high >= 1);}

function minDistance(v) {return v*2;}

function isInside(pos,stop) {return ((pos >= 0) && (pos <= stop));}

function isSameType(x,y,z) {return ((typeof(x) && typeof(y) && typeof(z)) === "number");}

function isObjectInsideRoom(object, room) {
  return isInside(object.long,room.long) && isInside(object.wide,room.wide) && isInside(object.high,room.high);
}

// ** Funciones getMinDistanceApp ** \\
function distance(surceObject, microphoneObject) {

  // X axis difference
  var xDifference = difference(surceObject.long, microphoneObject.long);
  // Y axis difference
  var yDifference = difference(surceObject.wide, microphoneObject.wide);
  // Z axis difference
  var zDifference = difference(surceObject.high, microphoneObject.high);

  return getRound2Decimals(Math.sqrt(xDifference + yDifference + zDifference));
}

function getPosition(object,x,y,z) {
    object.long = parseFloat(document.getElementById(x).value);
    object.wide = parseFloat(document.getElementById(y).value);
    object.high = parseFloat(document.getElementById(z).value);

    if (!isSameType(object.long,object.wide,object.high)) {
    object.long = 0;
    object.wide = 0;
    object.high = 0;
  }
  return object;
}

function getMinDistance(roomObject,reverTime) {
  var volume = roomObject.volume();
  var dmin = 2*Math.sqrt(volume/(speedSound*reverTime));
  return dmin;
}

// ** Funciones getReverberationTimeApp ** \\
function getRoomSurface(roomObject) {
  return roomObject.surface_wall_a + roomObject.surface_wall_b +
          roomObject.surface_wall_c + roomObject.surface_wall_d +
          roomObject.surface_floor + roomObject.surface_roof;
}

function getRoomAbsortionArea(roomObject,roof,a,b,c,d,floor) {
  return roomObject.surface_roof*roomObject.roof +
                roomObject.surface_wall_a*roomObject.a +
                roomObject.surface_wall_b*roomObject.b +
                roomObject.surface_wall_c*roomObject.c +
                roomObject.surface_wall_d*roomObject.d +
                roomObject.surface_floor*roomObject.floor;
}

function getReverTimeSabine(vol,area_absorcion) {
  var tr_sabine = (sabine_conts*vol)/area_absorcion;
  return getRound2Decimals(tr_sabine);
}

function getReverTimeEyring(roomObject,vol,area_absorcion) {
  var tr_eyring, surface, ln;

  surface = getRoomSurface(roomObject);

  ln = -Math.log(1-(area_absorcion)/surface);

  return getRound2Decimals((eyring_conts*vol)/(surface*ln));
}

function getRoomDimensions(roomObject, x,y,z) {

  roomObject.surface_wall_a = getSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_b = getSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_c = getSurface(roomObject.wide,roomObject.high);
  roomObject.surface_wall_d = getSurface(roomObject.wide,roomObject.high);
  roomObject.surface_floor  = getSurface(roomObject.wide,roomObject.long);
  roomObject.surface_roof   = getSurface(roomObject.wide,roomObject.long);
}

function getRoomAbsocionCoef(roomObject,coef_techo,coef_pared_1,coef_pared_2,
                            coef_pared_3,coef_pared_4,coef_suelo) {
  roomObject.coef_abs_roof =  parseFloat(document.getElementById(coef_techo).value);
  roomObject.coef_abs_wall_a =  parseFloat(document.getElementById(coef_pared_1).value);
  roomObject.coef_abs_wall_b =  parseFloat(document.getElementById(coef_pared_2).value);
  roomObject.coef_abs_wall_c =  parseFloat(document.getElementById(coef_pared_3).value);
  roomObject.coef_abs_wall_d =  parseFloat(document.getElementById(coef_pared_4).value);
  roomObject.coef_abs_floor =  parseFloat(document.getElementById(coef_suelo).value);
}

function getRoomAbsocionCoefOctaves(roomObject,coef_techo,coef_pared_1,coef_pared_2,
                            coef_pared_3,coef_pared_4,coef_suelo) {
  roomObject.coef_abs_roof =  parseFloat(document.getElementById(coef_techo).value);
  roomObject.coef_abs_wall_a =  parseFloat(document.getElementById(coef_pared_1).value);
  roomObject.coef_abs_wall_b =  parseFloat(document.getElementById(coef_pared_2).value);
  roomObject.coef_abs_wall_c =  parseFloat(document.getElementById(coef_pared_3).value);
  roomObject.coef_abs_wall_d =  parseFloat(document.getElementById(coef_pared_4).value);
  roomObject.coef_abs_floor =  parseFloat(document.getElementById(coef_suelo).value);
}

function getRoomAbsocionCoefOctaves(roomObject,
                            a_125,a_250,a_2000,a_4000,
                            b_125,b_250,b_500,b_1000,b_2000,b_4000,
                            c_125,c_250,c_500,c_1000,c_2000,c_4000,
                            d_125,d_250,d_500,d_1000,d_2000,d_4000,
                            suelo_125,suelo_250,suelo_500,suelo_1000,suelo_200,suelo_4000,
                            techo_125,techo_250,techo_500,techo_1000,techo_200,techo_4000) {
  roomObject.coef_abs_wall_a_125 = parseFloat(document.getElementById(a_125).value);
  roomObject.coef_abs_wall_a_250 = parseFloat(document.getElementById(a_250).value);
  roomObject.coef_abs_wall_a_500 = parseFloat(document.getElementById(a_500).value);
  roomObject.coef_abs_wall_a_1000 = parseFloat(document.getElementById(a_1000).value);
  roomObject.coef_abs_wall_a_2000 = parseFloat(document.getElementById(a_2000,).value);
  roomObject.coef_abs_wall_a_4000 = parseFloat(document.getElementById(a_4000).value);
  roomObject.coef_abs_wall_b_125 = parseFloat(document.getElementById(b_125).value);
  roomObject.coef_abs_wall_b_250 = parseFloat(document.getElementById(b_250).value);
  roomObject.coef_abs_wall_b_500 = parseFloat(document.getElementById(b_500).value);
  roomObject.coef_abs_wall_b_1000 = parseFloat(document.getElementById(b_1000).value);
  roomObject.coef_abs_wall_b_2000 = parseFloat(document.getElementById(b_2000).value);
  roomObject.coef_abs_wall_b_4000 = parseFloat(document.getElementById(b_4000).value);
  roomObject.coef_abs_wall_c_125 = parseFloat(document.getElementById(c_125).value);
  roomObject.coef_abs_wall_c_250 = parseFloat(document.getElementById(c_250).value);
  roomObject.coef_abs_wall_c_500 = parseFloat(document.getElementById(c_500).value);
  roomObject.coef_abs_wall_c_1000 = parseFloat(document.getElementById(c_1000).value);
  roomObject.coef_abs_wall_c_2000 = parseFloat(document.getElementById(c_2000).value);
  roomObject.coef_abs_wall_c_4000 = parseFloat(document.getElementById(c_4000).value);
  roomObject.coef_abs_wall_d_125 = parseFloat(document.getElementById(d_125).value);
  roomObject.coef_abs_wall_d_250 = parseFloat(document.getElementById(d_250).value);
  roomObject.coef_abs_wall_d_500 = parseFloat(document.getElementById(d_500).value);
  roomObject.coef_abs_wall_d_1000 = parseFloat(document.getElementById(d_1000).value);
  roomObject.coef_abs_wall_d_2000 = parseFloat(document.getElementById(d_2000).value);
  roomObject.coef_abs_wall_d_4000 = parseFloat(document.getElementById(d_4000).value);
  roomObject.coef_abs_wall_floor_125 = parseFloat(document.getElementById(suelo_125).value);
  roomObject.coef_abs_wall_floor_250 = parseFloat(document.getElementById(suelo_250).value);
  roomObject.coef_abs_wall_floor_500 = parseFloat(document.getElementById(suelo_500).value);
  roomObject.coef_abs_wall_floor_1000 = parseFloat(document.getElementById(suelo_1000).value);
  roomObject.coef_abs_wall_floor_2000 = parseFloat(document.getElementById(suelo_200).value);
  roomObject.coef_abs_wall_floor_4000 = parseFloat(document.getElementById(suelo_4000).value);
  roomObject.coef_abs_wall_roof_125 = parseFloat(document.getElementById(techo_125).value);
  roomObject.coef_abs_wall_roof_250 = parseFloat(document.getElementById(techo_250).value);
  roomObject.coef_abs_wall_roof_500 = parseFloat(document.getElementById(techo_500).value);
  roomObject.coef_abs_wall_roof_1000 = parseFloat(document.getElementById(techo_1000).value);
  roomObject.coef_abs_wall_roof_2000 = parseFloat(document.getElementById(techo_200).value);
  roomObject.coef_abs_wall_roof_4000 = parseFloat(document.getElementById(techo_4000).value);
}

function absortionCoefOk(roomObject) {
  return (
    isCorrectCoef(roomObject.coef_abs_roof) &&
    isCorrectCoef(roomObject.coef_abs_wall_a) &&
    isCorrectCoef(roomObject.coef_abs_wall_b) &&
    isCorrectCoef(roomObject.coef_abs_wall_c) &&
    isCorrectCoef(roomObject.coef_abs_wall_d) &&
    isCorrectCoef(roomObject.coef_abs_floor)
  )
}

function absortionCoefOkOctaves(roomObject) {
  return (
    isCorrectCoef(this.coef_abs_wall_a_125) &&
    isCorrectCoef(this.coef_abs_wall_a_250) &&
    isCorrectCoef(this.coef_abs_wall_a_500) &&
    isCorrectCoef(this.coef_abs_wall_a_1000) &&
    isCorrectCoef(this.coef_abs_wall_a_2000) &&
    isCorrectCoef(this.coef_abs_wall_a_4000) &&
    isCorrectCoef(this.coef_abs_wall_b_125) &&
    isCorrectCoef(this.coef_abs_wall_b_250) &&
    isCorrectCoef(this.coef_abs_wall_b_500) &&
    isCorrectCoef(this.coef_abs_wall_b_1000) &&
    isCorrectCoef(this.coef_abs_wall_b_2000) &&
    isCorrectCoef(this.coef_abs_wall_b_4000) &&
    isCorrectCoef(this.coef_abs_wall_c_125) &&
    isCorrectCoef(this.coef_abs_wall_c_250) &&
    isCorrectCoef(this.coef_abs_wall_c_500) &&
    isCorrectCoef(this.coef_abs_wall_c_1000) &&
    isCorrectCoef(this.coef_abs_wall_c_2000) &&
    isCorrectCoef(this.coef_abs_wall_c_4000) &&
    isCorrectCoef(this.coef_abs_wall_d_125) &&
    isCorrectCoef(this.coef_abs_wall_d_250) &&
    isCorrectCoef(this.coef_abs_wall_d_500) &&
    isCorrectCoef(this.coef_abs_wall_d_1000) &&
    isCorrectCoef(this.coef_abs_wall_d_2000) &&
    isCorrectCoef(this.coef_abs_wall_d_4000) &&
    isCorrectCoef(this.coef_abs_wall_floor_125) &&
    isCorrectCoef(this.coef_abs_wall_floor_250) &&
    isCorrectCoef(this.coef_abs_wall_floor_500) &&
    isCorrectCoef(this.coef_abs_wall_floor_1000) &&
    isCorrectCoef(this.coef_abs_wall_floor_2000) &&
    isCorrectCoef(this.coef_abs_wall_floor_4000) &&
    isCorrectCoef(this.coef_abs_wall_roof_125) &&
    isCorrectCoef(this.coef_abs_wall_roof_250) &&
  	isCorrectCoef(this.coef_abs_wall_roof_500) &&
  	isCorrectCoef(this.coef_abs_wall_roof_1000) &&
  	isCorrectCoef(this.coef_abs_wall_roof_2000) &&
  	isCorrectCoef(this.coef_abs_wall_roof_4000)
  )
}

// ** Funciones getShortListOfPointsApp ** \\
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

function getMicroMultiplePoints(roomObject, suggestedObject) {
  var list;
  list = getRandomPosition(roomObject);
  suggestedObject.long = list[0];
  suggestedObject.wide = list[1];
  suggestedObject.high = list[2];
}

function initMultiplePoints(roomObject, listObject) {
  listObject[0][0].long = DisMinimaSurface;
  listObject[0][0].wide = DisMinimaSurface;
  listObject[0][0].high = DisMinimaSurface;

  listObject[1][0].long = DisMinimaSurface;
  listObject[1][0].wide = roomObject.wide - DisMinimaSurface;
  listObject[1][0].high = DisMinimaSurface;

  listObject[2][0].long = roomObject.long - DisMinimaSurface;
  listObject[2][0].wide = roomObject.wide - DisMinimaSurface;
  listObject[2][0].high = DisMinimaSurface;

  listObject[3][0].long = roomObject.long - DisMinimaSurface;
  listObject[3][0].wide = DisMinimaSurface;
  listObject[3][0].high = DisMinimaSurface;

  getSuggestedMultiplePoints(roomObject, listObject)
}


function getSuggestedMultiplePoints(roomObject, listObject) {
  var dis, dis1, dis2;
  for (var i = 0; i < listObject.length; i++) {
    for (var j = 1; j < listObject[i].length; j++) {
      getMicroMultiplePoints(roomObject, listObject[i][j])
      dis = distance(listObject[i][0], listObject[i][j]);
      switch (j) {
        case 1:
          while (dis < MinDistance) {
            getMicroMultiplePoints(roomObject, listObject[i][j]);
            dis = distance(listObject[i][0], listObject[i][j]);
          }
          break;
        case 2:
          dis1 = distance(listObject[i][j-1], listObject[i][j]);
          while (dis < MinDistance || dis1 < DisMinimaMicro) {
            getMicroMultiplePoints(roomObject, listObject[i][j]);
            dis = distance(listObject[i][0], listObject[i][j]);
            dis1 = distance(listObject[i][j-1], listObject[i][j]);
          }
          break;
        case 3:
          dis1 = distance(listObject[i][j-1], listObject[i][j]);
          dis2 = distance(listObject[i][j-2], listObject[i][j]);
          while (dis < DisMinimaMicro || dis1 < DisMinimaMicro || dis2 < DisMinimaMicro) {
            getMicroMultiplePoints(roomObject, listObject[i][j])
            dis = distance(listObject[i][0], listObject[i][j]);
            dis1 = distance(listObject[i][j-1], listObject[i][j]);
            dis2 = distance(listObject[i][j-2], listObject[i][j]);
          }
          break;
        default:
          break;
      }
    }
  }
}
