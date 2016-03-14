var words = {};

window.onload = function() {
  parseCSV();
  document.getElementById("output").innerHTML = "test";
};

function parseCSV() {
  Papa.parse("http://bonn.pw/Emojis/tags.csv", {
    skipEmptyLines: true,
  	download: true,
  	complete: function(results) {
  		for (var i = 0; i < results.data.length; i++) {
        var row = results.data[i];
        for (var j = 1; j < row.length; j++) {
          mapWordToEmoji(row[j], row[0]);
        }
      }
  	}
  });
}

function mapWordToEmoji(word, emoji) {
  if (word in words) {
    words[word].push(emoji);
  } else {
    words[word] = [emoji];
  }
}
