$(document).ready(function() {
  var path = $(document).jurlp("path").toString();

  switch (path) {
    case "/words/":
      logic.simple_translate(words_collection);
      break;
    case "/phrases/":
      logic.simple_translate(phrases_collection);
      break;
    default:
      console.log("not defined");
  }
})
var logic = {
  simple_translate: function(data) {
    var el = $('.parse-data');
    el.empty();
    _.each(data, function(elem, index) {
     el.append($(templates.simple_translate({
        count: index + 1,
        word: elem[0],
        translation: elem[1]
      })))
    })
  }
}
var templates = {
  simple_translate: _.template(
    "<tr><td><%= count %></td><td><%= word %></td><td><%= translation %><td></tr>"
  )
}
