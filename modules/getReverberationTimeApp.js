function optionGetReverberationTime(coef_techo,coef_suelo,coef_pared_a,
                                    coef_pared_b,coef_pared_c,coef_pared_d) {
  var absortionArea,roomMeanAbsCoef,trSabine,trEyring,fcSchroeder;
  var room = RoomObject;
  var trSabine = ReverberationTimeSabine;
  var trEyring = ReverberationTimeEyring;
  var volume = room.volume();

  var cTecho = parseFloat(document.getElementById(coef_techo).value);
  var cSuelo = parseFloat(document.getElementById(coef_suelo).value);
  var cParedA = parseFloat(document.getElementById(coef_pared_a).value);
  var cParedB = parseFloat(document.getElementById(coef_pared_b).value);
  var cParedC = parseFloat(document.getElementById(coef_pared_c).value);
  var cParedD = parseFloat(document.getElementById(coef_pared_d).value);

  getRoomDimensions(room);
  getRoomAbsocionCoef(room,cTecho,cSuelo,cParedA,cParedB,cParedC,cParedD);

  if (!volume) {
    openPopup(CommentRoomKO);
  }else if (!absortionCoefOk(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortionArea = getRoomAbsortionArea(room,cTecho,cSuelo,cParedA,cParedB,cParedC,cParedD);
    roomMeanAbsCoef = getMeanAbsCoef(room,cTecho,cSuelo,cParedA,cParedB,cParedC,cParedD);

    trSabine = getReverTimeSabine(volume,absortionArea);
    trEyring = getReverTimeEyring(room,volume,absortionArea);

    if (roomMeanAbsCoef<0.2){fcSchroeder = getSchroederFrecuency(trSabine, volume);}
    else {fcSchroeder = getSchroederFrecuency(trEyring, volume);}

    putReverTimeMsg(trSabine,trEyring,fcSchroeder);
  }
}

function optionGetReverberationTimeOctaves(
          techo_125,techo_250,techo_500,techo_1000,techo_2000,techo_4000,
          suelo_125,suelo_250,suelo_500,suelo_1000,suelo_2000,suelo_4000,
          pared_125_a,pared_250_a,pared_500_a,pared_1000_a,pared_2000_a,pared_4000_a,
          pared_125_b,pared_250_b,pared_500_b,pared_1000_b,pared_2000_b,pared_4000_b,
          pared_125_c,pared_250_c,pared_500_c,pared_1000_c,pared_2000_c,pared_4000_c,
          pared_125_d,pared_250_d,pared_500_d,pared_1000_d,pared_2000_d,pared_4000_d) {

  var absortionArea,roomMeanAbsCoef_500,roomMeanAbsCoef_1000,roomMeanAbsCoef_2000,
    roomMeanAbsCoef,fcSchroeder,trMeanSabine,trMeanEyring;

  var canvasOct = document.getElementById("canvasOctaves");
  var room = RoomObject;
  var trSabine = ReverberationTimeOctavesSabine;
  var trEyring = ReverberationTimeOctavesEyring;
  var volume = room.volume();

  var cTecho_125  = parseFloat(document.getElementById(techo_125).value);
  var cTecho_250  = parseFloat(document.getElementById(techo_250).value);
  var cTecho_500  = parseFloat(document.getElementById(techo_500).value);
  var cTecho_1000 = parseFloat(document.getElementById(techo_1000).value);
  var cTecho_2000 = parseFloat(document.getElementById(techo_2000).value);
  var cTecho_4000 = parseFloat(document.getElementById(techo_4000).value);
  var cSuelo_125  = parseFloat(document.getElementById(suelo_125).value);
  var cSuelo_250  = parseFloat(document.getElementById(suelo_250).value);
  var cSuelo_500  = parseFloat(document.getElementById(suelo_500).value);
  var cSuelo_1000 = parseFloat(document.getElementById(suelo_1000).value);
  var cSuelo_2000 = parseFloat(document.getElementById(suelo_2000).value);
  var cSuelo_4000 = parseFloat(document.getElementById(suelo_4000).value);
  var cParedA_125  = parseFloat(document.getElementById(pared_125_a).value);
  var cParedA_250  = parseFloat(document.getElementById(pared_250_a).value);
  var cParedA_500  = parseFloat(document.getElementById(pared_500_a).value);
  var cParedA_1000 = parseFloat(document.getElementById(pared_1000_a).value);
  var cParedA_2000 = parseFloat(document.getElementById(pared_2000_a).value);
  var cParedA_4000 = parseFloat(document.getElementById(pared_4000_a).value);
  var cParedB_125  = parseFloat(document.getElementById(pared_125_b).value);
  var cParedB_250  = parseFloat(document.getElementById(pared_250_b).value);
  var cParedB_500  = parseFloat(document.getElementById(pared_500_b).value);
  var cParedB_1000 = parseFloat(document.getElementById(pared_1000_b).value);
  var cParedB_2000 = parseFloat(document.getElementById(pared_2000_b).value);
  var cParedB_4000 = parseFloat(document.getElementById(pared_4000_b).value);
  var cParedC_125  = parseFloat(document.getElementById(pared_125_c).value);
  var cParedC_250  = parseFloat(document.getElementById(pared_250_c).value);
  var cParedC_500  = parseFloat(document.getElementById(pared_500_c).value);
  var cParedC_1000 = parseFloat(document.getElementById(pared_1000_c).value);
  var cParedC_2000 = parseFloat(document.getElementById(pared_2000_c).value);
  var cParedC_4000 = parseFloat(document.getElementById(pared_4000_c).value);
  var cParedD_125  = parseFloat(document.getElementById(pared_125_d).value);
  var cParedD_250  = parseFloat(document.getElementById(pared_250_d).value);
  var cParedD_500  = parseFloat(document.getElementById(pared_500_d).value);
  var cParedD_1000 = parseFloat(document.getElementById(pared_1000_d).value);
  var cParedD_2000 = parseFloat(document.getElementById(pared_2000_d).value);
  var cParedD_4000 = parseFloat(document.getElementById(pared_4000_d).value);

  getRoomDimensions(room);
  getRoomAbsocionCoefOctaves(room,cTecho_125,cTecho_250,cTecho_500,cTecho_1000,cTecho_2000,cTecho_4000,
                      cSuelo_125,cSuelo_250,cSuelo_500,cSuelo_1000,cSuelo_2000,cSuelo_4000,
                      cParedA_125,cParedA_250,cParedA_500,cParedA_1000,cParedA_2000,cParedA_4000,
                      cParedB_125,cParedB_250,cParedB_500,cParedB_1000,cParedB_2000,cParedB_4000,
                      cParedC_125,cParedC_250,cParedC_500,cParedC_1000,cParedC_2000,cParedC_4000,
                      cParedD_125,cParedD_250,cParedD_500,cParedD_1000,cParedD_2000,cParedD_4000);

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!absortionCoefOkOctaves(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortionArea_125 = getRoomAbsortionArea(room,cTecho_125,cSuelo_125,cParedA_125,cParedB_125,cParedC_125,cParedD_125);
    absortionArea_250 = getRoomAbsortionArea(room,cTecho_250,cSuelo_250,cParedA_250,cParedB_250,cParedC_250,cParedD_250);
    absortionArea_500 = getRoomAbsortionArea(room,cTecho_500,cSuelo_500,cParedA_500,cParedB_500,cParedC_500,cParedD_500);
    absortionArea_1000 = getRoomAbsortionArea(room,cTecho_1000,cSuelo_1000,cParedA_1000,cParedB_1000,cParedC_1000,cParedD_1000);
    absortionArea_2000 = getRoomAbsortionArea(room,cTecho_2000,cSuelo_2000,cParedA_2000,cParedB_2000,cParedC_2000,cParedD_2000);
    absortionArea_4000 = getRoomAbsortionArea(room,cTecho_4000,cSuelo_4000,cParedA_4000,cParedB_4000,cParedC_4000,cParedD_4000);

    roomMeanAbsCoef_500 = getMeanAbsCoef(room,cTecho_500,cSuelo_500,cParedA_500,cParedB_500,cParedC_500,cParedD_500);
    roomMeanAbsCoef_1000 = getMeanAbsCoef(room,cTecho_1000,cSuelo_1000,cParedA_1000,cParedB_1000,cParedC_1000,cParedD_1000);
    roomMeanAbsCoef_2000 = getMeanAbsCoef(room,cTecho_2000,cSuelo_2000,cParedA_2000,cParedB_2000,cParedC_2000,cParedD_2000);
    roomMeanAbsCoef = getRound2Decimals((roomMeanAbsCoef_500+roomMeanAbsCoef_1000+roomMeanAbsCoef_2000)/3);

    // Sabine
    trSabine[0] = getReverTimeSabine(volume,absortionArea_125);
    trSabine[1] = getReverTimeSabine(volume,absortionArea_250);
    trSabine[2] = getReverTimeSabine(volume,absortionArea_500);
    trSabine[3] = getReverTimeSabine(volume,absortionArea_1000);
    trSabine[4] = getReverTimeSabine(volume,absortionArea_2000);
    trSabine[5] = getReverTimeSabine(volume,absortionArea_4000);

    // Eyring
    trEyring[0] = getReverTimeEyring(room,volume,absortionArea_125);
    trEyring[1] = getReverTimeEyring(room,volume,absortionArea_250);
    trEyring[2] = getReverTimeEyring(room,volume,absortionArea_500);
    trEyring[3] = getReverTimeEyring(room,volume,absortionArea_1000);
    trEyring[4] = getReverTimeEyring(room,volume,absortionArea_2000);
    trEyring[5] = getReverTimeEyring(room,volume,absortionArea_4000);

    createReverberationTable(trSabine,trEyring);
    trMeanSabine = getMean(trSabine[2],trSabine[3]);
    trMeanEyring = getMean(trEyring[2],trEyring[3]);

    if (roomMeanAbsCoef<0.2){fcSchroeder = getSchroederFrecuency(trMeanSabine, volume);}
    else {fcSchroeder = getSchroederFrecuency(trMeanEyring, volume);}
    putReverTimeOctavesMsg(fcSchroeder);
    render(canvasOct);
    plotOctavesGraphEmpty(canvasOct);
    plotOctavesGraph(canvasOct);
  }
}
