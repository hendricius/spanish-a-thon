$(document).ready(function() {
  var path = $(document).jurlp("path").toString();

  switch (path) {
    case "/vocabulary/":
      logic.vocabulary();
      break;
    default:
      console.log("not defined");
  }
})
var logic = {
  vocabulary: function() {
    var el = $('.parse-data');
    el.empty();
    _.each(vocabulary, function(elem, index) {
     el.append($(templates.vocabulary({
        count: index + 1,
        word: elem[0],
        translation: elem[1]
      })))
    })
  }
}
var templates = {
  vocabulary: _.template(
    "<tr><td><%= count %></td><td><%= word %></td><td><%= translation %><td></tr>"
  )
}
