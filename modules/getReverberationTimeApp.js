
function getSurface(height, width) {return height * width;}

function getRoomSurface(roomObject) {
  return roomObject.surface_wall_a + roomObject.surface_wall_b +
          roomObject.surface_wall_c + roomObject.surface_wall_d +
          roomObject.surface_floor + roomObject.surface_roof;
}

function getRound2Decimals(val) {return Math.round(val*100)/100;}

function getRoomAbsortionArea(roomObject) {
  return roomObject.surface_roof*roomObject.coef_abs_roof +
                roomObject.surface_wall_a*roomObject.coef_abs_wall_a +
                roomObject.surface_wall_b*roomObject.coef_abs_wall_b +
                roomObject.surface_wall_c*roomObject.coef_abs_wall_c +
                roomObject.surface_wall_d*roomObject.coef_abs_wall_d +
                roomObject.surface_floor*roomObject.coef_abs_floor;
}

function getReverTimeSabine(roomObject,vol,area_absorcion) {
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


  roomObject.long = parseFloat(document.getElementById(x).value);
  roomObject.wide = parseFloat(document.getElementById(y).value);
  roomObject.high = parseFloat(document.getElementById(z).value);

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

function isCorrectCoef(coef){
  return ((coef >= 0) && (coef <= 1))
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

function optionGetReverberationTime(option,x,y,z,coef_techo,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  var room = new Room();
  var reverTime, volume, absortion_area;

  getRoomDimensions(room,x,y,z);

  getRoomAbsocionCoef(room,coef_techo,coef_pared_1,coef_pared_2,coef_pared_3,coef_pared_4,coef_suelo);

  if (absortionCoefOk(room)) {
    volume = room.volume();

    absortion_area = getRoomAbsortionArea(room);


    if (option == "Sabine") {
      reverTime = getReverTimeSabine(room,volume,absortion_area);
    }

    if (option == "Eyring") {
      console.log(room,volume,absortion_area);
      reverTime = getReverTimeEyring(room,volume,absortion_area);
    }

    console.log(reverTime);

    drawReverTimeMsg(option,reverTime);
  } else {
    alert("Parámetros fuera del rango.\nPor favor, asegurese de que los parámetros introducidos se encuentren dentro de los valores adecuados.")
  }
}
