const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (res, req) => res.send('hello'));

app.get('/convert/:number', (req, res) => res.send(JSON.stringify(convert(req.params.number))))

app.get('/sse/convert/:number', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  setInterval(function(){
    res.write('data: ' + JSON.stringify(convert(req.params.number)) + '\n\n');
  }, 4000);
});

const convert = (number) => {
  try {
    num = parseInt(number, 10);

    if (!+num) {
      return NaN;
    }

    var digits = String(+num).split(""),

    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
           "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
           "","I","II","III","IV","V","VI","VII","VIII","IX"],

    roman = "",
    i = 3;
    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    }

    result = Array(+digits.join("") + 1).join("M") + roman;
    return {'roman' : result };
  } catch (error) {

  }
}

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
