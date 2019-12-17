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

  var volume = new Array(3);
  var ps = new Array(3);
  var pm = new Array(3);

  var trever = parseFloat(document.getElementById(t).value);

//  document.getElementById("demo").innerHTML = x

  /* Get room varianles */
  volume = getPosition(xv,yv,zv);

  /* Get position of source */
  ps = getPosition(xs,ys,zs);

  /* Get position of micro */
  pm = getPosition(xm,ym,zm);

  if (isInside(pm[0],volume[0]) && isInside(pm[1],volume[1]) && isInside(pm[2],volume[2])) {
    var dmin = getMinDistance(volume, trever)

    var dis = distance(ps, pm)

    var ok = isCorrect(dis, dmin)
    
    if (ok) {
      console.log("Distancia correcta");
    } else {
      console.log("Distancia incorrecta");
    }

    drawDistanceMsg(ok);

    canvasSuperior = document.getElementById("canvasSuperior");
    canvasFrontal = document.getElementById("canvasFrontal");

    if (!canvasSuperior && !canvasFrontal) {
      console.log('Failed to retrieve the <canvas> element');
      return false;
    }

    ctxSuperior = canvasSuperior.getContext("2d");
    ctxFrontal = canvasFrontal.getContext("2d");

    t_scale[0] = getScale(volume[0],m_scale);
    t_scale[1] = getScale(volume[1],m_scale);
    t_scale[2] = getScale(volume[2],m_scale);

    drawAxes(ctxSuperior);
    drawText(ctxSuperior,"x [m]",[250,290]);
    drawText(ctxSuperior,"y [m]",[10,20]);
    drawAxes(ctxFrontal);
    drawText(ctxFrontal,"x [m]",[250,290]);
    drawText(ctxFrontal,"z [m]",[10,20]);

    drawRoom(canvasSuperior,volume[0],volume[1], t_scale);
    drawRoom(canvasFrontal,volume[0],volume[2], t_scale);

    // draw the source
    drawObjet(canvasSuperior,ps[0],ps[1],t_scale, red);
    drawObjet(canvasFrontal,ps[0],ps[2],t_scale,red);

    // draw the source
    drawObjet(canvasSuperior,pm[0],pm[1],t_scale,blue);
    drawObjet(canvasFrontal,pm[0],pm[2],t_scale,blue);

    // draw the min distance
    drawDistance(canvasSuperior,ps[0],ps[1],t_scale, dmin);
    drawDistance(canvasFrontal,ps[0],ps[2],t_scale, dmin);

  } else {

    alert("Parámetros fuera del rango.\nPor favor, asegurese de que los parámetros introducidos se encuentren dentro del recinto.")

  }
}
