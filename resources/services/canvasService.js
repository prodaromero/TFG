/*********
  CANVAS
**********/

// ** Generales ** \\

function getScale(n, scale) {

  var in_area = false;
  this.scale = scale;
  var long = n*pxScale*this.scale;
  if (!in_area) {
    if (long > maxLong) {
      this.scale = this.scale*0.95;
      this.scale = getScale(n,this.scale);

    }else if (long < minLong) {
      this.scale = this.scale*1.04;
      this.scale = getScale(n,this.scale);
    } else {
      in_area = true;
    }
  }
  return this.scale;
}

function drawLine(ctx,a,b,c,d,width,color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(a, b);
  ctx.lineWidth = width;
  ctx.strokeStyle = color
  ctx.lineTo(c, d);
  ctx.stroke();

  ctx.restore();
}

function drawCircle(ctx,sWidth,sHeight,radio,color,alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  // arc(center x, center y, radious, start angle, end angle, counterclockwise)
  // ***** counterclockwise: Specifies whether the drawing hould be counterclockwise
  // ***** or clockwise. False is default, and indicates clockwise, while true indicates
  // ***** counter-clockwise
  ctx.arc(sWidth,sHeight,radio, 0, 2*Math.PI, true);

  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function drawText(ctx,font,word,position) {

    ctx.font = font;
    ctx.fillText(word,position[0],position[1]);
}

function drawAxes(ctx,word,position) {

  // Draw x-axe
  drawLine(ctx,30,270,290,270,2,Black);
  // Draw y-axe
  drawLine(ctx,30,30,30,270,2,Black);
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
  drawLine(ctx,a[0],a[1],b[0],b[1],2,Black);
  // Draw 2
  drawLine(ctx,b[0],b[1],c[0],c[1],2,Black);
  // Draw 3
  drawLine(ctx,c[0],c[1],d[0],d[1],2,Black);
  // Draw 4
  drawLine(ctx,d[0],d[1],a[0],a[1],2,Black);

  var xMid = (b[0]+c[0])/2;
  var yMid = (c[1]+d[1])/2;

  drawText(ctx,Arial20,widthReal,[xMid,295]);
  drawText(ctx,Arial20,heightReal,[5,yMid]);
}

function drawRoom(canvas,distanceA,distanceB,scale) {

  var minScale = Math.min(scale.xScale,scale.yScale,scale.zScale);
  var lengthScaled = distanceA*minScale*pxScale;
  var widthScaled  = distanceB*minScale*pxScale;

  drawRectangle(canvas,lengthScaled,widthScaled,distanceA,distanceB);
}

function drawObjet(canvas,distanceA,distanceB,scale,color) {
  var ctx = canvas.getContext("2d");

  var minScale = Math.min(scale.xScale,scale.yScale,scale.zScale);

  var width = distanceA*minScale*pxScale;
  var height = distanceB*minScale*pxScale;


  var scaleWidth  = start+width;
  var scaleHeight = canvas.height-(start+height);

  drawCircle(ctx,scaleWidth,scaleHeight,ObjectRadius,color,OpacityMax);
}

function drawDistance(canvas,x,y,scale,dis) {

  var ctx = canvas.getContext("2d");
  var s = Math.min(scale.xScale,scale.yScale,scale.zScale);

  var w = x*s*pxScale;
  var h = y*s*pxScale;
  var disScaled = dis*s*pxScale;


  var scaleWidth  = start+w;
  var scaleHeight = canvas.height-(start+h);

  drawLine(ctx,scaleWidth,scaleHeight,scaleWidth+disScaled,scaleHeight,2,Red);

  var disRound = getRound2Decimals(dis);

  ctx.font = Arial10;
  ctx.fillText("dmin= "+disRound+"m",scaleWidth+5,scaleHeight-3);

  drawCircle(ctx,scaleWidth,scaleHeight,disScaled,Red,OpacityMin);
}

function render(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width, canvas.height);
}

// ** Funciones getMinDistanceApp ** \\
function myCanvas(a,b) {
  canvasPlanta  = document.getElementById("canvasPlanta");
  canvasAlzado  = document.getElementById("canvasAlzado");
  canvasOctaves = document.getElementById("canvasOctaves");
  canvasSuggestedPlanta  = document.getElementById("suggestedPlanta");
  canvasSuggestedAlzado = document.getElementById("suggestedAlzado");

  if (!canvasPlanta && !canvasAlzado && !canvasOctaves && !canvasSuggestedPlanta && !canvasSuggestedAlzado) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctxSuperior = canvasPlanta.getContext("2d");
  ctxFrontal = canvasAlzado.getContext("2d");

  drawAxes(ctxSuperior);
  drawText(ctxSuperior,Arial20,"x [m]",[250,290]);
  drawText(ctxSuperior,Arial20,"y [m]",[10,20]);
  drawAxes(ctxFrontal);
  drawText(ctxFrontal,Arial20,"x [m]",[250,290]);
  drawText(ctxFrontal,Arial20,"z [m]",[10,20]);


  ctxSuggPlanta = canvasSuggestedPlanta.getContext("2d");
  ctxSuggAlzado = canvasSuggestedAlzado.getContext("2d");

  drawAxes(ctxSuggPlanta);
  drawText(ctxSuggPlanta,Arial20,"x [m]",[250,290]);
  drawText(ctxSuggPlanta,Arial20,"y [m]",[10,20]);
  drawAxes(ctxSuggAlzado);
  drawText(ctxSuggAlzado,Arial20,"x [m]",[250,290]);
  drawText(ctxSuggAlzado,Arial20,"z [m]",[10,20]);

  plotOctavesGraphEmpty(canvasOctaves);
}

// ** Funciones getShortListOfPointsApp ** \\
function initSuggestedPointsDraw(roomObject,canvasPlanta,canvasAlzado) {
  ctxSuggPlanta = canvasPlanta.getContext("2d");
  ctxSuggAlzado = canvasAlzado.getContext("2d");

  GlobalScale.xScale = getScale(roomObject.long,NormalScale);
  GlobalScale.yScale = getScale(roomObject.wide,NormalScale);
  GlobalScale.zScale = getScale(roomObject.high,NormalScale);

  render(canvasPlanta);
  render(canvasAlzado);

  drawAxes(ctxSuggPlanta);
  drawText(ctxSuggPlanta,Arial20,"x [m]",[250,290]);
  drawText(ctxSuggPlanta,Arial20,"y [m]",[10,20]);
  drawAxes(ctxSuggAlzado);
  drawText(ctxSuggAlzado,Arial20,"x [m]",[250,290]);
  drawText(ctxSuggAlzado,Arial20,"z [m]",[10,20]);

  drawRoom(canvasPlanta,roomObject.long,roomObject.wide, GlobalScale);
  drawRoom(canvasAlzado,roomObject.long,roomObject.high, GlobalScale);
}

function plotSuggestedPoints(escen) {
  var room = RoomObject;
  var list = ListOfSuggestedPoints[escen];
  var msg = '<h5 class="escen-msg">Representación escenario '+(escen+1)+'</h5>'

  putMessage("suggested-escenario", msg);
  canvasSuggestedPlanta  = document.getElementById("suggestedPlanta");
  canvasSuggestedAlzado = document.getElementById("suggestedAlzado");

  if (!canvasPlanta && !canvasAlzado && !canvasOctaves && !canvasSuggestedPlanta && !canvasSuggestedAlzado) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  initSuggestedPointsDraw(room,canvasSuggestedPlanta,canvasSuggestedAlzado);

  // draw the source
  drawObjet(canvasSuggestedPlanta,list[0].long,list[0].wide,GlobalScale,Red);
  drawObjet(canvasSuggestedAlzado,list[0].long,list[0].high,GlobalScale,Red);

  // draw the min distance
  drawDistance(canvasSuggestedPlanta,list[0].long,list[0].wide,GlobalScale,MinDistance);
  drawDistance(canvasSuggestedAlzado,list[0].long,list[0].high,GlobalScale,MinDistance);

  // draw the micriphone 1
  drawObjet(canvasSuggestedPlanta,list[1].long,list[1].wide,GlobalScale,Blue);
  drawObjet(canvasSuggestedAlzado,list[1].long,list[1].high,GlobalScale,Blue);

  // draw the micriphone 2
  drawObjet(canvasSuggestedPlanta,list[2].long,list[2].wide,GlobalScale,Blue);
  drawObjet(canvasSuggestedAlzado,list[2].long,list[2].high,GlobalScale,Blue);

  // draw the micriphone 3
  drawObjet(canvasSuggestedPlanta,list[3].long,list[3].wide,GlobalScale,Blue);
  drawObjet(canvasSuggestedAlzado,list[3].long,list[3].high,GlobalScale,Blue);
}

// ** Funciones getReverberationTimeApp ** \\
function plotOctavesGraphEmpty(canvas) {
  ctxOct = canvas.getContext("2d");

  drawAxes(ctxOct);
  drawText(ctxOct,Arial20,"T.R [s]",[10,20]);
  drawText(ctxOct,Arial10,"0",[20,270]);
  drawText(ctxOct,Arial20,"Hz",[290,290]);
  drawText(ctxOct,Arial10,"125",[30,285]);
  drawText(ctxOct,Arial10,"250",[75,285]);
  drawText(ctxOct,Arial10,"500",[120,285]);
  drawText(ctxOct,Arial10,"1K",[165,285]);
  drawText(ctxOct,Arial10,"2K",[210,285]);
  drawText(ctxOct,Arial10,"4K",[255,285]);
}

function plotMeasureInGraph(ctx,xPre,yPre,xPost,yPost,color) {
  drawCircle(ctxOct,xPre,yPre,ObjectRadius,color,OpacityMax);
  drawLine(ctxOct,xPre,yPre,xPost,yPost,4,color);
}

function plotOctavesGraph(canvas) {
  var c125,c250,c500,c1000,c2000,c4000;
  var trSabine = ReverberationTimeOctavesSabine;
  var trEyring = ReverberationTimeOctavesEyring;

  ctxOct = canvas.getContext("2d");

  var maxHighSabine = Math.max.apply(Math, ReverberationTimeOctavesSabine);
  var maxHighEyring = Math.max.apply(Math, ReverberationTimeOctavesEyring);
  var maxHigh = Math.max(maxHighSabine,maxHighEyring);

  var factorConversionTR = 200/maxHigh;

  // Plot y-axe
  drawText(ctxOct,Arial10,getRound2Decimals(maxHigh),[5,getRound2Decimals(270-maxHigh*factorConversionTR)]);
  drawText(ctxOct,Arial10,getRound2Decimals(maxHigh/2),[5,getRound2Decimals(270-(maxHigh/2)*factorConversionTR)]);

  // Set high Sabine
  c125S  = 270-trSabine[0]*factorConversionTR;
  c250S  = 270-trSabine[1]*factorConversionTR;
  c500S  = 270-trSabine[2]*factorConversionTR;
  c1000S = 270-trSabine[3]*factorConversionTR;
  c2000S = 270-trSabine[4]*factorConversionTR;
  c4000S = 270-trSabine[5]*factorConversionTR;

  // Plot Sabine
  plotMeasureInGraph(ctxOct,40,c125S,85,c250S,Blue);
  plotMeasureInGraph(ctxOct,85,c250S,130,c500S,Blue);
  plotMeasureInGraph(ctxOct,130,c500S,175,c1000S,Blue);
  plotMeasureInGraph(ctxOct,175,c1000S,220,c2000S,Blue);
  plotMeasureInGraph(ctxOct,220,c2000S,265,c4000S,Blue);
  drawCircle(ctxOct,265,c4000S,ObjectRadius,Blue,OpacityMax);

  // Plot Eyring
  c125E  = 270-trEyring[0]*factorConversionTR;
  c250E  = 270-trEyring[1]*factorConversionTR;
  c500E  = 270-trEyring[2]*factorConversionTR;
  c1000E = 270-trEyring[3]*factorConversionTR;
  c2000E = 270-trEyring[4]*factorConversionTR;
  c4000E = 270-trEyring[5]*factorConversionTR;

  plotMeasureInGraph(ctxOct,40,c125E,85,c250E,Red);
  plotMeasureInGraph(ctxOct,85,c250E,130,c500E,Red);
  plotMeasureInGraph(ctxOct,130,c500E,175,c1000E,Red);
  plotMeasureInGraph(ctxOct,175,c1000E,220,c2000E,Red);
  plotMeasureInGraph(ctxOct,220,c2000E,265,c4000E,Red);
  drawCircle(ctxOct,265,c4000E,ObjectRadius,Red,OpacityMax);

  plotMeasureInGraph(ctxOct,240,20,260,20,Blue);
  drawText(ctxOct,Arial10,"Sabine",[265,23]);
  plotMeasureInGraph(ctxOct,240,40,260,40,Red);
  drawText(ctxOct,Arial10,"Eyring",[265,43]);
}
