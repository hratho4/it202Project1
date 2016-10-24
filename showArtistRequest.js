
var searchArtist = function (query) {
    var resultsPlaceholder = document.getElementById('results');
	console.log(query);
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist',
            offset: 0,
            limit : 5
        },
        success: function (response) {
            //resultsPlaceholder.innerHTML = template(response);
            
            console.log(response);
            var array = response.artists.items;
            var html = '<div class="col-lg-12">'+
                '<h3 class="page-header">Searched Artist</h3> ' +
                '</div>';
            if(array[0] != null)
            {
                array.forEach(function(v){
                    if (v.images[0] != null)
                    {
                        html += '<div class="col-sm-4 col-xs-6" data-artist-id ="'+ v.id +'">' +
                        '<h5>'+ v.name +'</h5>'+ 
                        '<img src="' + v.images[0].url +'" class ="cover portfolio-item img-responsive" artistid ="'+v.id+'">' +
                        
                        '</div>';
                        console.log(v.images[0].url);
                    }
                    //console.log(html);
                }, this);
                //resultsPlaceholder.innerHTML = "<p>Hello World</p>";
                resultsPlaceholder.innerHTML = html;
            }
            else
            {
                //HFAKJHSDKFJ
                html += '<div><h4>No Artists Found</h4></div>';
                resultsPlaceholder.innerHTML = html;
            }
           
        }
    });
};

results.addEventListener('click', function(e) 
{
    var target = e.target;
    if (target !== null && target.classList.contains('cover')) 
    {
        var artist_id = target.getAttribute('artistid');
        sessionStorage.setItem('artistId', artist_id);
        console.log();
        window.location.assign("showSongs.html");
    }
});


