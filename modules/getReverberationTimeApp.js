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
