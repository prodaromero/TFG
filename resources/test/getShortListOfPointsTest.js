function distanceBtwSourceAndMicroTest() {
  var list = ListOfSuggestedPoints;
  var disMin = getRound2Decimals(MinDistance);
  var fuente_micro_distancias = [];

  for (var i = 0; i < list.length; i++) {
    for (var j = 1; j < list[i].length; j++) {
      var dis = distance(list[i][0], list[i][j]);
      var isCorrect =  dis > disMin;
      fuente_micro_distancias.push({"Medición": i, "Micro": j, "Dis. min":disMin, "Dis":dis, "Correcta": isCorrect});
    }
  }
  console.log("|| ** DISTANCIA ENTRE FUENTE Y MICRO TEST ** ||");
  console.log(fuente_micro_distancias);
}

function distanceBtwMicrosTest() {
  var list = ListOfSuggestedPoints;
  var disMin = DisMinimaSurface;
  var micro_micro_distancias = [];

  for (var i = 0; i < list.length; i++) {
    for (var j = 1; j < list[i].length-1; j++) {
      var dis = distance(list[i][j], list[i][j+1]);
      var isCorrect =  dis > disMin;
      micro_micro_distancias.push({"Medición": i, "Micro":j+"vs"+(j+1),"Dis":dis, "Correcta": isCorrect});
    }
    var dis = distance(list[i][1], list[i][3]);
    var isCorrect =  dis > disMin;
    micro_micro_distancias.push({"Medición": i, "Micro":1+"vs"+3,"Dis":dis,"Correcta": isCorrect});
  }
  console.log("|| ** DISTANCIA ENTRE MICRÓFONOS TEST ** ||");
  console.log(micro_micro_distancias);
}
