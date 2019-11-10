
function difference(nf, np) {
  return Math.pow(nf - np, 2);
}

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
var px_scale = 20;
var m_scale = 1;
var xy_scale = [1,1];
var xz_scale = [1,1];
var t_scale = [1,1,1];
var max_long = 230;
var min_long = 200;
var start = 20;

// FUNCTIONS

function getScale(n, scale) {

  var in_area = false;
  this.scale = scale;
  var long = n*px_scale*this.scale;
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

function drawAxes(ctx) {

  // Draw y-axe
  drawLine(ctx,10,10,10,290);
  // Draw x-axe
  drawLine(ctx,10,290,290,290);
}

function drawRectangle(canvas,r_width,r_height) {
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
  var b = [start,canvas.height-(start+r_height)];
  var c = [start+r_width,canvas.height-(start+r_height)];
  var d = [start+r_width,canvas.height-start];

  // Draw 1
  drawLine(ctx,a[0],a[1],b[0],b[1]);
  // Draw 2
  drawLine(ctx,b[0],b[1],c[0],c[1]);
  // Draw 3
  drawLine(ctx,c[0],c[1],d[0],d[1]);
  // Draw 4
  drawLine(ctx,d[0],d[1],a[0],a[1]);
}

function drawRoom(canvas,a,b,scale) {

  var s = Math.min(scale[0],scale[1],scale[2]);
  var length = a*s*px_scale;
  var width  = b*s*px_scale;

  drawRectangle(canvas,length,width);
}

function drawSources(canvas,x,y,scale) {
  var ctx = canvas.getContext("2d");

  var s = Math.min(scale[0],scale[1],scale[2]);

  var w = x*s*px_scale;
  var h = y*s*px_scale;


  var scaleWidth  = start+w;
  var scaleHeight = canvas.height-(start+h);
//  var scaleHeight = (canvas.height-(start+h))*s;
//  var scaleWidth  = (start+w)*s;

  console.log("x: "+x,"y: "+y,"scala:"+scale);
  console.log("width"+w,"height"+h);
  console.log(start);
  console.log(scaleWidth,scaleHeight);

  ctx.save();

  ctx.beginPath();
  // arc(center x, center y, radious, start angle, end angle, counterclockwise)
  // ***** counterclockwise: Specifies whether the drawing hould be counterclockwise
  // ***** or clockwise. False is default, and indicates clockwise, while true indicates
  // ***** counter-clockwise
  ctx.arc(scaleWidth,scaleHeight,5, 0, 2*Math.PI, true);

  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.fill();

  ctx.restore();
}

function myCanvas(a,b) {
  canvas_superior = document.getElementById("canvas_superior");
  canvas_frontal = document.getElementById("canvas_frontal");


  if (!canvas_superior && !canvas_frontal) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx_s = canvas_superior.getContext("2d");
  ctx_f = canvas_frontal.getContext("2d");

  drawAxes(ctx_s);
  drawAxes(ctx_f);
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

  canvas_superior = document.getElementById("canvas_superior");
  canvas_frontal = document.getElementById("canvas_frontal");

  if (!canvas_superior && !canvas_frontal) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx_s = canvas_superior.getContext("2d");
  ctx_f = canvas_frontal.getContext("2d");

//  ctx_s.clearRect(0,0, canvas_superior.width, canvas_superior.height);
//  ctx_f.clearRect(0,0, canvas_frontal.width, canvas_frontal.height);

  t_scale[0] = getScale(volume[0],m_scale);
  t_scale[1] = getScale(volume[1],m_scale);
  t_scale[2] = getScale(volume[2],m_scale);

  drawRoom(canvas_superior,volume[0],volume[1], t_scale);
  drawRoom(canvas_frontal,volume[0],volume[2], t_scale);

  drawSources(canvas_superior,ps[0],ps[1],t_scale);
  drawSources(canvas_frontal,ps[0],ps[2],t_scale);
}
