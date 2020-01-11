
function getRoomSurface(height, width) {return height * width;}

function getRound2Decimals(val) {return Math.round(val*100)/100;}

function getReverTime(roomObject) {

  var vol = roomObject.volume();

  var area_absorcion = roomObject.surface_roof*roomObject.coef_abs_roof +
                roomObject.surface_wall_a*roomObject.coef_abs_wall_a +
                roomObject.surface_wall_b*roomObject.coef_abs_wall_b +
                roomObject.surface_wall_c*roomObject.coef_abs_wall_c +
                roomObject.surface_wall_d*roomObject.coef_abs_wall_d +
                roomObject.surface_floor*roomObject.coef_abs_floor;

  var tr_sabine = (sabine_conts*vol)/area_absorcion;

  return getRound2Decimals(tr_sabine);
}

function getRoomDimensions(roomObject, x,y,z) {


  roomObject.long = parseFloat(document.getElementById(x).value);
  roomObject.wide = parseFloat(document.getElementById(y).value);
  roomObject.high = parseFloat(document.getElementById(z).value);

  roomObject.surface_wall_a = getRoomSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_b = getRoomSurface(roomObject.long,roomObject.high);
  roomObject.surface_wall_c = getRoomSurface(roomObject.wide,roomObject.high);
  roomObject.surface_wall_d = getRoomSurface(roomObject.wide,roomObject.high);
  roomObject.surface_floor  = getRoomSurface(roomObject.wide,roomObject.long);
  roomObject.surface_roof   = getRoomSurface(roomObject.wide,roomObject.long);
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

function optionGetReverberationTime(x,y,z,coef_techo,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  var room = new Room();

  getRoomDimensions(room,x,y,z);

  getRoomAbsocionCoef(room,coef_techo,coef_pared_1,coef_pared_2,coef_pared_3,coef_pared_4,coef_suelo);

  var reverTime = getReverTime(room);

  drawReverTimeMsg(reverTime);
}
