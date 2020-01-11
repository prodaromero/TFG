/*********
  CANVAS
**********/

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

function drawDistanceMsg(isok) {
  if (isok) {
    document.getElementById("msgSpace").innerHTML = '<div class="distanceMsg good">The micriophone is in correct position</div>'
  } else {
    document.getElementById("msgSpace").innerHTML = '<div class="distanceMsg error">The micriophone isn\'t in correct position</div>'
  }
}

function drawReverTimeMsg(tr) {

  document.getElementById("putReverTime").innerHTML = '<div class="divReverTime">Your reverberation time is: '+tr+' [s].</div>'

}
