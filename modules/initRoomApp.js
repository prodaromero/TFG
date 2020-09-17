function initRoom(longRoom,wideRoom,highRoom) {
  RoomObject.long = parseFloat(document.getElementById(longRoom).value);
  RoomObject.wide = parseFloat(document.getElementById(wideRoom).value);
  RoomObject.high = parseFloat(document.getElementById(highRoom).value);
}
