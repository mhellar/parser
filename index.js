//Import the necessary libraries/declare the necessary objects
var express = require("express");
var myParser = require("body-parser");
var app = express();

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://40.122.47.240');

client.on('connect', function () {
  client.subscribe('/hi');
  client.publish('/hi', 'Hello mqtt');
});
 

  app.use(myParser.urlencoded({extended : true}));
  app.post("/sigfox/datain", function(request, response) {
      console.log(request.body); //This prints the JSON document received (if it is a JSON document)
    //       io.sockets.emit('data', {
    //     val: request.body
    // });
    client.publish('/hi', JSON.stringify(request.body));

});

//Start the server and make it listen for connections on port 8080

var server = app.listen(3030);

 var io = require('socket.io')(server);

 app.get('/', function(req, res) {
     res.sendFile(__dirname + '/index.html');
 });

 


