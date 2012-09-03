(function($){
  $(function(){
    $('#search').click(function(event, ui){
      $('#yamamoto-result tbody').empty();
      $('#seimei-result tbody').empty();
      $('#akachan-result tbody').empty();
      var sex = $('#sex-m').attr("checked") ? 'male' : $('#sex-f').attr("checked") ? 'female' : undefined;
      var first_name = encodeURIComponent(encodeURIComponent($('#first-name').val()));
      var last_name = encodeURIComponent(encodeURIComponent($('#last-name').val()));
      // console.debug(first_name);
      // console.debug(last_name);
      $.get('/sjis/' + $('#first-name').val(), function(first){
        $.get('/sjis/' + $('#last-name').val(), function(last){
          var first_name = first;
          var last_name = last;
          // alert(first_name);
          // alert(last_name);
          $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.keishinsya.jp%2Fokina%2Fcgi_bin2%2Fseimei.cgi%3Fover40%3Dno%26marry%3Dyes%26sex%3D"
                    + sex + '%26sei%3D' + last_name + '%26mei%3D' + first_name + '%27%20and%20charset%3D%27Shift_JIS%27%20and%20xpath%3D%27%2F%2Fblockquote%2Fp%27&format=json&callback=?',
                    function(data){
                      // console.debug(data.query.results);
                      $.each([['主運', data.query.results.p[0].content],
                              ['対人運・社交運', data.query.results.p[1].content],
                              ['健康運', data.query.results.p[2].content],
                              ['性格', data.query.results.p[3]],
                              ['基礎運', data.query.results.p[4].content],
                              ['晩年運', data.query.results.p[5].content]], function(n, text){
                                $('#yamamoto-result tbody').append('<tr>' + '<th>' + text[0] + '</th>' + '<td>' + text[1] + '</td>' + '</tr>');
                              });
                    })
              .error(function(data){
              });
        });
      });

      
      $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fseimei.linkstudio.biz%2F%3Fsex%3D"
                + sex[0] + "%26surname%3D"
                + last_name +
                "%26firstname%3D" + 
                first_name + "'%20and%20charset%3D'UTF-8'%20and%20xpath%3D'%2F%2Fdiv%5B%40class%3D%22kekka%22%5D'&format=json&callback=?",
                function(data){
                  // console.debug(data.query.results.div);
                  $.each([[data.query.results.div[0].h3.strong[0], data.query.results.div[0].h3.strong[1], data.query.results.div[0].p[0].content],
                          [data.query.results.div[1].h3.strong[0], data.query.results.div[1].h3.strong[1], data.query.results.div[1].p[0].content],
                          [data.query.results.div[2].h3.strong[0], data.query.results.div[2].h3.strong[1], data.query.results.div[2].p[0].content],
                          [data.query.results.div[3].h3.strong[0], data.query.results.div[3].h3.strong[1], data.query.results.div[3].p[0].content],
                          [data.query.results.div[4].h3.strong[0], data.query.results.div[4].h3.strong[1], data.query.results.div[4].p[0].content],
                          [data.query.results.div[5].h3.strong[0]  + data.query.results.div[5].h3.strong[1], '', data.query.results.div[5].p[1].content]], 
                         function(n, text){
                           $('#seimei-result tbody').append('<tr>' + 
                                                            '<th>' + text[0] + '</th>' + 
                                                            '<td>' + text[1] + '</td>' + 
                                                            '<td>' + text[2] + '</td>' + 
                                                            '</tr>');
                         });
                })
          .error(function(data){
          });

      $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fakachan-meimei.com%2F%3Fsurname%3D"
                + last_name + "%26firstname%3D" + first_name +
                "%26sex%3D" + sex[0] + "'%20and%20xpath%3D'%2F%2Ftd'&format=json&callback=?",
                function(data){
                  // console.debug(data.query.results.td);
                  $.each([['総運', data.query.results.td[0].h3.strong, data.query.results.td[0].p[0].content],
                          ['人運', data.query.results.td[1].h3.strong, data.query.results.td[1].p[0].content],
                          ['外運', data.query.results.td[2].h3.strong, data.query.results.td[2].p[0].content],
                          ['地運', data.query.results.td[3].h3.strong, data.query.results.td[3].p[0].content],
                          ['天運', data.query.results.td[4].h3.strong, data.query.results.td[4].p[0].content]],
                         function(n, text){
                           $('#akachan-result tbody').append('<tr>' + 
                                                             '<th>' + text[0] + '</th>' + 
                                                             '<td>' + text[1] + '</td>' + 
                                                             '<td>' + text[2] + '</td>' + 
                                                             '</tr>');
                         });
                })
          .error(function(data){
          });
    });
  });
})(jQuery);

