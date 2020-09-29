function openSidebar() {
  document.getElementById("sidebar-menu").style.display = "inline";
}

function closeSidebar() {
  document.getElementById("sidebar-menu").style.display = "none";
}

// for (i = 1; i < tr.length; i++) {
//     // Hide the row initially.
//     tr[i].style.display = "none";
//
//     td = tr[i].getElementsByTagName("td");
//     for (var j = 0; j < td.length; j++) {
//       cell = tr[i].getElementsByTagName("td")[j];
//       if (cell) {
//         if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//           break;
//         }
//       }
//     }
// }

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

function putMessage(id, msg) {document.getElementById(id).innerHTML = msg;}
