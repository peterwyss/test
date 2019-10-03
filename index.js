var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const articles = {'burger':10.50,'hotdog':6.00,'pasta':15.00, 'salat':};
var summe = 0;
var rechnungsnummer = 1;
var article = "";
var number = 0;
var price = 0;
var summe = 0;
var ztotal = 0;
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    if(msg == 'total'){
      socket.emit('chat message', summe);
      rechnungsnummer ++;
      summe = 0;
      
    }else if(msg == 'list'){
      for(key in articles ){
         io.emit('chat message', key + " " + articles[key] );
        }
          
    }else{ 
    var str = msg.split(" ");  
    if(str.length > 1){
       article = str[1];
       number = str[0];
    } else{
      article = str[0];
    } 
    if(article in articles){    
      console.log(article+" "+ number);
      price = articles[article];
      console.log(price);
      if(number != 0){
          ztotal = price * number;
          number = 0;

      }else{
        ztotal = price;
      } 
    console.log("ztotal: " + ztotal);
    summe = summe + ztotal;
    console.log(summe);
    io.emit('chat message', "Nr. " + rechnungsnummer+ " : " +ztotal);
    }else{
      io.emit('chat message',"Dieser Artikel ist nicht vorhanden!");
    }
  }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
