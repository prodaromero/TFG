/* CANVAS VALUES */

var canvas;
var ctx;
var pxScale = 20;
var NormalScale = 1;
var GlobalScale = {
  xScale : 1,
  yScale : 1,
  zScale : 1
};
var maxLong = 230;
var minLong = 200;
var start = 40;
var ObjectRadius = 5;
var Red = "red";
var Blue = "blue";
var Black = "black";
var OpacityMax = 1;
var OpacityMin = 0.3;
var inside = false;

var SabineConts = 0.161;
var EyringConts = 0.16;

var SpeedSound = 341;

var Arial20 = "20px Arial";
var Arial10 = "10px Arial";

var FactorConversionTR = 60;

/* ACOUSTIC VALUES */

var ReverberationTime;
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
var RoomOperative = new Object();

var MinimalDimensionLong = 3;
var MinimalDimensionWide = 3;
var MinimalDimensionHigh = 2.5;
var MinimalVolume = 15.5;
var RoomVolumeThreshold = 110;

// Success messages
var CommentRoomOK = '<p>¡Dimensiones recogidas correctamente!</p>'

// Error messages
var CommentRoomKO = '<p>Por favor, asegurese de haber introducido los datos del recinto correctamente. ¡Gracias!</p>'
var CommentObjectKO = '<p>Por favor, asegurese de haber introducido las posociones de los objetos correctamente. ¡Gracias!</p>'
var CommentRoomSmall = `<p>El recinto tiene unas dimensiones demasiado pequeñas como para poder obtener una terna de puntos y cumplir con la normativa
  UNE-EN ISO 3382. Para poder obtener un resultado que cumpla, se ha establecido unas dimensiones mínimas de 3mx3mx2.5m.<br><br>
  Según este estándar, la fuente sonora y los micrófonos deben de estar separados al menos <b>1m de las superficies</b>.
  Además, los micrófonos deben tener una separación entre sí de <b>2m</b>. Recuerde que el micrófono y la fuente deben de estar separados entre sí
  una distancia mínima que depende de las dimensiones del recinto y del tiempo de reverberación esperado.<br><br>Discupe las molestias.</p>`
var CommentCoefKO = '<p>Por favor, asegurese de haber introducido los datos de los coeficientes de absorción correctamente. Recuerde que deben estar comprendidos entre 0 y 1. ¡Gracias!</p>'
var CommentObjectOutside = '<p>Por favor, asegurese de que la posición de los objetos se encuentra dentro del recinto. ¡Gracias!</p>'
var CommentReverTimeKO = '<p>Por favor, asegurese de haber introducido un tiempo de reverberación es correcto. ¡Gracias!</p>'
var CommentRegulationKO = '<p>Recuerda que según la normativa UNE-ISO 3382, la distancia mínima entre micro/fuente y cualquier superficie, debe ser de al menos 1 m. Revise los datos por favor. ¡Gracias!</p>'
var CommentDistanceKO = '<p>No se ha establecido una distancia mínima. Para ello, introduzca el tiempo de reverberación y calcule la distancia mínima en este mismo apartado. ¡Gracias!</p>'

// Information messages
var InfoRoomMsg = `<div class="info-dimensiones">
  <h2>Dimensiones del recinto</h2>
  <img src="resources/style/images/info-dimensiones.png" class="img-dimensiones"></img>
  <div class="info-div-right">
    <p>Antes de realizar cualquier operación de cálculo, en primer lugar se han de introducir las dimensiones del recinto
    en las casillas señaladas. Recuerde que las dimensiones son en metros [m].</p> <br>
    <p>Una vez introcucidos, pulse el boton "Guardar dimensiones" para establecer los valores del rencinto y, de esta manera,
    poder procedera utilizar el resto de herramientas libremente</p>
  </div>
  </div>`

var InfoReverberationMsg = `<div class="info-tr">
  <h2>Distancia mínima</h2>
  <img src="resources/style/images/info-tr.png" class="img-tr"></img>
  <div class="info-div-right">
    <p>Para realizar el cálculo de la distancia mínima, asegurese en primer lugar de haber introducido las dimensiones
      del recinto en el apartado anterior. Una vez comprobado, introduzca un valor para el tiempo de reverberación esperado
      en la sala en segundos [s]. <br><br>
      Una vez introcucido, pulse el boton "Calcular la distancia mínima" para obtener la distancia mínima que que debe haber
      entre el micrófono y la fuente, según la normativa UNE-EN ISO 3382.</p>
  </div>
  </div>`

var InfoDistancesMsg = `<div class="info-dist">
  <h2>Distancia entre fuente y micro</h2>
  <img src="resources/style/images/info-distancias.png" class="img-dist"></img>
  <div class="info-div-right">
    <p>En este apartado se comprueba si las distancias entre la posición del micrófono y la posición de la fuente es o no correcta.
      Para ello, asegurese en primer lugar de haber introducido las dimensiones
      del recinto en el primer apartado y de haber calculado una distancia mínima.
      Una vez comprobado, introduzca las posiciones de la fuente sonora y el micrófono
      en metros [m]. <br><br>
      Pulse el boton "Comprobar punto de medición" para validar si las posiciones
      están correctamente situadas, según la normativa UNE-EN ISO 3382.</p>
  </div>
  <h3>Resultados</h3>
  <img src="resources/style/images/info-distancias-2.png" class="img-dist-2"></img>
  <div class="info-div-left">
    <p>Una vez realizado el cálculo, en la zona superior de la herramienta se podrá visualizar
    una representación en dos dimensiones de la situación estudiada: una visualización en
    Planta y Alzado. Asimismo, devuelve la comprobación del cumplimiento con la normativa y
    la distancia que existe entre la fuente sonora y el micrófono. Recuerde que la representación
    es meramente ilustrativa y tiene como función la ayuda al entendimiento de la situación, no
    debe tomarse como una representación exacta.</p>
  </div>
  </div>`

var InfoSuggestedMsg = `<div class="info-dist">
    <h2>Sugerencia de puntos</h2>
    <div class="info-div">
      <p>En esta apartado se sugiere una terna de puntos en los que poder colocar
        la fuente sonora y los micrófonos de medición cumpliendo con la normativa.
        Para ello, asegurese de haber introducido las dimensiones del recinto en el
        primer apartado y de haber calculado y establecido la distancia mínima.</p>
      <img src="resources/style/images/info-sugerencia.png" class="img-middle"></img>
      <p>Una vez comprobado, pulse el boton "Sugerir tena de puntos" para obtener
        la lista de posiciones de medición.</p>
    </div>
    <h3>Resultados</h3>
    <img src="resources/style/images/info-sugerencia-2.png" class="img-sug-2"></img>
    <div class="info-div-right">
      <p>Los resultados obtenidos vienen dados en una tabla, la cual consta de 4 filas.
      Cada una de ellas, representan una terna de puntos diferente, veáse en cada una: 1 posición
      de fuente sonora y 3 posiciones donde colocar el micrófono para realizar las mediciones.<br><br>
      Además, si se pulsa sobre cada fila, se visualizará la terna seleccionada en 2 dimensiones
      (Planta y Alzado) para ayudar a su entendimiento y puesta en práctica. Recuerde que la representación
      es meramente ilustrativa y tiene como función la ayuda al entendimiento de la situación, no
      debe tomarse como una representación exacta.</p>
    </div>
  </div>`

var InfoCoefMeandMsg = `<div class="info-dimensiones">
  <h2>Tiempo de Reverberación</h2>
  <img src="resources/style/images/info-coeficientes.png" class="img-coeficientes"></img>
  <div class="info-div-right info-coef-margin">
    <p>En esta apartado se obtiene el tiempo de reverberación medio dados los Coeficientes
    de Absorción Medios de la sala mediante los métodos de Sabine y Eyring. Para ello
    introduzca estos coeficientes en las casillas señaladas. Recuerde que los coeficiente
    deben de estar entre 0 y 1.<br><br>
    Antes de realizar la operación, asegurese de haber introducido las dimensiones del
    recinto en el primer apartado.<br><br>
    <p>Una vez introcucidos, pulse el boton "Calcular el tiempo de reverberación" para
     obtener los resultados deseados. Adicionalmente, se obtendrá el valor de la frecuencia
     de Schroeder a partir de la cual, los resultados obtenidos comienzan a ser fiables.</p>
  </div>
  </div>`

var InfoCoefOctavesMsg = `<div class="info-dist">
    <h2>Tiempo de Reverberación en octavas</h2>
      <img src="resources/style/images/info-coeficientes-octavas.png" class="img-coeficientes-octavas"></img>
    <div class="info-div-coef-2">
      <p>En esta apartado se obtiene el tiempo de reverberación medio dados los Coeficientes
      de Absorción en bandas de octavas de la sala mediante los métodos de Sabine y Eyring.
        Para ello, asegurese de haber introducido las dimensiones del recinto en el
        primer apartado y de haber calculado y establecido la distancia mínima.
        Una vez comprobado, introduzca todos los valores de los coeficientes de absorción
        en bandas de ocutava de los materiales que conforman la sala y
        pulse el boton "Sugerir tena de puntos" para obtener los resultados de tiempo
        de reverberación.</p>
    </div>
    <h3>Resultados</h3>
    <img src="resources/style/images/info-coeficientes-octavas-2.png" class=".img-middle"></img>
    <div class="info-div-left">
      <p>Como resultado se obtiene el Tiempo de Reverberación en bandas de octavas representado
      mediante una tabla y graficamente.Adicionalmente, se obtendrá el valor de la frecuencia
      de Schroeder a partir de la cual, los resultados obtenidos comienzan a ser fiables.</p>
    </div>
  </div>`
