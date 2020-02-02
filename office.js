var regex = /Start new|Outlook|Admin|Compliance/;
var tiles = $('.tiles__container').toArray();

for (var i = 0; i < tiles.length; i++) {
  if (tiles[i].children[0].children[0].children[0].outerText) {
  var outerText = tiles[i].children[0].children[0].children[0].outerText;

    if (!outerText.match(regex)) {
      //console.log(outerText);
      tiles[i].hidden = true;
    }
  }
}
