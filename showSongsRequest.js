var a_id = sessionStorage.getItem('artistId');
var songSet = [];
var popSet = [];

console.log(a_id);
$.ajax({
    url: 'https://api.spotify.com/v1/artists/' + a_id,
    success: function (response) {
        console.log(response);
        var name  = response.name;
        var followers = response.followers.total;
        var images = response.images[1].url;
        
        document.getElementById('img').innerHTML ='<img src="'+ images +'" class ="cover img-circle portfolio-item img-responsive">';
        document.getElementById('name').innerHTML ='<h2>' + name + '</h2>';
        document.getElementById('numberFollowers').innerHTML = '<h4>Followers : ' + followers + ' </h4>';
    }
});

$.ajax({
    url: 'https://api.spotify.com/v1/artists/'+a_id+'/top-tracks',
    data:{
        country: 'US'
    },
    success: function(response){
       console.log(response);
       var trackList = response.tracks;
       var html = "";
       
       trackList.forEach(function(track){
           var image = track.album.images[2].url;
           var albumName = track.album.name;
           var songName = track.name;
           var songArtists = track.artists;
           var pop = track.popularity;
           
           songSet.push(songName);
           popSet.push(pop);
           html +='<tr>'+
                  '<td>'+ '<img src="'+ image +'">' +'</td>'+
                  '<td>'+ songName+'</td>'+
                  '<td>'+albumName +'</td>';
                             
            var temp ='';
            var i = 0;
            songArtists.forEach(function(a){
                
                if(i == (songArtists.length -1))
                {
                    temp += a.name;
                }
                else
                {
                    temp += a.name + ', ';
                    i++;
                }
                
            },this);
            
            html += '<td>'+ temp +'</td>'+
                '</tr>';
                
        }, this);
        
        var tbody = document.getElementById('tableBody');
        tbody.innerHTML = html;
       
    }
    
});



google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);

function drawMultSeries() {
      var data = google.visualization.arrayToDataTable([
        ['Songs', 'Popularity'],
        [songSet[0], popSet[0]],
        [songSet[1], popSet[1]],
        [songSet[2], popSet[2]],
        [songSet[3], popSet[3]],
        [songSet[4], popSet[4]],
        [songSet[5], popSet[5]],
        [songSet[6], popSet[6]],
        [songSet[7], popSet[7]],
        [songSet[8], popSet[8]],
        [songSet[9], popSet[9]]
      ]);

      var options = {
        title: 'Popularity of Songs',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Popularity',
          minValue: 0
        },
        vAxis: {
          title: 'Songs'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }