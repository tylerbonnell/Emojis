$(function(){
  parseCSV();
  $("#output").html("test");
});

function parseCSV() {
  $.get("tags.csv", function(data) {
    data.split("\n");
    console.log(data[0]);
  });
}

function readTextFile(file) {
    $.get(file, function(data) {
        document.getElementById("FunText").innerHTML = "The text should show here: " + data;
    });
}
