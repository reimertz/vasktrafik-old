
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http');

var app = express();

var nrOfMB = 0;
var nrOfUsers = 0;


app.configure(function(){
    app.set('port', process.env.PORT || 3001);
    app.use(express.bodyParser());

});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {
    console.log('Getting post!');
    var output = {'totalNrOfMB': nrOfMB, 'totalUsers': nrOfUsers};
    var body = JSON.stringify(output);
    console.log(body);
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    res.end(body);

});

app.post('/post', function(req, res) {
    console.log('handling post!');
    var string = JSON.stringify(req.body);
    var parse = JSON.parse(string);
    var mb = parseInt(parse.mb);


    console.log("nr of MB:" + mb);
    if(mb <=  2000  && mb > 9){
        nrOfMB = nrOfMB + mb;
        nrOfUsers = nrOfUsers + 1;
    }
     res.writeHead(201, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    res.end();
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
