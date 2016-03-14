window.onload = function() {
  parseCSV();
  document.getElementById("output").innerHTML = "test";
};

function parseCSV() {
  Papa.parse("http://bonn.pw/Emojis/tags.csv", {
  	download: true,
  	complete: function(results) {
  		console.log(results);
  	}
  });
}
