function initRoom(longRoom,wideRoom,highRoom) {
  RoomObject.long = parseFloat(document.getElementById(longRoom).value);
  RoomObject.wide = parseFloat(document.getElementById(wideRoom).value);
  RoomObject.high = parseFloat(document.getElementById(highRoom).value);
}

function toggle() {
  var cont = document.getElementById('body-content');
  var popup = document.getElementById('popup');
  var p = document.createComment('p');
  var volumen = RoomObject.long * RoomObject.wide * RoomObject.high;

  if ( volumen ) { // evaluate if is not [null,undefined,NaN,empty string,0,false]
    document.getElementById("popup-comment").innerHTML =
      '<p>Dimensiones recogidas correctamente</p>'
  } else {
    document.getElementById("popup-comment").innerHTML =
      '<p>Por favor, asegurese de hacer introducido los datos correctamente</p>'
  }

  cont.classList.toggle('active');
  popup.classList.toggle('active');

}
