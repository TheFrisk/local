var express = require('express');
var http = require('http');
var io = require('socket.io');

/*===========Décalaration des variables =============*/

var joueurs = 0;
var tour = 0;

/*===========FIN==============*/





/*=============  PARAMETRES D INITIALISATION DU SERVEUR ==============*/

var app = express();
app.use(express.static('public'));
//Specifying the public folder of the server to make the html accesible using the static middleware

var server =http.createServer(app).listen(8080);
//Server listens on the port 8080
io = io.listen(server);
/*initializing the websockets communication , server instance has to be sent as the argument */

/*========================FIN=================*/





/*====================== ICI SE DECLARENT TOUTES LES INTERACTIONS AVEC LES AUTRES APPAREILS =============*/

io.sockets.on("connection",function(socket){
    /*Associating the callback function to be executed when client visits the page and
      websocket connection is made */

    console.log("connected to tablet client!");
    //on vérifie qu'on est bien connecté au client.

    var init_the_game={
      is_init : 0
    }

    socket.send(JSON.stringify(init_the_game));



    //   var message_to_client = {
    //     data:"Connection with the server established"
    //   }
    //   socket.send(JSON.stringify(message_to_client));
    //   /*sending data to the client , this triggers a message event at the client side */
    // console.log('Socket.io Connection with the client established');
    // var ack_to_client = {
    //   turn_info : tour,
    //   phase_info : phase,
    //   player_info : joueurs
    // }
    //
    // socket.send(JSON.stringify(ack_to_client));
    // socket.on("message",function(data){
    //     /*This event is triggered at the server side when client sends the data using socket.send() method */
    //     data = JSON.parse(data);
    //
    //
    //     console.log(data);
    //     /*Printing the data */
    //     var ack_to_client = {
    //     data:"Server Received the message"
    //   }
    //   socket.send(JSON.stringify(ack_to_client));

    //});

});

/*=====================FIN==================*/
