function displayService(evt, app, mode) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(app);

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
}

function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    name = tr[i].getElementsByTagName("td")[0];
    nrc = tr[i].getElementsByTagName("td")[9];
    find = false;
      if (name.innerHTML.toUpperCase().indexOf(filter) > -1 || nrc.innerHTML.indexOf(filter) > -1) {
        find = true;
      }
    if (find) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

function getMaterial() {
  var input, filter, table, tr, i, j, columns, value, find;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    columns = tr[i].getElementsByTagName("td");
    find = false;
    for (var j = 0; j < columns.length; j++) {
      value = columns[j]
      if (value.innerHTML.toUpperCase().indexOf(filter) > -1) {
        find = true;
      }
      if (find) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
