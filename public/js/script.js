$(function(){
  console.log('document ready')
  $.ajax({
    url:'/api',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(function(artist){
        artist.paintings.forEach(function(paintings){
          let $div = $('<div>')
          let $img = $('<img>')
          let $info = $('<p>')

          $img.attr('src', paintings.url)

          $info.text(paintings.title + ', ' + paintings.date)

          $div.append($img)
              .append($info)

          $('body').append($div)
        })
      })
    }
  })
})
