// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', function(req, res){
  const now = new Date()
  res.json({
    unix: now.getTime(),
    utc: now.toString()
  })
})

app.get('/api/:date', function(req, res){
  var timeParam = req.params.date
  console.log(timeParam)
  if(timeParam==parseInt(timeParam)){
    timeParam = parseInt(timeParam)
  }
  var date = new Date(timeParam)
  if(date.toString()==='Invalid Date'){
    res.json({error: date.toString()})
  }else{
    const utcArr = date.toString().split(' ')
    const utcDay = utcArr[0]
    const utcDate = utcArr[2]
    const utcMonth = utcArr[1]
    const utcYear = utcArr[3]
    res.json({
      unix: parseInt(date.getTime()),
      utc: `${utcDay}, ${utcDate} ${utcMonth} ${utcYear} 00:00:00 GMT`
    })
  }
})

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
