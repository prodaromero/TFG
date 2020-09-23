function optionGetReverberationTime(option,coef_techo,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  var room = RoomObject;
  var reverTime = ReverberationTime;
  var absortion_area;
  var volume = room.volume();

  getRoomDimensions(room);
  getRoomAbsocionCoef(room,coef_techo,coef_pared_1,coef_pared_2,coef_pared_3,coef_pared_4,coef_suelo);

  if (!volume) {
    openPopup(CommentRoomKO);
  }else if (!absortionCoefOk(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortion_area = getRoomAbsortionArea(room);
    switch (option) {
      case "Sabine":
        reverTime = getReverTimeSabine(volume,absortion_area);
        break;
      case "Eyring":
        reverTime = getReverTimeEyring(room,volume,absortion_area);
        break;
      default:
        break;
    }
    drawReverTimeMsg(option,reverTime);
  }
}
