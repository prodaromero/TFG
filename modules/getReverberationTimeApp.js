function optionGetReverberationTime(option,coef_techo,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  var room = RoomObject;
  var reverTime, volume, absortion_area;

  getRoomDimensions(room);
  getRoomAbsocionCoef(room,coef_techo,coef_pared_1,coef_pared_2,coef_pared_3,coef_pared_4,coef_suelo);

  if (absortionCoefOk(room)) {
    volume = room.volume();
    absortion_area = getRoomAbsortionArea(room);

  if (option == "Sabine") {
    reverTime = getReverTimeSabine(volume,absortion_area);
  }
  if (option == "Eyring") {
    reverTime = getReverTimeEyring(room,volume,absortion_area);
  }
    drawReverTimeMsg(option,reverTime);
  } else {
    alert("Parámetros fuera del rango.\nPor favor, asegurese de que los parámetros introducidos se encuentren dentro de los valores adecuados.")
  }
}
