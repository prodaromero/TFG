function displayService(evt, app, mode) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(app);

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
}

function openSidebar(id) {
  document.getElementById(id).style.display = "inline";
}

function closeSidebar(id) {
  document.getElementById(id).style.display = "none";
}

function searchInSelectionTable() {
  var input, filter, table, tr, name, nrc, alfa, i, nameValue, nrcValue, alfaValue;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    name = tr[i].getElementsByTagName("td")[0];
    nrc = tr[i].getElementsByTagName("td")[11];
    alfa = tr[i].getElementsByTagName("td")[12];
    if (name && nrc && alfa) {
      nameValue = name.textContent || name.innerText;
      nrcValue = nrc.textContent || nrc.innerText;
      alfaValue = alfa.textContent || alfa.innerText;
      if (nameValue.toUpperCase().indexOf(filter) > -1 || nrcValue.toUpperCase().indexOf(filter) > -1 ||
            alfaValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "table-row";
      }
    }
    if (filter == "") {
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
  var msgOK = '<div class="good">El micrófono se encuentra en posición correcta.<br>El micrófono esta situado a '+disRound+'[m] de la fuente sonora</div>';
  var msgKO = '<div class="error">El micrófono ne se encuentra en posición incorrecta.<br>El micrófono esta situado a '+disRound+'[m] de la fuente sonora</div>';

  if (isok) {putMessage('checkDisMsg',msgOK);} else {putMessage('checkDisMsg',msgKO);}
}

function putReverTimeMsg(trS,trE,fcS) {
  var msg = `
  <div>
    <div class="tr-info-area">
      <details class="info-area">
        <summary>i</summary>
        <div>
          <h2>Frecuencia de Schroeder</h2>
          <p>
            La frecuencia de Schroeder limita inferiormente el rango de frecuencia
            a partir del cual se puede empezar a considerar campo acústico difuso.
            Se calcula como:<br>
            <img src="resources/style/images/schroeder-formula.PNG" class="schroeder-image"></img>
            <br>
            Por lo tanto, a partir de esta frecuecia límite se pueden tomar los
            cálculos de tiempo de reverberación como datos precisos.
          </p>
        </div>
      </details>
    </div>
    <div class="good good-tr">
      El tiempo de reverberación por Sabine es de `+trS+`[s].<br>El tiempo de
      reverberación por Eyring es de `+trE+`[s].<br><br>
      Recuerde que la frecuencia de Schroeder es:<br>
        Fc = `+fcS+`[Hz]
    </div>
  </div>
  `
  putMessage('putTR',msg)
}

function putReverTimeOctavesMsg(fcS) {
  var msg = `
  <div>
    <div class="tr-info-area">
      <details class="info-area">
        <summary>i</summary>
        <div>
          <h2>Frecuencia de Schroeder</h2>
          <p>
            La frecuencia de Schroeder limita inferiormente el rango de frecuencia
            a partir del cual se puede empezar a considerar campo acústico difuso.<br>
            En octavas, se calcula mediante la siguiente fórmula, donde TR60 es
            el tiempo de reverberación medio entre 500 Hz y 1 KHz.<br>
            <img src="resources/style/images/schroeder-formula.PNG" class="schroeder-image"></img>
            <br>
            Por lo tanto, a partir de esta frecuecia límite se pueden tomar los
            cálculos de tiempo de reverberación como datos precisos.
          </p>
        </div>
      </details>
    </div>
    <div class="good good-tr-octaves">
      Recuerde que la frecuencia de Schroeder es:<br>
        Fc = `+fcS+`[Hz]
    </div>
  </div>
  `
  putMessage('put-octaves-schroeder',msg)
}

function createReverberationTable(listSabine, listEyring) {

  var tbl = document.getElementById('rever-table');
  if (tbl) {tbl.parentNode.removeChild(tbl);}

  var table = document.createElement('table');
  table.setAttribute("id", "rever-table");
  table.classList.add('table-style');
  var thead = document.createElement('thead');
  thead.classList.add('table-header');
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
  // Sabine
  var tbodyTrS = document.createElement('tr');
  var tbodyTdOptionS = document.createElement('td');
  tbodyTdOptionS.innerHTML="Tr. Sabine";
  tbodyTrS.appendChild(tbodyTdOptionS);
  for (i = 0; i < listSabine.length; i++) {
    var tbodyTd = document.createElement('td');
    tbodyTd.innerHTML = listSabine[i]+'s';
    tbodyTrS.appendChild(tbodyTd);
  }
  tbody.appendChild(tbodyTrS);
  table.appendChild(tbody);

  // Eyring
  var tbodyTrE = document.createElement('tr');
  var tbodyTdOptionE = document.createElement('td');
  tbodyTdOptionE.innerHTML="Tr. Eyring";
  tbodyTrE.appendChild(tbodyTdOptionE);
  for (i = 0; i < listEyring.length; i++) {
    var tbodyTd = document.createElement('td');
    tbodyTd.innerHTML = listEyring[i]+'s';
    tbodyTrE.appendChild(tbodyTd);
  }
  tbody.appendChild(tbodyTrE);
  table.appendChild(tbody);

  document.getElementById('rever-octaves-table').appendChild(table);
}

function putMessage(id, msg) {document.getElementById(id).innerHTML = msg;}

function clearInputValues(id) {document.getElementById(id).value = '';}

function clearDimensions() {
  var room = RoomObject;
  clearInputValues('long');
  clearInputValues('wide');
  clearInputValues('high');
  room.long = 0;
  room.wide = 0;
  room.high = 0;
}

function clearDistance() {
  clearInputValues('t');
  clearInputValues('xs');
  clearInputValues('ys');
  clearInputValues('zs');
  clearInputValues('xm');
  clearInputValues('ym');
  clearInputValues('zm');
  MinDistance = 0;
}

function clearCoef() {
  var room = RoomObject;
  clearInputValues('coef_techo');
  clearInputValues('coef_suelo');
  clearInputValues('coef_pared_a');
  clearInputValues('coef_pared_b');
  clearInputValues('coef_pared_c');
  clearInputValues('coef_pared_d');
  room.coef_abs_roof    = 0;
  room.coef_abs_floor   = 0;
  room.coef_abs_wall_a  = 0;
  room.coef_abs_wall_b  = 0;
  room.coef_abs_wall_c  = 0;
  room.coef_abs_wall_d  = 0;
}

function clearOctaves() {
  var room = RoomObject;
  clearInputValues('techo_125');
  clearInputValues('techo_250');
  clearInputValues('techo_500');
  clearInputValues('techo_1000');
  clearInputValues('techo_2000');
  clearInputValues('techo_4000');
  clearInputValues('suelo_125');
  clearInputValues('suelo_250');
  clearInputValues('suelo_500');
  clearInputValues('suelo_1000');
  clearInputValues('suelo_2000');
  clearInputValues('suelo_4000');
  clearInputValues('pared_125_a');
  clearInputValues('pared_250_a');
  clearInputValues('pared_500_a');
  clearInputValues('pared_1000_a');
  clearInputValues('pared_2000_a');
  clearInputValues('pared_4000_a');
  clearInputValues('pared_125_b');
  clearInputValues('pared_250_b');
  clearInputValues('pared_500_b');
  clearInputValues('pared_1000_b');
  clearInputValues('pared_2000_b');
  clearInputValues('pared_4000_b');
  clearInputValues('pared_125_c');
  clearInputValues('pared_250_c');
  clearInputValues('pared_500_c');
  clearInputValues('pared_1000_c');
  clearInputValues('pared_2000_c');
  clearInputValues('pared_4000_c');
  clearInputValues('pared_125_d');
  clearInputValues('pared_250_d');
  clearInputValues('pared_500_d');
  clearInputValues('pared_1000_d');
  clearInputValues('pared_2000_d');
  clearInputValues('pared_4000_d');
  room.coef_abs_roof_125   = 0;
  room.coef_abs_roof_250   = 0;
  room.coef_abs_roof_500   = 0;
  room.coef_abs_roof_1000  = 0;
  room.coef_abs_roof_2000  = 0;
  room.coef_abs_roof_4000  = 0;
  room.coef_abs_floor_125  = 0;
  room.coef_abs_floor_250  = 0;
  room.coef_abs_floor_500  = 0;
  room.coef_abs_floor_1000 = 0;
  room.coef_abs_floor_2000 = 0;
  room.coef_abs_floor_4000 = 0;
  room.coef_abs_wall_a_125   = 0;
  room.coef_abs_wall_a_250   = 0;
  room.coef_abs_wall_a_500   = 0;
  room.coef_abs_wall_a_1000  = 0;
  room.coef_abs_wall_a_2000  = 0;
  room.coef_abs_wall_a_4000  = 0;
  room.coef_abs_wall_b_125   = 0;
  room.coef_abs_wall_b_250   = 0;
  room.coef_abs_wall_b_500   = 0;
  room.coef_abs_wall_b_1000  = 0;
  room.coef_abs_wall_b_2000  = 0;
  room.coef_abs_wall_b_4000  = 0;
  room.coef_abs_wall_c_125   = 0;
  room.coef_abs_wall_c_250   = 0;
  room.coef_abs_wall_c_500   = 0;
  room.coef_abs_wall_c_1000  = 0;
  room.coef_abs_wall_c_2000  = 0;
  room.coef_abs_wall_c_4000  = 0;
  room.coef_abs_wall_d_125   = 0;
  room.coef_abs_wall_d_250   = 0;
  room.coef_abs_wall_d_500   = 0;
  room.coef_abs_wall_d_1000  = 0;
  room.coef_abs_wall_d_2000  = 0;
  room.coef_abs_wall_d_4000  = 0;
}
