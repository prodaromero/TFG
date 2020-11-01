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

function getMean(min,max) {return getRound2Decimals((min+max)/2);}

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
  var dmin = 2*Math.sqrt(volume/(SpeedSound*reverTime));
  return dmin;
}

// ** Funciones getReverberationTimeApp ** \\

function getRoomDimensions(roomObject) {
  var walls = 2*getSurface(roomObject.long,roomObject.high) + 2*getSurface(roomObject.wide,roomObject.high);
  roomObject.surface_floor = getSurface(roomObject.wide,roomObject.long);
  roomObject.surface_roof  = getSurface(roomObject.wide,roomObject.long);
  roomObject.surface_wall  = walls;
}

function getRoomAbsortionArea(roomObject,coef_techo,coef_suelo,coef_pared) {
  return roomObject.surface_wall*coef_pared +
          roomObject.surface_roof*coef_techo +
          roomObject.surface_floor*coef_suelo;
}

function getReverTimeSabine(vol,area_absorcion) {
  var tr_sabine = (SabineConts*vol)/area_absorcion;
  return getRound2Decimals(tr_sabine);
}

function getRoomSurface(roomObject) {
  return roomObject.surface_wall +
          roomObject.surface_floor +
          roomObject.surface_roof;
}

function getReverTimeEyring(roomObject,vol,area_absorcion) {
  var tr_eyring, surface, ln;
  surface = getRoomSurface(roomObject);
  ln = -Math.log(1-(area_absorcion)/surface);
  return getRound2Decimals((EyringConts*vol)/(surface*ln));
}

function getSchroederFrecuency(tr, volumeObject) {return getRound2Decimals(2000*Math.sqrt(tr/volumeObject));}

function getRoomAbsocionCoef(roomObject,coef_techo,coef_suelo,coef_pared) {
  roomObject.coef_abs_roof  = coef_techo;
  roomObject.coef_abs_floor = coef_suelo;
  roomObject.coef_abs_wall  = coef_pared;
}

function getRoomAbsocionCoefOctaves(roomObject,
                            pared_125,pared_250,pared_500,pared_1000,pared_2000,pared_4000,
                            suelo_125,suelo_250,suelo_500,suelo_1000,suelo_2000,suelo_4000,
                            techo_125,techo_250,techo_500,techo_1000,techo_2000,techo_4000) {
  roomObject.coef_abs_wall_125   = pared_125
  roomObject.coef_abs_wall_250   = pared_250
  roomObject.coef_abs_wall_500   = pared_500
  roomObject.coef_abs_wall_1000  = pared_1000
  roomObject.coef_abs_wall_2000  = pared_2000
  roomObject.coef_abs_wall_4000  = pared_4000;
  roomObject.coef_abs_floor_125  = suelo_125;
  roomObject.coef_abs_floor_250  = suelo_250;
  roomObject.coef_abs_floor_500  = suelo_500;
  roomObject.coef_abs_floor_1000 = suelo_1000;
  roomObject.coef_abs_floor_2000 = suelo_2000;
  roomObject.coef_abs_floor_4000 = suelo_4000;
  roomObject.coef_abs_roof_125   = techo_125;
  roomObject.coef_abs_roof_250   = techo_250;
  roomObject.coef_abs_roof_500   = techo_500;
  roomObject.coef_abs_roof_1000  = techo_1000;
  roomObject.coef_abs_roof_2000  = techo_2000;
  roomObject.coef_abs_roof_4000  = techo_4000;
}

function absortionCoefOk(roomObject) {
  return (
    isCorrectCoef(roomObject.coef_abs_roof) &&
    isCorrectCoef(roomObject.coef_abs_floor) &&
    isCorrectCoef(roomObject.coef_abs_wall)
  )
}

function absortionCoefOkOctaves(roomObject) {
  return (
    isCorrectCoef(roomObject.coef_abs_wall_125) &&
    isCorrectCoef(roomObject.coef_abs_wall_250) &&
    isCorrectCoef(roomObject.coef_abs_wall_500) &&
    isCorrectCoef(roomObject.coef_abs_wall_1000) &&
    isCorrectCoef(roomObject.coef_abs_wall_2000) &&
    isCorrectCoef(roomObject.coef_abs_wall_4000) &&
    isCorrectCoef(roomObject.coef_abs_floor_125) &&
    isCorrectCoef(roomObject.coef_abs_floor_250) &&
    isCorrectCoef(roomObject.coef_abs_floor_500) &&
    isCorrectCoef(roomObject.coef_abs_floor_1000) &&
    isCorrectCoef(roomObject.coef_abs_floor_2000) &&
    isCorrectCoef(roomObject.coef_abs_floor_4000) &&
    isCorrectCoef(roomObject.coef_abs_roof_125) &&
    isCorrectCoef(roomObject.coef_abs_roof_250) &&
  	isCorrectCoef(roomObject.coef_abs_roof_500) &&
  	isCorrectCoef(roomObject.coef_abs_roof_1000) &&
  	isCorrectCoef(roomObject.coef_abs_roof_2000) &&
  	isCorrectCoef(roomObject.coef_abs_roof_4000)
  )
}

// ** Funciones getShortListOfPointsApp ** \\
function getSuggestedOnePoint(roomObject, listObject) {
  listObject[0][1].long = roomObject.long - DisMinimaSurface;
  listObject[0][1].wide = roomObject.wide - DisMinimaSurface;
  listObject[0][1].high = DisMinimaSurface;

  listObject[1][1].long = roomObject.long - DisMinimaSurface;
  listObject[1][1].wide = DisMinimaSurface;
  listObject[1][1].high = DisMinimaSurface;

  listObject[2][1].long = DisMinimaSurface;
  listObject[2][1].wide = DisMinimaSurface;
  listObject[2][1].high = DisMinimaSurface;

  listObject[3][1].long = DisMinimaSurface;
  listObject[3][1].wide = roomObject.wide - DisMinimaSurface;
  listObject[3][1].high = DisMinimaSurface;

  for (var i = 0; i < listObject.length; i++) {
    for (var j = 2; j < listObject[i].length; j++) {
      listObject[i][j].long = "-";
      listObject[i][j].wide = "-";
      listObject[i][j].high = "-";
    }
  }
  var msg = `<div class="warning">Solo se puede obtener una posición de medición para los micrófonos.<br><br>
              Recuerde que la distancia entre los micrófonos debe ser de 2 metros según la
              normativa aplicada NE-ISO 3382.<br>
              Debido a las dimensiones del recinto, solo se puede obtener una posición válida,
              puesto que, si se obtuviese otra posición de medición, estaría situado a menos de 2 m,
              no cumpliendo así con la normativa.<br><br>
              Disculpe las molestias.<br><br>
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
              </div>`

  putMessage("info-suggested-list", msg);
}
function getSuggestedTwoPoints(roomObject, listObject) {
  // Micro positions for first source
  listObject[0][1].long = DisMinimaSurface;
  listObject[0][1].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[0][1].high = DisMinimaSurface;
  listObject[0][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[0][2].wide = DisMinimaSurface;
  listObject[0][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  // Micro positions for second source
  listObject[1][1].long = DisMinimaSurface;
  listObject[1][1].wide = DisMinimaSurface;
  listObject[1][1].high = DisMinimaSurface;
  listObject[1][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[1][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[1][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  // Micro positions for third source
  listObject[2][1].long = DisMinimaSurface;
  listObject[2][1].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[2][1].high = DisMinimaSurface;
  listObject[2][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[2][2].wide = DisMinimaSurface;
  listObject[2][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  // Micro positions for fourth source
  listObject[3][1].long = DisMinimaSurface;
  listObject[3][1].wide = DisMinimaSurface;
  listObject[3][1].high = DisMinimaSurface;
  listObject[3][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[3][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[3][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  for (var i = 0; i < listObject.length; i++) {
    listObject[i][3].long = "-";
    listObject[i][3].wide = "-";
    listObject[i][3].high = "-";
  }

  var msg = `<div class="warning">Solo se pueden obtener dos posiciones de medición para los micrófonos.<br><br>
              Recuerde que la distancia entre los micrófonos debe ser de 2 metros segun la
              normativa aplicada UNE-ISO 3382.<br>
              Debido a las dimensiones del recinto, solo se pueden obtener dos posiciones válidas,
              puesto que, si se obtuviese una tercera posición de medición, los micrófonos estarían
              situados a menos de 2 m, no cumpliendo así con la normativa.<br><br>
              Disculpe las molestias.<br><br>
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
              </div>`

  putMessage("info-suggested-list", msg);
}

function getSuggestedThreePoints(roomObject, listObject) {
  var minDis = getRound2Decimals(MinDistance);

  listObject[0][1].long = DisMinimaSurface;
  listObject[0][1].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[0][1].high = DisMinimaSurface;
  listObject[0][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[0][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[0][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  listObject[0][3].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[0][3].wide = DisMinimaSurface;
  listObject[0][3].high = DisMinimaSurface;

  listObject[1][1].long = DisMinimaSurface;
  listObject[1][1].wide = DisMinimaSurface;
  listObject[1][1].high = DisMinimaSurface;
  listObject[1][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[1][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[1][2].high = DisMinimaSurface;
  listObject[1][3].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[1][3].wide = DisMinimaSurface;
  listObject[1][3].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  listObject[2][1].long = DisMinimaSurface;
  listObject[2][1].wide = DisMinimaSurface;
  listObject[2][1].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  listObject[2][2].long = DisMinimaSurface;
  listObject[2][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[2][2].high = DisMinimaSurface;
  listObject[2][3].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[2][3].wide = DisMinimaSurface;
  listObject[2][3].high = DisMinimaSurface;

  listObject[3][1].long = DisMinimaSurface;
  listObject[3][1].wide = DisMinimaSurface;
  listObject[3][1].high = DisMinimaSurface;
  listObject[3][2].long = DisMinimaSurface;
  listObject[3][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[3][2].high = getRound2Decimals(roomObject.high - DisMinimaSurface);
  listObject[3][3].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[3][3].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[3][3].high = DisMinimaSurface;

  var msg = `<div class="warning">
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
            </div>`

  putMessage("info-suggested-list", msg);
}

function getRandomPoint(maxL) {
  min = DisMinimaSurface;
  max = maxL - DisMinimaSurface;
  return getRound2Decimals(Math.random() * (max - min) + min);
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

function getSuggestedMultiplePointsRandom(roomObject, listObject) {
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

  var msg = `<div class="warning">
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
            </div>`

  putMessage("info-suggested-list", msg);
}

function initMultiplePoints(roomObject, listObject, volumeObject) {
  listObject[0][0].long = DisMinimaSurface;
  listObject[0][0].wide = DisMinimaSurface;
  listObject[0][0].high = DisMinimaSurface;

  listObject[1][0].long = DisMinimaSurface;
  listObject[1][0].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[1][0].high = DisMinimaSurface;

  listObject[2][0].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[2][0].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[2][0].high = DisMinimaSurface;

  listObject[3][0].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[3][0].wide = DisMinimaSurface;
  listObject[3][0].high = DisMinimaSurface;

  if (volumeObject>MinimalVolume && volumeObject<=31.4) {
    // One Suggested Point
    getSuggestedOnePoint(roomObject,listObject);
  } else if (volumeObject>31.4 && volumeObject<42.8) {
    // Two Suggested Points
    getSuggestedTwoPoints(roomObject,listObject);
  } else if (volumeObject>=42.8 && volumeObject<110) {
    // Three Suggested Points Determined
    getSuggestedThreePoints(roomObject,listObject);
  } else {
    // Three Suggested Points Random
    getSuggestedMultiplePointsRandom(roomObject, listObject);
  }
}
