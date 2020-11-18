function optionGetShortList() {
  var room = RoomObject;
  var list = ListOfSuggestedPoints;
  var opertiveRoomZone = RoomOperative;
  var volume = room.volume();
  var color;

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!MinDistance) {
    openPopup(CommentDistanceKO);
  } else if (volume < MinimalVolume || room.long < MinimalDimensionLong || room.wide < MinimalDimensionWide || room.high < MinimalDimensionHigh) {
    openPopup(CommentRoomSmall);
  } else {
    canvasPlanta = document.getElementById("canvasPlanta");
    canvasAlzado = document.getElementById("canvasAlzado");

    initMultiplePoints(room, list, volume);

    createSuggestedTable(list);
  }
}
