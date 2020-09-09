function myCanvas(a,b) {
  canvasSuperior = document.getElementById("canvasSuperior");
  canvasFrontal = document.getElementById("canvasFrontal");

  if (!canvasSuperior && !canvasFrontal) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctxSuperior = canvasSuperior.getContext("2d");
  ctxFrontal = canvasFrontal.getContext("2d");

  drawAxes(ctxSuperior);
  drawText(ctxSuperior,"x [m]",[250,290]);
  drawText(ctxSuperior,"y [m]",[10,20]);
  drawAxes(ctxFrontal);
  drawText(ctxFrontal,"x [m]",[250,290]);
  drawText(ctxFrontal,"z [m]",[10,20]);

}

function main(t,xv,yv,zv,xs,ys,zs,xm,ym,zm) {

  var room = new Room();
  var source = new Object();
  var microphone = new Object();

  var reverTime = parseFloat(document.getElementById(t).value);

  /* Get room varianles */
  getPosition(room,xv,yv,zv);

  /* Get position of source */
  getPosition(source,xs,ys,zs);

  /* Get position of micro */
  getPosition(microphone,xm,ym,zm);

  if (isInside(microphone.long,room.long) && isInside(microphone.wide,room.wide) && isInside(microphone.high,room.high) &&
      isInside(source.long,room.long) && isInside(source.wide,room.wide) && isInside(source.high,room.high)) {

    var dmin = getMinDistance(room, reverTime)

    var dis = distance(source, microphone)

    var ok = isCorrect(dis, dmin)

    drawDistanceMsg(ok,dmin);

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
    drawDistance(canvasSuperior,source.long,source.wide,globalScale,dmin);
    drawDistance(canvasFrontal,source.long,source.high,globalScale,dmin);

  } else {
    alert("Parámetros fuera del rango.\nPor favor, asegurese de que los parámetros introducidos se encuentren dentro del recinto.")
  }

  var a = new SuggestedPoints();
  getSourceMultiplePoints(room, a);

  console.log(a);
}
