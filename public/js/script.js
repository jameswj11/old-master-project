$(function(){
  console.log('document ready')

  function getAllArt(){
    $.get('/api').done((data)=>{
        data.artists.forEach((artist)=>{
          artist.artworks.forEach((artwork)=>{
            let itemArray = []
            let grid      = document.getElementById('grid')
            let imgDiv    = document.createElement('div')
            let image     = document.createElement('img')

            imgDiv.maker = artwork.maker;
            imgDiv.named = artwork.title;
            image.src    = artwork.url;

            imgDiv.classList.add('thumbnail')
            image.classList.add('thumbnail')

            imgDiv.appendChild(image)
            itemArray.push(imgDiv)

            salvattore.appendElements(grid, itemArray)
          })
        })

        //on hover, render artwork information
        let $thumbnail = $('.thumbnail')

        $thumbnail.hover(function(){
          // let height   = $(this).height()
          let maker    = $(this)[0].maker;
          let title    = $(this)[0].named;

          let $infoBox = $('<div>').addClass('infoBox')

          let $info    = $('<p>').addClass('info')
                                 .text(maker + ', ' + title)
                                 // .height(height)
          $infoBox.append($info)
          $(this).append($infoBox)

          $infoBox.fadeTo('fast', 1)

        }, function(){
          $('.infoBox').remove()
        })
      }
    )
  }

  function searchArtist(){
    let artistName = $('#dropdown option:selected').val()
    let data       = {artist: artistName}

    console.log(artistName)

    $.get('/api', data).done((data)=>{
      renderArtist(data);
    })
  }


  function renderArtist(artist){
    $('#grid').empty()

    let artistObject = artist[0];
    let $artistName  = $('<h3>').text(
      artistObject.name + ' ' + '(' + artistObject.bio + ')')

    $('#grid').append($artistName)

    artistObject.artworks.forEach((artwork)=>{
      let $div  = $('<div>').addClass('artwork')
      let $img  = $('<img>').addClass('large')
      let $info = $('<p>')

      $img.attr('src', artwork.url)
      $info.text(artwork.title + ', ' + artwork.date)

      $div.append($img).append($info)

      $('#grid').append($div)
    })
  }

  //initial functions load upon page load
  getAllArt()
  // thumbnailHover()
  $('#dropdown').change(()=>{
    searchArtist()
  })
})
