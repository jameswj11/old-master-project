$(function(){
  console.log('document ready')

  function getAllArt(){
    $.get('/api').done((data)=>{
        data.artists.forEach((artist)=>{
          artist.artworks.forEach((artwork)=>{
            let $img = $('<img>').addClass('thumbnail')

            $img.attr('src', artwork.url)

            $('#main').append($img)
          })
        })
      }
    )
  }


  function searchArtist(){
    let artistName = $('#dropdown option:selected').val()
    let data       = {artist: artistName}

    $.get('/api', data).done((data)=>{
      renderArtist(data);
    })
  }


  function renderArtist(artist){
    $('#main').empty()

    let artistObject = artist[0];
    let $artistName  = $('<h3>').text(
      artistObject.name + ' ' + '(' + artistObject.bio + ')')

    $('#main').append($artistName)

    artistObject.artworks.forEach((artwork)=>{
      let $div  = $('<div>').addClass('artwork')
      let $img  = $('<img>')
      let $info = $('<p>')

      $img.attr('src', artwork.url)
      $info.text(artwork.title + ', ' + artwork.date)

      $div.append($img).append($info)

      $('#main').append($div)
    })
  }

  //initial functions load upon page load
  getAllArt()
  $('#dropdown').change(()=>{
    searchArtist()
  })
})
