
function getRoomSurface(height, width) {return height * width;}

function optionGetReverberationTime(x,y,z) {

  var room = new Room();

  room.long = parseFloat(document.getElementById(x).value);
  room.wide = parseFloat(document.getElementById(y).value);
  room.high = parseFloat(document.getElementById(z).value);

  room.surface_wall_a = getRoomSurface(room.long,room.high);
  room.surface_wall_b = getRoomSurface(room.long,room.high);
  room.surface_wall_c = getRoomSurface(room.wide,room.high);
  room.surface_call_d = getRoomSurface(room.wide,room.high);
  room.surface_floor  = getRoomSurface(room.wide,room.long);
  room.surface_roof   = getRoomSurface(room.wide,room.long);

}
