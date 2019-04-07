var id = "";
function show(x) {
  var y = document.getElementById(x);
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }
}

function getId(x){
	show(x);
}