function initRoom(longRoom,wideRoom,highRoom) {
  var comment;
  var room = RoomObject;
  room.long = parseFloat(document.getElementById(longRoom).value);
  room.wide = parseFloat(document.getElementById(wideRoom).value);
  room.high = parseFloat(document.getElementById(highRoom).value);
  var control = room.volume();;

  if (control) { // evaluate if is not [null,undefined,NaN,empty string,0,false]
    comment = CommentRoomOK;
  } else {
    comment = CommentRoomKO;
  }
  openPopup(comment);
}
