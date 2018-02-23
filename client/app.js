$(function(){

   var currentdate = new Date();

   var currentyear = currentdate.getFullYear();
   var lastyear  = currentyear -1;



   $('#test').on('submit', function(e){
      e.preventDefault();
      var ses = lastyear + "-playoff";
      var data = {league:"nhl", season: ses};
      $.ajax({
        url: "feeds",
        data: JSON.stringify(data),
        contentType: "application/json",
        method: "POST"
      }).done( function(resp){
          console.log(resp);
          var responsedata = JSON.parse(resp);
          var tablebody = $('#bod');
          responsedata.fullgameschedule.gameentry.forEach(function(element) {
            var row =  $('<tr>');
            var date = $('<td>');
            var game = $('<td>');
            var time = $('<td>');
            var teams = element.homeTeam.City + " " + element.homeTeam.Name + " vs. " + element.awayTeam.City + " " + element.awayTeam.Name;
            date.text(element.date);
            game.text(teams);
            time.text(element.time);
            row.append(game);
            row.append(date);
            row.append(time);
            tablebody.append(row);
          });
        })
      .fail( function(resp){
          console.log(resp);
        });
      // jQuery.post('/CoffeeShops', {}, function(response){
      //   console.log(response);
      // });
    }
   )
});
