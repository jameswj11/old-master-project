$(function(){
  console.log('document ready')
  $.ajax({
    url:'/api',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(function(artist){
        artist.paintings.forEach(function(paintings){
          console.log(paintings)
          let $img = $('<img>')

          $img.attr('src', paintings.url)
              .text(paintings.title)

          $('body').append($img)
        })
      })
    }
  })
})
