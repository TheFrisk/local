/*============Mongo DB ===============*/

var MongoClient = require('mongodb').MongoClient;

/*=========== FIN ============*/

/*============ SOCKET ET SERVEUR =========*/

var express = require('express');
var http = require('http');
var io = require('socket.io');

/*============= FIN ============*/

/*=========== Décalaration des variables =============*/

var joueurs = 0;
var tour = 0;

/*=========== FIN ==============*/

/*========== Connection MongoDB =========*/

MongoClient.connect("mongodb://localhost:27017/huco", function(err, db) {
  if(!err) {
    console.log("We are connected to database");
  }
});

/*============ FIN =============*/

/*=============  PARAMETRES D INITIALISATION DU SERVEUR ==============*/

var app = express();
app.use(express.static('public'));
//Specifying the public folder of the server to make the html accesible using the static middleware

var server =http.createServer(app).listen(8080);
//Server listens on the port 8080
io = io.listen(server);
/*initializing the websockets communication , server instance has to be sent as the argument */

/*=================== FIN =================*/





/*====================== ICI SE DECLARENT TOUTES LES INTERACTIONS AVEC LES AUTRES APPAREILS =============*/

io.sockets.on("connection",function(socket){
    /*Associating the callback function to be executed when client visits the page and
      websocket connection is made */

    console.log("connected to tablet client!");
    //on vérifie qu'on est bien connecté au client.


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


    socket.on("message",function(data){
      console.log("message Received");
      data = JSON.parse(data);
      if(data.android != null)
      {
        console.log("I am an android");
      }

      if(data.player_order != null)
      {
        console.log("order recieved !");
        console.log(toString(data.player_order));
      }
    });

});



/*=====================FIN==================*/
