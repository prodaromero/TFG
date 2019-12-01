/******************
  ACOUSTIC FORMULAS
*********************/

function distance(s, m) {

  // X axis difference
  var xd = difference(s[0], m[0]);
  // Y axis difference
  var yd = difference(s[1], m[1]);
  // Z axis difference
  var zd = difference(s[2], m[2]);

  return Math.sqrt(xd + yd + zd);
}

function minDistance(v) {
  return v*2;
}

/* Function to verify if points are in correct position */
function isCorrect(dis, dmin) {
  return dis > dmin;
}

function isSameType(x,y,z) {return ((typeof(x) && typeof(y) && typeof(z)) === "number");}

/* Function to get the position */
function getPosition(a,b,c) {
  //var ps = new Array(3);
  var x = parseFloat(document.getElementById(a).value);
  var y = parseFloat(document.getElementById(b).value);
  var z = parseFloat(document.getElementById(c).value);

  if (!isSameType(x,y,z)) {
    x = 0;
    y = 0;
    x = 0;
  }

  return Array(x,y,z);
}

function getVolume(v) {
  return v[0]*v[1]*v[2];
}

function getMinDistance(v,t) {
  var c = 341;
  console.log(v, t);
  var vol = getVolume(v)
  var dmin = 2*Math.sqrt(vol/(c*t));
  console.log("d MINIMA " + dmin);
  return dmin;
}

/*********
  CANVAS
**********/

// VARIABLES

var canvas;
var ctx;
var pxScale = 20;
var m_scale = 1;
var xy_scale = [1,1];
var xz_scale = [1,1];
var t_scale = [1,1,1];
var max_long = 230;
var min_long = 200;
var start = 40;
var red = "red";
var blue = "blue";

// FUNCTIONS

function getScale(n, scale) {

  var in_area = false;
  this.scale = scale;
  var long = n*pxScale*this.scale;
  if (!in_area) {
    if (long > max_long) {
      this.scale = this.scale*0.90;
      this.scale = getScale(n,this.scale);

    }else if (long < min_long) {
      this.scale = this.scale*1.10;
      this.scale = getScale(n,this.scale);
    } else {
      in_area = true;
    }
  }

  return this.scale;
}

function drawLine(ctx,a,b,c,d) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(a, b);
  ctx.lineTo(c, d);
  ctx.stroke();

  ctx.restore();
}

function drawText(ctx,word,position) {

    ctx.font = "20px Arial";
    ctx.fillText(word,position[0],position[1]);
}

function drawAxes(ctx,word,position) {

  // Draw x-axe
  drawLine(ctx,30,270,290,270);
  // Draw y-axe
  drawLine(ctx,30,30,30,270);
}

function drawRectangle(canvas,widthScaled,heightScaled,widthReal,heightReal) {
  var ctx = canvas.getContext("2d");

  /*
          b___________2_________c
          |                    |
          |                    |
         1|                    |3
          |                    |
         a|___________4________|d

  */

  var a = [start,canvas.height-start];
  var b = [start,canvas.height-(start+heightScaled)];
  var c = [start+widthScaled,canvas.height-(start+heightScaled)];
  var d = [start+widthScaled,canvas.height-start];

  // Draw 1
  drawLine(ctx,a[0],a[1],b[0],b[1]);
  // Draw 2
  drawLine(ctx,b[0],b[1],c[0],c[1]);
  // Draw 3
  drawLine(ctx,c[0],c[1],d[0],d[1]);
  // Draw 4
  drawLine(ctx,d[0],d[1],a[0],a[1]);

  var xMid = (b[0]+c[0])/2;
  var yMid = (c[1]+d[1])/2;

  drawText(ctx,widthReal,[xMid,295]);
  drawText(ctx,heightReal,[5,yMid]);
}

function drawRoom(canvas,a,b,scale) {

  var s = Math.min(scale[0],scale[1],scale[2]);
  var lengthScaled = a*s*pxScale;
  var widthScaled  = b*s*pxScale;

  drawRectangle(canvas,lengthScaled,widthScaled,a,b);
}

function drawObjet(canvas,x,y,scale, color) {
  var ctx = canvas.getContext("2d");

  var s = Math.min(scale[0],scale[1],scale[2]);

  var w = x*s*pxScale;
  var h = y*s*pxScale;


  var scaleWidth  = start+w;
  var scaleHeight = canvas.height-(start+h);

  ctx.save();

  ctx.beginPath();
  // arc(center x, center y, radious, start angle, end angle, counterclockwise)
  // ***** counterclockwise: Specifies whether the drawing hould be counterclockwise
  // ***** or clockwise. False is default, and indicates clockwise, while true indicates
  // ***** counter-clockwise
  ctx.arc(scaleWidth,scaleHeight,5, 0, 2*Math.PI, true);

  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function drawDistance(canvas,x,y,scale,dis) {

    var ctx = canvas.getContext("2d");

    var s = Math.min(scale[0],scale[1],scale[2]);

    var w = x*s*pxScale;
    var h = y*s*pxScale;
    var disScaled = dis*s*pxScale;


    var scaleWidth  = start+w;
    var scaleHeight = canvas.height-(start+h);

    drawLine(ctx,scaleWidth,scaleHeight,scaleWidth+disScaled,scaleHeight);

    var disRound = parseFloat(dis).toFixed(2);

    ctx.font = "10px Arial";
    ctx.fillText("dmin= "+disRound+"m",scaleWidth+5,scaleHeight-3);

    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    // arc(center x, center y, radious, start angle, end angle, counterclockwise)
    // ***** counterclockwise: Specifies whether the drawing hould be counterclockwise
    // ***** or clockwise. False is default, and indicates clockwise, while true indicates
    // ***** counter-clockwise
    ctx.arc(scaleWidth,scaleHeight,disScaled, 0, 2*Math.PI, true);

    ctx.fillStyle = red;
    ctx.fill();



    ctx.restore();
}

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

  /* Get position of source */
  volume = getPosition(xv,yv,zv);

  /* Get position of source */
  ps = getPosition(xs,ys,zs);

  /* Get position of micro */
  pm = getPosition(xm,ym,zm);

  var dmin = getMinDistance(volume, trever)

  var dis = distance(ps, pm)

  if (isCorrect(dis, dmin)) {
    console.log("Distancia correcta");
  } else {
    console.log("Distancia incorrecta");
  }

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
}
