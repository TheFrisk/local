$(document).ready(function(){
  var to_db_players_order = [];

  /*================ lorsque l'on clique sur commencer ==============*/

  $("#player_number_input").change(function()
  {
    $("#player_number").text($("#player_number_input").val());
  });

  $("#start_game").click(function()
  {
    var players = $("#player_number_input").val();
    for(var i = 1; i <= players; i++)
    {
      to_db_players_order[i] = i;
      console.log(to_db_players_order[i]);
    }
    shuffle(to_db_players_order,players);

    $(".need_interaction").fadeOut('slow',function()
    {
      $(".need_interaction").addClass("hide");
    });

    setup_plate(players);
    tir_ordre_joueur(players);
    //tir_personnages(players);
  });

  /*================= FIN ==================*/

  /*================ ajout de la grille selon le nombre de joueur =============*/

  function setup_plate(players){
    //on crée la grille
    $("body").append("<div id='divInfo'></div>");
    if(players >= 4 && players <= 5)
    {
      $("body").append("<table class='grid'> <thead> <tr>  </tr> </thead> <tbody> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tbody></table>");
      for(var i = 1; i<= players; i++)
      $("#divInfo").append("<div class='infoJoueurs4-6' id='player-"+i+"-"+players+"' >Joueur"+i+"</div>");
    }
    else
    {
      $("body").append("<table class='grid'> <thead> </thead> <tbody> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> <td>&nbsp;</td> </tr> <tbody> </table>");
      for(var i = 1; i<= players; i++)
      $("#divInfo").append("<div class='infoJoueurs7-8' id='player-"+i+"-"+players+"' >Joueur"+i+"</div>");
    }

    // if(players <= 6 ) {
    //
    //
    //
    // }
    //
    // else {
    //
    //
    //
    // }
    // for(var i= 1;i<=players; i++)
    // {
    //   $("body").append("<div id='divInfo'></div>");
    //   $("#divInfo").append("<div class='infoJoueurs' id='player-"+i+"'>Joueur"+i+"</div>");
    // }



  }

  /*============== FIN ===============*/

  /*========== tirage au sort des joueurs ==========*/

  function tir_ordre_joueur(joueurs){
    var player_asked = 0;


    $(".need_interaction").removeClass("hide");
    $(".need_interaction").children().fadeOut('slow').addClass("hide");

    fenetre_aleatoire( player_asked, joueurs)



  }

  /*============ FIN ==========*/

  /*======== fonction pour shuffle la liste ======*/

  function shuffle(array)
  {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

  }


  /*=========== FIN ==========*/

  /*========= affiche les fenêtres pour le lancé de dé ==========*/

  function fenetre_aleatoire(player_asked,joueurs)
  {
    var p = parseInt(player_asked);
    var j = parseInt(joueurs);
    var curr_p = p+1;

    $(".need_interaction").removeClass("hide").fadeIn('slow',function(){

      $(".need_interaction").children().addClass("hide");
      $(".need_interaction").append("<p>Pretend you roll a dice and click that button</p><button id='roll_the_dice"+parseInt(curr_p)+"' class='aligned-mid'>Roll the dice</button>");
      $(".need_interaction").append("<p> Vous jouerez en "+(to_db_players_order[curr_p])+" ème");

      $("#roll_the_dice"+parseInt(curr_p)).click(function(){
        $(".need_interaction").children().fadeOut('slow').addClass("hide");
        p = p+1;
        if(parseInt(p) != j)
        {
          fenetre_aleatoire(p,j);
        }
        else {
          {
            $(".need_interaction").fadeOut('slow').addClass('hide');
            send_order_node(to_db_players_order,joueurs);
          }
        }
      });

    });

  }

  /*================ FIN ==============*/

  /*============== Envoie la lite contenant l'ordre de jeu des joueurs ==========*/

  function send_order_node(order_list,players)
  {
    if(order_list != null)
    {
      var order = "";
      for(var i = 1 ; i <= players; i++)
      {
        order += order_list[i]+",";
        console.log(order);
      }

      var toSend = {
        player_order : order
      }
      socket.send(JSON.stringify(toSend));
    }
    else
    {
      alert("une erreur est survenue dans l'envoi de l'ordre de jeu");
    }
  }

  /*=========== FIN =========*/

});
