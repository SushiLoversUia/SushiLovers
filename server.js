const express = require('express')
const app = express()

app.set('port',(process.env.PORT || 8080));

app.get('/', function (req, res) {
  res.send('First server')
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 8080!')
})

app.use(express.static('public'))

app.use('/static', express.static('public'))


console.log('Running');
