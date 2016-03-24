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
          mapWordToEmoji(standardize(row[j]), row[0]);
        }
      }
  	}
  });
}

// Makes words singular and lowercase
function standardize(word) {
  word = word.toLowerCase();
  if (word[word.length - 1] == 's') {
    word = word.substring(0, word.length - 1);
  }
  return word;
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
  var result = "";
  for (var i = 0; i < strWords.length; i++) {
    if (strWords[i] in words) {
      var beforeStr = randomString(words[strWords[i]]);
      if (beforeStr.length > 0) beforeStr += " ";
      var afterStr = randomString(words[strWords[i]]);
      if (afterStr.length > 0) afterStr = " " + afterStr;
      result += beforeStr + strWords[i] + afterStr + " ";
    } else {
      result += strWords[i] + " ";
    }
  }
  return result;
}

function randomString(arr) {
  var str = "";
  if (Math.random() > 0) {
    var times = Math.ceil(Math.random() * 3);
    for (var i = 0; i < times; i++) {
      var index = Math.floor(Math.random() * arr.length);
      var repeat = Math.floor(Math.random() * 2);
      for (var j = 0; j < repeat; j++) {
        str += arr[index];
      }
    }
  }
  return str;
}