const express = require('express');
const path = require('path');
const twit = require('twit');
const consolidate = require('consolidate');

const app = new express();
app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'dist'));
app.use(express.static('dist'));

app.set('view engine', 'html');

config = {
  consumer_key: '..',
  consumer_secret: '..',
  access_token: '..',
  access_token_secret: '..'
}

const T = new twit(config);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // res.render('index');
})

app.get('/api/:q', function(req, res){

    T.get('search/tweets', { q: req.params.q }, function(err, data, response){
      if (!err){
        return res.json(data.statuses);
      }
      return res.status(400).json(err);
    })
  })
app.get('/api/user/:name', function(req, res){
  if (!req.params.name) {
    return res.status(400).json({
      msg: 'Preencha o nome'
    })
  }
  T.get('users/search', { q: req.params.name }, function(err, data, response){
    if (!err){
      return res.json(data);
    }
    return res.status(400).json(err);
  })
});

app.listen(2000, function(v){
  console.log("Express runing");
})
