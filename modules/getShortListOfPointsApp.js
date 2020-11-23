function optionGetShortList() {
  var room = RoomObject;
  var list = ListOfSuggestedPoints;
  var opertiveRoomZone = RoomOperative;
  var volume = room.volume();
  var color;

  if (!volume) {
    openPopup(CommentRoomKOp);
  } else if (!MinDistance) {
    openPopup(CommentDistanceKO);
  } else if (volume < MinimalVolume || room.long < MinimalDimensionLong || room.wide < MinimalDimensionWide || room.high < MinimalDimensionHigh) {
    openPopup(CommentRoomSmall);
  } else {
    canvasPlanta = document.getElementById("canvasPlanta");
    canvasAlzado = document.getElementById("canvasAlzado");

    initMultiplePoints(room, list, volume);

    createSuggestedTable(list);

    var elementName0 = document.getElementById("element-0")
    var elementName1 = document.getElementById("element-1")
    var elementName2 = document.getElementById("element-2")
    var elementName3 = document.getElementById("element-3")

    elementName0.onclick = function(){plotSuggestedPoints(list[0]);}
    elementName1.onclick = function(){plotSuggestedPoints(list[1]);}
    elementName2.onclick = function(){plotSuggestedPoints(list[2]);}
    elementName3.onclick = function(){plotSuggestedPoints(list[3]);}
  }
}
