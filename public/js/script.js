$(function(){
  console.log('document ready')

  function appendToGrid(){
    let $grid = $('#grid')
  }

  function getAllArt(){
    $.get('/api').done((data)=>{
        data.artists.forEach((artist)=>{
          artist.artworks.forEach((artwork)=>{
            let itemArray = []
            let grid      = document.getElementById('grid')
            let image     = document.createElement('img')

            image.src = artwork.url;
            image.classList.add('thumbnail')

            itemArray.push(image)
            salvattore.appendElements(grid, itemArray)
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
      let $img  = $('<img>').addClass('large')
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
