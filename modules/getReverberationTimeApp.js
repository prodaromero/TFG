function optionGetReverberationTime(option,coef_techo,coef_suelo,coef_pared) {

  var room = RoomObject;
  var trSabine = ReverberationTimeSabine;
  var trEyring = ReverberationTimeEyring;
  var absortion_area;
  var volume = room.volume();

  var cTecho = parseFloat(document.getElementById(coef_techo).value);
  var cSuelo = parseFloat(document.getElementById(coef_suelo).value);
  var cPared = parseFloat(document.getElementById(coef_pared).value);

  getRoomDimensions(room);
  getRoomAbsocionCoef(room,cTecho,cSuelo,cPared);

  if (!volume) {
    openPopup(CommentRoomKO);
  }else if (!absortionCoefOk(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortion_area = getRoomAbsortionArea(room,cTecho,cSuelo,cPared);

    trSabine = getReverTimeSabine(volume,absortion_area);
    trEyring = getReverTimeEyring(room,volume,absortion_area);

    putReverTimeMsg(option,trSabine,trEyring);
  }
}

function optionGetReverberationTimeOctaves(option,
                                    pared_125,pared_250,pared_500,pared_1000,pared_2000,pared_4000,
                                    suelo_125,suelo_250,suelo_500,suelo_1000,suelo_2000,suelo_4000,
                                    techo_125,techo_250,techo_500,techo_1000,techo_2000,techo_4000) {

  var room = RoomObject;
  var trSabine = ReverberationTimeOctavesSabine;
  var trEyring = ReverberationTimeOctavesEyring;
  var canvasOct = document.getElementById("canvasOctaves");
  var absortion_area;
  var volume = room.volume();

  var cPared_125  = parseFloat(document.getElementById(pared_125).value);
  var cPared_250  = parseFloat(document.getElementById(pared_250).value);
  var cPared_500  = parseFloat(document.getElementById(pared_500).value);
  var cPared_1000 = parseFloat(document.getElementById(pared_1000).value);
  var cPared_2000 = parseFloat(document.getElementById(pared_2000).value);
  var cPared_4000 = parseFloat(document.getElementById(pared_4000).value);
  var cSuelo_125  = parseFloat(document.getElementById(suelo_125).value);
  var cSuelo_250  = parseFloat(document.getElementById(suelo_250).value);
  var cSuelo_500  = parseFloat(document.getElementById(suelo_500).value);
  var cSuelo_1000 = parseFloat(document.getElementById(suelo_1000).value);
  var cSuelo_2000 = parseFloat(document.getElementById(suelo_2000).value);
  var cSuelo_4000 = parseFloat(document.getElementById(suelo_4000).value);
  var cTecho_125  = parseFloat(document.getElementById(techo_125).value);
  var cTecho_250  = parseFloat(document.getElementById(techo_250).value);
  var cTecho_500  = parseFloat(document.getElementById(techo_500).value);
  var cTecho_1000 = parseFloat(document.getElementById(techo_1000).value);
  var cTecho_2000 = parseFloat(document.getElementById(techo_2000).value);
  var cTecho_4000 = parseFloat(document.getElementById(techo_4000).value);

  getRoomDimensions(room);
  getRoomAbsocionCoefOctaves(room,cPared_125,cPared_250,cPared_500,cPared_1000,cPared_2000,cPared_4000,
                      cSuelo_125,cSuelo_250,cSuelo_500,cSuelo_1000,cSuelo_2000,cSuelo_4000,
                      cTecho_125,cTecho_250,cTecho_500,cTecho_1000,cTecho_2000,cTecho_4000);

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!absortionCoefOkOctaves(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortion_area_125 = getRoomAbsortionArea(room,cPared_125,cTecho_125,cSuelo_125);
    absortion_area_250 = getRoomAbsortionArea(room,cPared_250,cTecho_250,cSuelo_250);
    absortion_area_500 = getRoomAbsortionArea(room,cPared_500,cTecho_500,cSuelo_500);
    absortion_area_1000 = getRoomAbsortionArea(room,cPared_1000,cTecho_1000,cSuelo_1000);
    absortion_area_2000 = getRoomAbsortionArea(room,cPared_2000,cTecho_2000,cSuelo_2000);
    absortion_area_4000 = getRoomAbsortionArea(room,cPared_4000,cTecho_4000,cSuelo_4000);

    // Sabine
    trSabine[0] = getReverTimeSabine(volume,absortion_area_125);
    trSabine[1] = getReverTimeSabine(volume,absortion_area_250);
    trSabine[2] = getReverTimeSabine(volume,absortion_area_500);
    trSabine[3] = getReverTimeSabine(volume,absortion_area_1000);
    trSabine[4] = getReverTimeSabine(volume,absortion_area_2000);
    trSabine[5] = getReverTimeSabine(volume,absortion_area_4000);

    // Eyring
    trEyring[0] = getReverTimeEyring(room,volume,absortion_area_125);
    trEyring[1] = getReverTimeEyring(room,volume,absortion_area_250);
    trEyring[2] = getReverTimeEyring(room,volume,absortion_area_500);
    trEyring[3] = getReverTimeEyring(room,volume,absortion_area_1000);
    trEyring[4] = getReverTimeEyring(room,volume,absortion_area_2000);
    trEyring[5] = getReverTimeEyring(room,volume,absortion_area_4000);

    createReverberationTable(trSabine,trEyring);
    renderDistances(canvasOct);
    plotOctavesGraphEmpty(canvasOct);
    plotOctavesGraph(canvasOct);
  }
}
