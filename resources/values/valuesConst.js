/* CANVAS VALUES */

var canvas;
var ctx;
var pxScale = 20;
var normalScale = 1;
var globalScale = {
  xScale : 1,
  yScale : 1,
  zScale : 1
};
var maxLong = 230;
var minLong = 200;
var start = 40;
var Red = "red";
var Blue = "blue";
var Black = "black";
var OpacityMax = 1;
var OpacityMin = 0.3;
var inside = false;

var sabine_conts = 0.161;
var eyring_conts = 0.16;

var speedSound = 341;

var Arial20 = "20px Arial";
var Arial10 = "10px Arial";

var FactorConversionTR = 60;

/* ACOUSTIC VALUES */

var ReverberationTimeSabine;
var ReverberationTimeEyring;
var ReverberationTimeOctavesSabine = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var ReverberationTimeOctavesEyring = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var MinDistance;

var DisMinimaSurface = 1;
var DisMinimaMicro = 2;

var ListOfSuggestedPoints = [
  [new Object(), new Object(), new Object(), new Object()],
  [new Object(), new Object(), new Object(), new Object()],
  [new Object(), new Object(), new Object(), new Object()],
  [new Object(), new Object(), new Object(), new Object()],
]

/* GENERAL VALUES */

var RoomObject = new Room();
var Source = new Object();
var Microphone = new Object();

var MinimalDimension = 2;
var MinimalVolume = 35;
// Success messages
var CommentRoomOK = '<p>¡Dimensiones recogidas correctamente!</p>'

// Error messages
var CommentRoomKO = '<p>Por favor, asegurese de haber introducido los datos del recinto correctamente. ¡Gracias!</p>'
var CommentObjectKO = '<p>Por favor, asegurese de haber introducido las posociones de los objetos correctamente. ¡Gracias!</p>'
var CommentRoomSmall = '<p>El recinto tiene unas dimensiones demasiado pequeñas como para poder obtener una terna de puntos. Discupe las molestias.</p>'
var CommentCoefKO = '<p>Por favor, asegurese de haber introducido los datos de los coeficientes de absorción correctamente. Recuerde que deben estar comprendidos entre 0 y 1. ¡Gracias!</p>'
var CommentObjectOutside = '<p>Por favor, asegurese de que la posición de los objetos se encuentra dentro del recinto. ¡Gracias!</p>'
var CommentReverTimeKO = '<p>Por favor, asegurese de que el tiempo de reverberación es correcto. ¡Gracias!</p>'
var CommentRegulationKO = '<p>Recuerda que según la normativa UNE-ISO 3382, la distancia mínima entre micro/fuente y cualquier superficie, debe ser de al menos 1 m. Revise los datos por favor. ¡Gracias!</p>'
