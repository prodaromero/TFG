function optionGetShortList() {
  var room = RoomObject;
  var list = ListOfSuggestedPoints;

  if (room.long == 0 || room.wide == 0 || room.high == 0) {
    alert("Por favor, asegurese que ha introducido los parámetros del recinto.")
  }else{

    initMultiplePoints(room, list);

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');

    var th_1 = document.createElement('th');
    th_1.innerHTML = 'Medida';
    tr.appendChild(th_1);
    var th_2 = document.createElement('th');
    th_2.innerHTML = 'Fuente [m]';
    tr.appendChild(th_2);
    var th_3 = document.createElement('th');
    th_3.innerHTML = 'Micrófono 1 [m]';
    tr.appendChild(th_3);
    var th_4 = document.createElement('th');
    th_4.innerHTML = 'Micrófono 2 [m]';
    tr.appendChild(th_4);
    var th_5 = document.createElement('th');
    th_5.innerHTML = 'Micrófono 3 [m]';
    tr.appendChild(th_5);

    thead.appendChild(tr);
    table.appendChild(thead);

    for (i = 0; i < list.length; i++) {
      var tbodyTr = document.createElement('tr');
      var tbodyTdNumber = document.createElement('td');
      tbodyTdNumber.innerHTML = i+1;
      tbodyTr.appendChild(tbodyTdNumber);
      for (j = 0; j < list[i].length; j++) {
        var tbodyTd = document.createElement('td');
        tbodyTd.innerHTML = list[i][j].long+'[m],'+list[i][j].wide+'[m],'+list[i][j].high+'[m]';
        tbodyTr.appendChild(tbodyTd);
      }
      tbody.appendChild(tbodyTr);
    }
    table.appendChild(tbody);

    document.getElementById('suggested-list').appendChild(table);
  }
}
