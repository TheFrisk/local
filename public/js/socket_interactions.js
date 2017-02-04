$(document).ready(function () {

  /*============= envoie du nombre de joueurs au serveur ==========*/

  function init_game_server(players_number){
    var init_grid = {
      init_players : players_number
    }
    socket.send(JSON.stringify(init_grid));
  }

  /*============== FIN =============*/

});
