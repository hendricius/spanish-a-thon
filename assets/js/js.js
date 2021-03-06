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
      logic.duplicate($('.linking tbody'), vocab.linking);
      break;
    case "/expressing-opinion/":
      logic.duplicate($('.opinions tbody'), vocab.opinions);
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
    case "/about/":
      logic.about(misc.biography.text);
      break;
    case "/latinamerica/":
      logic.about(misc.latinermica);
      break;
    case "/common-questions/":
      logic.pair_value(misc.preguntas, true, $('.parse-data'));
      break;
    case "/time/":
      logic.pair_value(vocab.time, false, $('.parse-data'));
      break;
    case "/prepositions/":
      logic.prepositions(prepositions.locations, $('.parse-data-locations'));
      logic.prepositions(prepositions.time, $('.parse-data-time'));
      break;
    default:
      console.log("not defined");
  }
  $('.table').on('click', 'thead th a', function(elem){
    logic.trainer($(elem.currentTarget), false);
  });
  $('.table').on('click', 'tbody tr td', function(elem){
    logic.trainer($(elem.currentTarget), true);
  });
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
  },
  about: function(data) {
    var el = $('<div>');
    _.each(data, function(elem) {
      var template = templates.text_translated({
        content: elem[0],
        translation: elem[1]
      })
      el.append(template);
    })
    $('.translations').append(el);
  },
  trainer: function(elem, click_column) {
    if (click_column) {
      var pos = elem.index() + 1;
    } else {
      var pos = elem.attr('class');
    }
    var table = elem.parent().parent().parent();
    var classes = table.attr('class').split(" ");
    var show = _.include(classes, 'hidden' + pos);
    if (show) {
      table.removeClass('hidden' + pos);
    } else {
      table.addClass('hidden' + pos);
    }
  },
  prepositions: function(data, dom_el) {
    var el = $('<tbody>');
    _.each(data, function (value, key) {
      var uses_el = $('<ul>');
      _.each(value.use, function(elem){
        uses_el.append($(templates.list_item({
        content: elem,
      })))
      })
      var examples_el = $('<ul>');
      _.each(value.examples, function(elem){
        examples_el.append($(templates.list_item({
        content: elem,
      })))
      })
      el.append($(templates.prepositions({
        prepositions: key,
        uses: uses_el.html(),
        examples: examples_el.html(),
      })))
    })
    dom_el.replaceWith(el);
  }
}
var templates = {
  pair_value: _.template("\
    <tr>\
    <% if (!(typeof(count) == 'undefined') && (count)) { %>\
    <td><%= count %></td>\
    <% } %>\
    <td><%= word %></td>\
    <td><%= translation %></td>\
    </tr>"
  ),
  examples: _.template("\
    <dt><%= example %></dt>\
    <dd><%= explanation %></dd>"
  ),
  text_translated: _.template("\
    <div class='translated-items row'>\
      <div class='span6'>\
        <p><%= content %></p>\
      </div>\
      <div class='span6'>\
        <p><%= translation %></p>\
      </div>\
    </div>\
    "
  ),
  prepositions: _.template("\
    <tr>\
      <td>\
        <strong><%= prepositions %></strong>\
        <ul>\
          <%= uses %>\
        </ul>\
      </td>\
      <td>\
        <ul>\
          <%= examples %>\
        </ul>\
      </td>\
    </tr>\
    "
  ),
  list_item: _.template("\
    <li><%= content %></li>\
  ")
}
