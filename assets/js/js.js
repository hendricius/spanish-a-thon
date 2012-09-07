$(document).ready(function() {
  var path = $(document).jurlp("path").toString();

  switch (path) {
    case "/words/":
      logic.pair_value(words_collection, true, $('.parse-data'));
      break;
    case "/phrases/":
      logic.pair_value(phrases_collection, true, $('.parse-data'));
      break;
    case "/tenses/":
      logic.pair_value(tenses.preterito_perfecto.irregular, true, $('.preterito_perfecto'));
      logic.examples(tenses.preterito_perfecto.examples, $('#perfecto_example_uses dl'));
      break;
    default:
      console.log("not defined");
  }
})
var logic = {
  pair_value: function(data, count, el) {
    el.empty();
    _.each(data, function(elem, index) {
      if (count) {
        var val = index + 1;
      }
     el.append($(templates.pair_value({
        count: val,
        word: elem[0],
        translation: elem[1]
      })))
    })
  },
  examples: function(data, el) {
    el.empty();
    _.each(data, function(elem) {
      el.append($(templates.examples({
        example: elem[0],
        explanation: elem[1]
      })))
    })
  }
}
var templates = {
  pair_value: _.template("\
    <tr>\
    <% if (count) { %>\
    <td><%= count %></td>\
    <% } %>\
    <td><%= word %></td>\
    <td><%= translation %><td>\
    </tr>"
  ),
  examples: _.template("\
    <dt><%= example %></dt>\
    <dd><%= explanation %></dd>"
  )
}
