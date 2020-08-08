function displayService(evt, app, mode) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(app);

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(mode).style.display = "block";
    evt.currentTarget.className += " active";
}

function getMaterial() {
  var input, filter, table, tr, td, material, i, txtValue;
  input = document.getElementById("inputValue");
  filter = input.value.toUpperCase();
  table = document.getElementById("materialsTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    material = tr[i].getElementsByTagName("td")[0];
    if (material) {
      txtValue = material.textContent || material.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
