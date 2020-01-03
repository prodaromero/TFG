
function getRoomSurface(height, width) {return height * width;}

function drawSurfaceRoom(roomObject) {

  document.getElementById("dim_techo").innerHTML += roomObject.surface_roof + " [m2].";
  document.getElementById("dim_pared_a").innerHTML += roomObject.surface_wall_a + " [m2].";
  document.getElementById("dim_pared_b").innerHTML += roomObject.surface_wall_b + " [m2].";
  document.getElementById("dim_pared_c").innerHTML += roomObject.surface_wall_c + " [m2].";
  document.getElementById("dim_pared_d").innerHTML += roomObject.surface_wall_d + " [m2].";
  document.getElementById("dim_suelo").innerHTML += roomObject.surface_floor + " [m2].";
}

function getReverTime(roomObject) {

  var volume = roomObject.volume;
  var area_absorcion = roomObject.surface_roof*roomObject.coef_abs_roof +
                roomObject.surface_wall_a*roomObject.coef_abs_wall_a +
                roomObject.surface_wall_b*roomObject.coef_abs_wall_b +
                roomObject.surface_wall_c*roomObject.coef_abs_wall_c +
                roomObject.surface_wall_d*roomObject.coef_abs_wall_d +
                roomObject.surface_floor*roomObject.coef_abs_floor;

  var tr_sabine = (sabine_conts*volume)/area_absorcion;

  return tr_sabine;
}

function getRoomDimensions(x,y,z) {


  room.long = parseFloat(document.getElementById(x).value);
  room.wide = parseFloat(document.getElementById(y).value);
  room.high = parseFloat(document.getElementById(z).value);

  room.surface_wall_a = getRoomSurface(room.long,room.high);
  room.surface_wall_b = getRoomSurface(room.long,room.high);
  room.surface_wall_c = getRoomSurface(room.wide,room.high);
  room.surface_wall_d = getRoomSurface(room.wide,room.high);
  room.surface_floor  = getRoomSurface(room.wide,room.long);
  room.surface_roof   = getRoomSurface(room.wide,room.long);

  drawSurfaceRoom(room);
}

function optionGetReverberationTime(sup_techo,sup_pared_1,sup_pared_2,
                                    sup_pared_3,sup_pared_4,sup_suelo,
                                    coef_techo,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  console.log(Room);
  Room.coef_abs_roof =  parseFloat(document.getElementById(coef_techo).value);
  Room.coef_abs_wall_a =  parseFloat(document.getElementById(coef_pared_1).value);
  Room.coef_abs_wall_b =  parseFloat(document.getElementById(coef_pared_2).value);
  Room.coef_abs_wall_c =  parseFloat(document.getElementById(coef_pared_3).value);
  Room.coef_abs_wall_d =  parseFloat(document.getElementById(coef_pared_4).value);
  Room.coef_abs_floor =  parseFloat(document.getElementById(coef_suelo).value);

  var tr = getReverTime(Room);
  console.log(tr);
}
