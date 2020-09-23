function optionGetMinDistance(t,xs,ys,zs,xm,ym,zm) {

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

    drawDistanceMsg(ok,MinDistance);

    canvasSuperior = document.getElementById("canvasSuperior");
    canvasFrontal = document.getElementById("canvasFrontal");

    if (!canvasSuperior && !canvasFrontal) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }

    ctxSuperior = canvasSuperior.getContext("2d");
    ctxFrontal = canvasFrontal.getContext("2d");

    globalScale.xScale = getScale(room.long,normalScale);
    globalScale.yScale = getScale(room.wide,normalScale);
    globalScale.zScale = getScale(room.high,normalScale);

    render(canvasSuperior, canvasFrontal);

    drawAxes(ctxSuperior);
    drawText(ctxSuperior,"x [m]",[250,290]);
    drawText(ctxSuperior,"y [m]",[10,20]);
    drawAxes(ctxFrontal);
    drawText(ctxFrontal,"x [m]",[250,290]);
    drawText(ctxFrontal,"z [m]",[10,20]);

    drawRoom(canvasSuperior,room.long,room.wide, globalScale);
    drawRoom(canvasFrontal,room.long,room.high, globalScale);

    // draw the source
    drawObjet(canvasSuperior,source.long,source.wide,globalScale,red);
    drawObjet(canvasFrontal,source.long,source.high,globalScale,red);

    // draw the source
    drawObjet(canvasSuperior,microphone.long,microphone.wide,globalScale,blue);
    drawObjet(canvasFrontal,microphone.long,microphone.high,globalScale,blue);

    // draw the min distance
    drawDistance(canvasSuperior,source.long,source.wide,globalScale,MinDistance);
    drawDistance(canvasFrontal,source.long,source.high,globalScale,MinDistance);
  }
}
