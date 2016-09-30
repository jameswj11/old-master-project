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
            imgDiv.date  = artwork.date;
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
          let maker    = $(this)[0].maker;
          let title    = $(this)[0].named;
          let date     = $(this)[0].date;

          let $infoBox = $('<div>').addClass('infoBox')

          let $info    = $('<p>').addClass('thumb-desc')
                                 .text(maker + ', ' + title + ', ' + date)

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

    $.get('/api', data).done((data)=>{
      renderArtist(data);
    })
  }


  function renderArtist(artist){
    $('#wrapper').fadeOut('slow', function(){
      $('#wrapper').empty()

      let artistObject = artist[0];

      let $artistName  = $('<h4>').text(
        artistObject.name + ', ' + artistObject.dates)

      $('#wrapper').append($artistName)

      let $grid    = $('<div>').attr('id', 'gridLarge')
      $('#wrapper').append($grid)

      artistObject.artworks.forEach((artwork)=>{
        let $imgDiv  = $('<div>').addClass('artwork')
        let $image   = $('<img>').addClass('large')
        let $desc    = $('<p>').addClass('large-desc')

        $imgDiv.addClass('artwork')
        $image.addClass('large')
        $desc.addClass('large-desc')

        $image.attr('src', artwork.url)
        $desc.text(artwork.title +
          ', ' + artwork.date +
          ', ' + artwork.medium.toLowerCase() +
          ', ' + artwork.location)

        $imgDiv.append($image).append($desc)

        $('#gridLarge').append($imgDiv)
      })

      $('#wrapper').fadeIn(2000)
    })
  }

  //initial functions load upon page load
  getAllArt()

  $('#dropdown').change(function(){
    searchArtist()
  })
})
