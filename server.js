var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

//Database Confiquration Details
var config = {
    user: 'padmasaravan',
    database: 'padmasaravan',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-padmasaravan-62727'
};

var app = express();
app.use(morgan('combined'));

/*
Assigning values to different sections of the Article pages. Each page's content  is created as a Javascript Object
*/

var articles = {
    'article-one': {
        title: 'Article One |  Padma Bala',
        heading: 'Article One',
        date: 'Mar 4 2017',
        content: `
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
                `
    },
    'article-two': {
        title: 'Article Two --  Padma Bala',
        heading: 'Article Two',
        date: 'Feb 14th 2017',
        content: `
                <h4>Section 1</h4>
                <p>
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                </p>
                <h4>Section 2</h4>
                <p>
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                    Article Two content is displayed.....
                </p>
                `
    },
    'article-three': {
        title: 'Article Three --  Padma Bala',
        heading: 'Article Three',
        date: 'Feb 24th 2017',
        content: `
                <h4>Section 1</h4>
                <p>
                    Article Three content is displayed.....
                    Article Three content is displayed.....
                    Article Three content is displayed.....
                    Article Three content is displayed.....
                    Article Three content is displayed.....
                    Article Three content is displayed.....
                </p>
                `
    }
};

//Function to create the HTML template with the Object sent
function createTemplate (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
    <!-- HTML file for the page Article One -->
    <head>
        <title> ${title}   </title>
        
        <!-- The tag is for Mobile browsers so that the page is not zoomed out -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
         <!-- Adding the CSS elements -->
        <link href="/ui/style.css" rel="stylesheet" />
    
    </head>
    <body>
        <div class="pageBody">
            <div>
                <a href="/"> HOME </a>
            </div>
            <hr/>
            <h2>
                ${heading}
            </h2>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html> 
    
    `;
    
    return htmlTemplate ;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/flower.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'flower.jpg'));
});

// Create a connection Pool
var pool = new Pool(config);

//Code to test the Database connectivity
app.get('/testdb', function(res, req){
    pool.query('SELECT * FROM TEST',function(err, result){
        if (err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

//Code to capture the name sent as a part of the URL
var comments =[];
app.get('/post-cmnt', function (req,res) {
   var name = req.query.name;
   comments.push(name); // Add the value of name var to the end of the array names
   var cmnt = req.query.comment;
   comments.push(cmnt);
   
   // JSON Javascript Object Notation
   res.send(JSON.stringify(comments)); //Converts the content of the names array into a series of String.
});


// To return the HTML template as the response
app.get('/:articleName', function(req,res){
    var articleName = req.params.articleName; // Getting the value of the parameter from the URL
    res.send( createTemplate(articles[articleName]) );
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
