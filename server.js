var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
    title: 'Article One --  Padma Bala',
    heading: 'Article One',
    date: 'Feb 14th 2017',
    content: `<div>
            <h4>Section 1</h4>
            <p>
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
            </p>
            <h4>Section 2</h4>
            <p>
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
            </p>
            <h4>Section 3</h4>
            <p>
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
                Article One content is displayed.....
            </p>
        </div>` 
};


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
