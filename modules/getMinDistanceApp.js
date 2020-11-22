function getGetMinDistance(t) {
  var dmin, msg, id;
  var room = RoomObject;
  var reverTime = parseFloat(document.getElementById(t).value);
  var volume = room.volume();

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!reverTime) {
    openPopup(CommentReverTimeKO);
  } else {
    MinDistance = getMinDistance(room, reverTime);

    dmin = getRound2Decimals(MinDistance);
    id = "minDistanceMsg";
    msg = '<div class="good">La distancia mínima a la que debe situarse el micrófono de la fuente es de '+dmin+' [m]</div>';

    putMessage(id, msg);
  }
}

function optionGetAndDrawMinDistance(t,xs,ys,zs,xm,ym,zm) {

  var room = RoomObject;
  var source = Source;
  var microphone = Microphone;
  var volume = room.volume();
  var reverTime = parseFloat(document.getElementById(t).value);
  var controlMicro, controlSource;

  /* Get position of source */
  getPosition(source,xs,ys,zs);
  /* Get position of micro */
  getPosition(microphone,xm,ym,zm);

  controlSource = source.long*source.wide*source.high;
  controlMicro = microphone.long*microphone.wide*microphone.high;

  if (!volume) {
    openPopup(CommentRoomKO);
  } else if (!reverTime) {
    openPopup(CommentReverTimeKO);
  } else if (!(controlSource) || !(controlMicro)) {
    openPopup(CommentObjectKO);
  } else if (!isObjectInsideRoom(source,room) || !isObjectInsideRoom(microphone,room)) {
    openPopup(CommentObjectOutside);
  } else if (!compliesRegulation(source) || !compliesRegulation(microphone)) {
    openPopup(CommentRegulationKO);
  } else {
    MinDistance = getMinDistance(room, reverTime)
    var dis = distance(source, microphone)

    var ok = isCorrect(dis, MinDistance)

    putOkDistanceMsg(ok,dis);

    canvasPlanta = document.getElementById("canvasPlanta");
    canvasAlzado = document.getElementById("canvasAlzado");

    if (!canvasPlanta && !canvasAlzado) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }

    ctxSuperior = canvasPlanta.getContext("2d");
    ctxFrontal = canvasAlzado.getContext("2d");

    GlobalScale.xScale = getScale(room.long,NormalScale);
    GlobalScale.yScale = getScale(room.wide,NormalScale);
    GlobalScale.zScale = getScale(room.high,NormalScale);

    render(canvasPlanta);
    render(canvasAlzado);

    drawAxes(ctxSuperior);
    drawText(ctxSuperior,Arial20,"x [m]",[250,290]);
    drawText(ctxSuperior,Arial20,"y [m]",[10,20]);
    drawAxes(ctxFrontal);
    drawText(ctxFrontal,Arial20,"x [m]",[250,290]);
    drawText(ctxFrontal,Arial20,"z [m]",[10,20]);

    drawRoom(canvasPlanta,room.long,room.wide, GlobalScale);
    drawRoom(canvasAlzado,room.long,room.high, GlobalScale);

    // draw the source
    drawObjet(canvasPlanta,source.long,source.wide,GlobalScale,Red);
    drawObjet(canvasAlzado,source.long,source.high,GlobalScale,Red);

    // draw the micriphone
    drawObjet(canvasPlanta,microphone.long,microphone.wide,GlobalScale,Blue);
    drawObjet(canvasAlzado,microphone.long,microphone.high,GlobalScale,Blue);

    // draw the min distance
    drawDistance(canvasPlanta,source.long,source.wide,GlobalScale,MinDistance);
    drawDistance(canvasAlzado,source.long,source.high,GlobalScale,MinDistance);
  }
}
