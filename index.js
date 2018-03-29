const express = require('express')
//cross origin request service it allows our apis to be accessed from another server
const cors = require('cors');
//morgan is used to log every request made and where the request is coming from
const morgan = require('morgan');

var app = express()
app.use(morgan('combined'));
app.use(cors());

app.set('view engine', 'ejs')



app.get('/', function (req, res) {

    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('8fe44449691b48469b10f822c3bda875');
    newsapi.v2.topHeadlines({
        q: 'trump',
        category: 'politics',
        language: 'en',
        country: 'us'
    }).then(response => {
      //  res.send(response);
       res.render('index',data=[response])
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });
    //res.render('index',{user:"Ogbonna Vitalis",title:"Andela App Challenge"})

})

if (app.listen(process.env.PORT || 7070)) {
    console.log("Node is listening to port 7070")
}