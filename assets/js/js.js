$(document).ready(function() {
  var path = $(document).jurlp("path").toString();

  switch (path) {
    case "/words/":
      logic.pair_value(vocab.words, true, $('.parse-data'));
      break;
    case "/phrases/":
      logic.pair_value(vocab.phrases, true, $('.parse-data'));
      break;
    case "/tenses/":
      logic.pair_value(tenses.preterito_perfecto.irregular, true, $('.preterito_perfecto'));
      logic.examples(tenses.preterito_perfecto.examples, $('#perfecto_example_uses dl'));
      break;
    case "/linking-words/":
      logic.duplicate($('.opinions tbody'), vocab.opinions);
      logic.duplicate($('.linking tbody'), vocab.linking);
      break;
    case "/pronomes/":
      var list_examples = [];
      var example_only = []
      var keys = _.each(pronouns, function(elem, value) {
        if (_.include(_.keys(elem), "list")) {
          list_examples.push(value);
        } else {
          example_only.push(value);
        }
      });
      _.each(list_examples, function(elem) {
        logic.pair_value(pronouns[elem].list, false, $($('.' + elem + ' tbody')[0]));
        logic.pair_value(pronouns[elem].examples, false, $($('.' + elem + ' tbody')[1]));
      })
      _.each(example_only, function(elem) {
        logic.pair_value(pronouns[elem].examples, false, $('.' + elem + ' tbody'));
      })

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
  },
  duplicate: function(elems, data) {
    _.each(elems, function(elem) {
      $(elem).empty();
    })
    var mid = Math.round(data.length/2);
    var lists = [_.first(data, mid), _.last(data, mid)];
    if (_.include(lists[0], lists[1][0])){
      lists[1].splice(0,1);
    }
    _.each(lists, function(list, index) {
      _.each(list, function(elem) {
        $(elems[index]).append($(templates.pair_value({
          word: elem[0],
          translation: elem[1]
        })))
      })
    })
  }
}
var templates = {
  pair_value: _.template("\
    <tr>\
    <% if (!(typeof(count) == 'undefined') && (count)) { %>\
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
