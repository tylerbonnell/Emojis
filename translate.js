// Maps words to arrays of emojis
var words = {};

window.onload = function() {
  parseCSV();
  document.getElementById("output").innerHTML = "test";
  document.getElementById("butt").onclick = translate;
};

// Fetch CSV file containing emojis/tags from the server
// and parse it into the map for word lookup
function parseCSV() {
  Papa.parse("https://docs.google.com/spreadsheets/d/1Ri4IhKQZFcyzt4dca87uvIqKURmN22t_e4pCBWBQL5s/pub?gid=0&single=true&output=csv", {
    skipEmptyLines: true,
  	download: true,
  	complete: function(results) {
  		for (var i = 0; i < results.data.length; i++) {
        var row = results.data[i];
        for (var j = 1; j < row.length; j++) {
          mapWordToEmoji(row[j].toLowerCase(), row[0]);
        }
      }
  	}
  });
}

// Maps the given word to the emoji. If the word already
// maps to an emoji, adds it to the array
function mapWordToEmoji(word, emoji) {
  if (word.length == 0) return;
  if (word in words) {
    words[word].push(emoji);
  } else {
    words[word] = [emoji];
  }
}

function translate() {
  var input = document.getElementById("input").value;
  var output = document.getElementById("output");
  var rows = input.split(/\n/);
  output.innerHTML = "";
  for (var i = 0; i < rows.length; i++) {
    output.innerHTML += translateRow(rows[i]) + "</br>";
  }
}

function translateRow(str) {
  var strWords = str.split(/\s+/);
  return str;
}
