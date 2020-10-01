function optionGetReverberationTime(option,coef_t,coef_pared_1,coef_pared_2,
                                    coef_pared_3,coef_pared_4,coef_suelo) {

  var room = RoomObject;
  var reverTime = ReverberationTime;
  var absortion_area;
  var volume = room.volume();
  var octave = "125";

  getRoomDimensions(room);
  getRoomAbsocionCoef(room,coef_techo,coef_pared_1,coef_pared_2,coef_pared_3,coef_pared_4,coef_suelo);

  if (!volume) {
    openPopup(CommentRoomKO);
  }else if (!absortionCoefOk(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortion_area = getRoomAbsortionArea(room,coef_abs_wall_a,coef_abs_wall_b,coef_abs_wall_c,coef_abs_wall_d,coef_abs_floor,coef_abs_roof);
    switch (option) {
      case 'Sabine':
        reverTime = getReverTimeSabine(volume,absortion_area);
        break;
      case 'Eyring':
        reverTime = getReverTimeEyring(room,volume,absortion_area);
        break;
      default:
        break;
    }
    putReverTimeMsg(option,reverTime);
  }
}

function optionGetReverberationTimeOctaves(option,a_125,a_250,a_2000,a_4000,
                                    b_125,b_250,b_500,b_1000,b_2000,b_4000,
                                    c_125,c_250,c_500,c_1000,c_2000,c_4000,
                                    d_125,d_250,d_500,d_1000,d_2000,d_4000,
                                    s_125,s_250,s_500,s_1000,s_200,s_4000,
                                    t_125,t_250,t_500,t_1000,t_200,t_4000) {

  var room = RoomObject;
  var reverTime = ReverberationTimeOctaves;
  var absortion_area;
  var volume = room.volume();

  getRoomDimensions(room);
  getRoomAbsocionCoefOctaves(room,a_125,a_250,a_2000,a_4000,
                    b_125,b_250,b_500,b_1000,b_2000,b_4000,
                    c_125,c_250,c_500,c_1000,c_2000,c_4000,
                    d_125,d_250,d_500,d_1000,d_2000,d_4000,
                    s_125,s_250,s_500,s_1000,s_200,s_4000,
                    t_125,t_250,t_500,t_1000,t_200,t_4000);

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!absortionCoefOkOctaves(room)) {
    openPopup(CommentCoefKO);
  } else {
    absortion_area_125 = getRoomAbsortionArea(room,a_125,b_125,c_125,d_125,s_125,t_125);
    absortion_area_250 = getRoomAbsortionArea(room,a_250,b_250,c_250,d_250,s_250,t_250);
    absortion_area_500 = getRoomAbsortionArea(room,a_500,b_500,c_500,d_500,s_500,t_500);
    absortion_area_1000 = getRoomAbsortionArea(room,a_1000,b_1000,c_1000,d_1000,s_1000,t_1000);
    absortion_area_2000 = getRoomAbsortionArea(room,a_2000,b_2000,c_2000,d_2000,s_2000,t_2000);
    absortion_area_4000 = getRoomAbsortionArea(room,a_4000,b_4000,c_4000,d_4000,s_4000,t_4000);

    switch (option) {
      case 'Sabine':
        reverTime[0] = getReverTimeSabine(volume,absortion_area_125);
        reverTime[1] = getReverTimeSabine(volume,absortion_area_250);
        reverTime[2] = getReverTimeSabine(volume,absortion_area_500);
        reverTime[3] = getReverTimeSabine(volume,absortion_area_1000);
        reverTime[4] = getReverTimeSabine(volume,absortion_area_2000);
        reverTime[5] = getReverTimeSabine(volume,absortion_area_4000);
        break;
      case 'Eyring':
        reverTime[0] = getReverTimeEyring(room,volume,absortion_area_125);
        reverTime[1] = getReverTimeEyring(room,volume,absortion_area_250);
        reverTime[2] = getReverTimeEyring(room,volume,absortion_area_500);
        reverTime[3] = getReverTimeEyring(room,volume,absortion_area_1000);
        reverTime[4] = getReverTimeEyring(room,volume,absortion_area_2000);
        reverTime[5] = getReverTimeEyring(room,volume,absortion_area_4000);
        break;
      default:

    }
  }

  console.log(reverTime);
}
