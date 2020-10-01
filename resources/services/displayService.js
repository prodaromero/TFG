function displayService(evt, app, mode) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(app);

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
}

function openSidebar() {
  document.getElementById("sidebar-menu").style.display = "inline";
}

function closeSidebar() {
  document.getElementById("sidebar-menu").style.display = "none";
}

function searchInSelectionTable() {
  var input, filter, table, tr, name, i, nameValue, nrcValue;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    name = tr[i].getElementsByTagName("td")[0];
    nrc = tr[i].getElementsByTagName("td")[9];
    if (name && nrc) {
      nameValue = name.textContent || name.innerText;
      nrcValue = nrc.textContent || nrc.innerText;
      if (nameValue.toUpperCase().indexOf(filter) > -1 || nrcValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "table-row";
        break;
      }
    }
    if (!filter) {
      tr[i].style.display = "none";
    }
  }
}

function searchInAllTable() {
  var input, filter, table, tr, name, i, nameValue, nrcValue, find;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "table-row";
          break;
        }
      }
    }
    if (!filter) {
      tr[i].style.display = "none";
    }
  }
}

function openPopup(comment) {

  var cont = document.getElementById('body-content');
  var popup = document.getElementById('popup');

  document.getElementById("popup-comment").innerHTML = comment;

  cont.classList.toggle('active');
  popup.classList.toggle('active');
}

function closePopup() {

  var cont = document.getElementById('body-content');
  var popup = document.getElementById('popup');

  cont.classList.toggle('active');
  popup.classList.toggle('active');
}


function putOkDistanceMsg(isok,dmin) {
  var disRound = getRound2Decimals(dmin);
  var msgOK = '<div class="good">El micrófono se encuentra en posición correcta.<br>La distancia mínima a la que debe situarse el micro de la fuente es de<br>'+disRound+' [m]</div>';
  var msgKO = '<div class="error">El micrófono ne se encuentra en posición incorrecta.<br>La distancia mínima a la que debe situarse el micro de la fuente es de<br>'+disRound+' [m]</div>'

  if (isok) {putMessage('checkDisMsg',msgOK);} else {putMessage('checkDisMsg',msgKO);}
}

function putReverTimeMsg(op,tr) {
  var msg = '<div class="divReverTime">El tiempo de reverberación de '+op+' es de '+tr+' [s].</div>'
  putMessage('putTR',msg)
}

function createReverberationTable() {
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  var tr = document.createElement('tr');

  var th_1 = document.createElement('th');
  th_1.innerHTML = 'T.R. por Octavas';
  tr.appendChild(th_1);
  var th_2 = document.createElement('th');
  th_2.innerHTML = '125Hz';
  tr.appendChild(th_2);
  var th_3 = document.createElement('th');
  th_3.innerHTML = '250Hz';
  tr.appendChild(th_3);
  var th_4 = document.createElement('th');
  th_4.innerHTML = '500Hz';
  tr.appendChild(th_4);
  var th_5 = document.createElement('th');
  th_5.innerHTML = '1000Hz';
  tr.appendChild(th_5);
  var th_6 = document.createElement('th');
  th_6.innerHTML = '2000Hz';
  tr.appendChild(th_6);
  var th_7 = document.createElement('th');
  th_7.innerHTML = '4000Hz';
  tr.appendChild(th_7);

  thead.appendChild(tr);
  table.appendChild(thead);

  for (i = 0; i < list.length; i++) {
    var tbodyTr = document.createElement('tr');
    var tbodyTdNumber = document.createElement('td');
    switch (i) {
      case 0:tbodyTdNumber.innerHTML = "Techo";break;
      case 1:tbodyTdNumber.innerHTML = "Pared 1";break;
      case 2:tbodyTdNumber.innerHTML = "Pared 2";break;
      case 3:tbodyTdNumber.innerHTML = "Pared 3";break;
      case 4:tbodyTdNumber.innerHTML = "Pared 4";break;
      case 5:tbodyTdNumber.innerHTML = "Suelo";break;
      default:break;
    }
    tbodyTr.appendChild(tbodyTdNumber);

    var tbodyTd = document.createElement('td');
    tbodyTd.innerHTML = list[i]+'s';
    tbodyTr.appendChild(tbodyTd);
    tbody.appendChild(tbodyTr);
  }
  table.appendChild(tbody);

  document.getElementById('suggested-list').appendChild(table);
}

function putMessage(id, msg) {document.getElementById(id).innerHTML = msg;}
