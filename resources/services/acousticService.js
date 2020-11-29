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
  roomObject.surface_floor = getSurface(roomObject.wide,roomObject.long);
  roomObject.surface_roof  = getSurface(roomObject.wide,roomObject.long);
  roomObject.surface_wall_a = getSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_b = getSurface(roomObject.wide,roomObject.high);
  roomObject.surface_wall_c = getSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_d = getSurface(roomObject.wide,roomObject.high);
}

function getRoomAbsortionArea(roomObject,coef_techo,coef_suelo,coef_pared_a,
                            coef_pared_b,coef_pared_c,coef_pared_d){
  return roomObject.surface_roof*coef_techo +
          roomObject.surface_floor*coef_suelo +
          roomObject.surface_wall_a*coef_pared_a +
          roomObject.surface_wall_b*coef_pared_b +
          roomObject.surface_wall_c*coef_pared_c +
          roomObject.surface_wall_d*coef_pared_d;
}

function getReverTimeSabine(vol,area_absorcion) {
  var tr_sabine = (SabineConts*vol)/area_absorcion;
  return getRound2Decimals(tr_sabine);
}

function getRoomSurface(roomObject) {
  return roomObject.surface_roof +
          roomObject.surface_floor +
          roomObject.surface_wall_a +
          roomObject.surface_wall_b +
          roomObject.surface_wall_c +
          roomObject.surface_wall_d;
}

function getReverTimeEyring(roomObject,vol,area_absorcion) {
  var tr_eyring, surface, ln;
  surface = getRoomSurface(roomObject);
  ln = -Math.log(1-(area_absorcion)/surface);
  return getRound2Decimals((EyringConts*vol)/(surface*ln));
}

function getSchroederFrecuency(tr, volumeObject) {return getRound2Decimals(2000*Math.sqrt(tr/volumeObject));}

function getRoomAbsocionCoef(roomObject,coef_techo,coef_suelo,coef_pared_a,
                            coef_pared_b,coef_pared_c,coef_pared_d) {
  roomObject.coef_abs_roof  = coef_techo;
  roomObject.coef_abs_floor = coef_suelo;
  roomObject.coef_abs_wall_a = coef_pared_a;
  roomObject.coef_abs_wall_b = coef_pared_b;
  roomObject.coef_abs_wall_c = coef_pared_c;
  roomObject.coef_abs_wall_d = coef_pared_d;
}

function getRoomAbsocionCoefOctaves(roomObject,cTecho_125,cTecho_250,cTecho_500,cTecho_1000,cTecho_2000,cTecho_4000,
                    cSuelo_125,cSuelo_250,cSuelo_500,cSuelo_1000,cSuelo_2000,cSuelo_4000,
                    cParedA_125,cParedA_250,cParedA_500,cParedA_1000,cParedA_2000,cParedA_4000,
                    cParedB_125,cParedB_250,cParedB_500,cParedB_1000,cParedB_2000,cParedB_4000,
                    cParedC_125,cParedC_250,cParedC_500,cParedC_1000,cParedC_2000,cParedC_4000,
                    cParedD_125,cParedD_250,cParedD_500,cParedD_1000,cParedD_2000,cParedD_4000) {

  roomObject.coef_abs_roof_125   = cTecho_125;
  roomObject.coef_abs_roof_250   = cTecho_250;
  roomObject.coef_abs_roof_500   = cTecho_500;
  roomObject.coef_abs_roof_1000  = cTecho_1000;
  roomObject.coef_abs_roof_2000  = cTecho_2000;
  roomObject.coef_abs_roof_4000  = cTecho_4000;
  roomObject.coef_abs_floor_125  = cSuelo_125;
  roomObject.coef_abs_floor_250  = cSuelo_250;
  roomObject.coef_abs_floor_500  = cSuelo_500;
  roomObject.coef_abs_floor_1000 = cSuelo_1000;
  roomObject.coef_abs_floor_2000 = cSuelo_2000;
  roomObject.coef_abs_floor_4000 = cSuelo_4000;
  roomObject.coef_abs_wall_a_125 = cParedA_125;
  roomObject.coef_abs_wall_a_250 = cParedA_250;
  roomObject.coef_abs_wall_a_500 = cParedA_500;
  roomObject.coef_abs_wall_a_1000 = cParedA_1000;
  roomObject.coef_abs_wall_a_2000 = cParedA_2000;
  roomObject.coef_abs_wall_a_4000 = cParedA_4000;
  roomObject.coef_abs_wall_b_125 = cParedB_125;
  roomObject.coef_abs_wall_b_250 = cParedB_250;
  roomObject.coef_abs_wall_b_500 = cParedB_500;
  roomObject.coef_abs_wall_b_1000 = cParedB_1000;
  roomObject.coef_abs_wall_b_2000 = cParedB_2000;
  roomObject.coef_abs_wall_b_4000 = cParedB_4000;
  roomObject.coef_abs_wall_c_125 = cParedC_125;
  roomObject.coef_abs_wall_c_250 = cParedC_250;
  roomObject.coef_abs_wall_c_500 = cParedC_500;
  roomObject.coef_abs_wall_c_1000 = cParedC_1000;
  roomObject.coef_abs_wall_c_2000 = cParedC_2000;
  roomObject.coef_abs_wall_c_4000 = cParedC_4000;
  roomObject.coef_abs_wall_d_125 = cParedD_125;
  roomObject.coef_abs_wall_d_250 = cParedD_250;
  roomObject.coef_abs_wall_d_500 = cParedD_500;
  roomObject.coef_abs_wall_d_1000 = cParedD_1000;
  roomObject.coef_abs_wall_d_2000 = cParedD_2000;
  roomObject.coef_abs_wall_d_4000 = cParedD_4000;
}

function absortionCoefOk(roomObject) {
  return (
    isCorrectCoef(roomObject.coef_abs_roof) &&
    isCorrectCoef(roomObject.coef_abs_floor) &&
    isCorrectCoef(roomObject.coef_abs_wall_a) &&
    isCorrectCoef(roomObject.coef_abs_wall_b) &&
    isCorrectCoef(roomObject.coef_abs_wall_c) &&
    isCorrectCoef(roomObject.coef_abs_wall_d)
  )
}

function absortionCoefOkOctaves(roomObject) {
  return (
    isCorrectCoef(roomObject.coef_abs_roof_125) &&
    isCorrectCoef(roomObject.coef_abs_roof_250) &&
    isCorrectCoef(roomObject.coef_abs_roof_500) &&
    isCorrectCoef(roomObject.coef_abs_roof_1000) &&
    isCorrectCoef(roomObject.coef_abs_roof_2000) &&
    isCorrectCoef(roomObject.coef_abs_roof_4000) &&
    isCorrectCoef(roomObject.coef_abs_floor_125) &&
    isCorrectCoef(roomObject.coef_abs_floor_250) &&
    isCorrectCoef(roomObject.coef_abs_floor_500) &&
    isCorrectCoef(roomObject.coef_abs_floor_1000) &&
    isCorrectCoef(roomObject.coef_abs_floor_2000) &&
    isCorrectCoef(roomObject.coef_abs_floor_4000) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_125) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_250) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_500) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_1000) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_2000) &&
    isCorrectCoef(roomObject.coef_abs_wall_a_4000) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_125) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_250) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_500) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_1000) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_2000) &&
    isCorrectCoef(roomObject.coef_abs_wall_b_4000) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_125) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_250) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_500) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_1000) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_2000) &&
    isCorrectCoef(roomObject.coef_abs_wall_c_4000) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_125) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_250) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_500) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_1000) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_2000) &&
    isCorrectCoef(roomObject.coef_abs_wall_d_4000)
  )
}

function getMeanAbsCoef(roomObject,coefTecho,coefSuelo,coefParedA,coefParedB,coefParedC,coefParedD) {
  var coef = coefTecho+coefSuelo+coefParedA+coefParedB+coefParedC+coefParedD;
  return (getRound2Decimals(coef/6));
}

// ** Funciones getShortListOfPointsApp ** \\
function getOkRandomPoint(roomObject,listObject,object) {
  var dis1, dis2, dis3;
  getMicroMultiplePoints(roomObject,object);
  dis1 = distance(listObject[0], object);
  dis2 = distance(listObject[1], object);
  dis3 = distance(listObject[2], object);

  while ((dis1 < MinDistance) || (dis2 < DisMinimaMicro) || (dis3 < DisMinimaMicro)) {
    getMicroMultiplePoints(roomObject, object)
    dis = distance(listObject[0], object);
    dis1 = distance(listObject[1], object);
    dis2 = distance(listObject[2], object);
  }
}

function getRandomCoordinate(maxL) {
  min = DisMinimaSurface;
  max = maxL - DisMinimaSurface;
  return getRound2Decimals(Math.random() * (max - min) + min);
}

function getRandomPosition(roomObject) {
  var list = [0.0,0.0,0.0];
  list[0] = getRandomCoordinate(roomObject.long);
  list[1] = getRandomCoordinate(roomObject.wide);
  list[2] = getRandomCoordinate(roomObject.high);
  return list;
}

function getMicroMultiplePoints(roomObject, suggestedObject) {
  var list;
  list = getRandomPosition(roomObject);
  suggestedObject.long = list[0];
  suggestedObject.wide = list[1];
  suggestedObject.high = list[2];
}

function getDistance1D(a,b) {return getRound2Decimals(Math.abs(a-b));}

function getDistance2D(a,b) {
  var x_dis = difference(a.long,b.long);
  var y_dis = difference(a.wide,b.wide);
  return Math.sqrt(x_dis + x_dis);
}

function getSuggestedOnePoint(roomObject,listObject) {
  var source, aux, dis;
  for (var i = 0; i < listObject.length; i++) {
    source = listObject[i][0]
    aux = getRandomCoordinate(roomObject.long);
    dis = getDistance1D(aux,source.long);
    while (dis < MinDistance) {
      aux  = getRandomCoordinate(roomObject.long);
      dis = getDistance1D(aux,source.long);
    }
    listObject[i][1].long = aux;
    listObject[i][1].wide = getRandomCoordinate(roomObject.wide);
    listObject[i][1].high = getRandomCoordinate(roomObject.high);
    for (var j = 2; j < listObject[i].length; j++) {
      listObject[i][j].long = "-";
      listObject[i][j].wide = "-";
      listObject[i][j].high = "-";
    }
  }

  var msg = `<div class="red">Solo se puede obtener una posición de medición para los micrófonos.<br><br>
                Recuerde que la distancia entre los micrófonos debe ser de 2 metros según la
                normativa aplicada NE-ISO 3382.<br><br>
                Debido a las dimensiones del recinto, solo se puede obtener una posición válida,
                puesto que, si se obtuviese otra posición de medición, estaría situado a menos de 2 m,
                no cumpliendo así con la normativa.
                <br><br>Con estas dimensiones, <b>NO</b> se pueden realizar mediciones
                ni de Control, ni de Ingeniería, ni de Precisión.<br><br>
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

  var msg = `<div class="orange">Solo se pueden obtener dos posiciones de medición para los micrófonos.<br><br>
              Recuerde que la distancia entre los micrófonos debe ser de 2 metros segun la
              normativa aplicada UNE-ISO 3382.<br><br>
              Debido a las dimensiones del recinto, solo se pueden obtener dos posiciones válidas,
              puesto que, si se obtuviese una tercera posición de medición, los micrófonos estarían
              situados a menos de 2 m, no cumpliendo así con la normativa.
              <br><br>Con estas dimensiones, podría cumplir
              con los métodos de medición de <b>Control</b> y de <b>Ingeniería</b>.
              <br><br>
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
              </div>`

  putMessage("info-suggested-list", msg);
}

function getSuggestedThreePoints(roomObject, listObject) {
  listObject[0][1].long = DisMinimaSurface;
  listObject[0][1].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[0][1].high = DisMinimaSurface;
  listObject[0][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[0][2].wide = DisMinimaSurface;
  listObject[0][2].high = DisMinimaSurface;
  // getOkRandomPoint(roomObject,listObject[0],listObject[0][3]);
  listObject[0][3].long = getRound2Decimals(roomObject.long/2 + 0.5);
  listObject[0][3].wide = getRound2Decimals(roomObject.wide/2 + 0.5);
  listObject[0][3].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  listObject[1][1].long = DisMinimaSurface;
  listObject[1][1].wide = DisMinimaSurface;
  listObject[1][1].high = DisMinimaSurface;
  listObject[1][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[1][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[1][2].high = DisMinimaSurface;
  // getOkRandomPoint(roomObject,listObject[1],listObject[1][3]);
  listObject[1][3].long = getRound2Decimals(roomObject.long/2 + 0.5);
  listObject[1][3].wide = getRound2Decimals(roomObject.wide/2 - 0.5);
  listObject[1][3].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  listObject[2][1].long = DisMinimaSurface;
  listObject[2][1].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[2][1].high = DisMinimaSurface;
  listObject[2][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[2][2].wide = DisMinimaSurface;
  listObject[2][2].high = DisMinimaSurface;
  // getOkRandomPoint(roomObject,listObject[2],listObject[2][3]);
  listObject[2][3].long = getRound2Decimals(roomObject.long/2 - 0.5);
  listObject[2][3].wide = getRound2Decimals(roomObject.wide/2 - 0.5);
  listObject[2][3].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  listObject[3][1].long = DisMinimaSurface;
  listObject[3][1].wide = DisMinimaSurface;
  listObject[3][1].high = DisMinimaSurface;
  listObject[3][2].long = getRound2Decimals(roomObject.long - DisMinimaSurface);
  listObject[3][2].wide = getRound2Decimals(roomObject.wide - DisMinimaSurface);
  listObject[3][2].high = DisMinimaSurface;
  // getOkRandomPoint(roomObject,listObject[3],listObject[3][3]);
  listObject[3][3].long = getRound2Decimals(roomObject.long/2 - 0.5);
  listObject[3][3].wide = getRound2Decimals(roomObject.wide/2 + 0.5);
  listObject[3][3].high = getRound2Decimals(roomObject.high - DisMinimaSurface);

  var msg = `<div class="green">
              Con estas dimensiones, podría cumplir
              con todos los métodos de medición: <b>Control</b>, <b>Ingeniería</b> y <b>Precisión</b>.<br><br>
              <h5>Números mínimos de posiciones y mediciones</h5>
              <img src="resources/style/images/puntos-medicion.png" class="points-image"></img>
            </div>`

  putMessage("info-suggested-list", msg);
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
          while ((dis < MinDistance) || (dis1 < DisMinimaMicro)) {
            getMicroMultiplePoints(roomObject, listObject[i][j]);
            dis = distance(listObject[i][0], listObject[i][j]);
            dis1 = distance(listObject[i][j-1], listObject[i][j]);
          }
          break;
        case 3:
          dis1 = distance(listObject[i][j-1], listObject[i][j]);
          dis2 = distance(listObject[i][j-2], listObject[i][j]);
          while ((dis < MinDistance) || (dis1 < DisMinimaMicro) || (dis2 < DisMinimaMicro)) {
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

  var msg = `<div class="green">
              Con estas dimensiones, podría cumplir
              con todos los métodos de medición: <b>Control</b>, <b>Ingeniería</b> y <b>Precisión</b>.<br><br>
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

  if ((volumeObject>MinimalVolume) && (volumeObject<=31.4)) {
    // One Suggested Point
    getSuggestedOnePoint(roomObject,listObject);
    // getSuggestedOnePointsRandom(roomObject,listObject);
  } else if ((volumeObject>31.4) && (volumeObject<=50.7)) {
    // Two Suggested Points
    getSuggestedTwoPoints(roomObject,listObject);
  } else if ((volumeObject>50.7) && (volumeObject<=110)) {
    // Three Suggested Points Determined
    getSuggestedThreePoints(roomObject,listObject);
  } else {
    // Three Suggested Points Random
    getSuggestedMultiplePointsRandom(roomObject, listObject);
  }
}
