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
    password: process.env.DB_PASSWORD // Password is entered here at the time of execution --- from the Env variable
};

// Create a basic node app using express framework that we had installed
var app = express();
app.use(morgan('combined'));

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
                ${date.toDateString()}
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
app.get('/test-db', function(req, res){
    pool.query('SELECT * FROM TEST',function(err, result){
        if (err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
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


// Get the Article page contents from the Database and create a HTML Template
app.get('/articles/:articleName', function(req,res){
    pool.query("SELECT * FROM ARTICLE WHERE TITLE='"+ req.params.articleName+"'", function(err, result){
       if (err) { // If any error
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length === 0){ // If no rows are returned from the database
               res.status(404).send("Article not found");
           }else{
                var articleData = result.rows[0]; // Assuming that only one row is returned from the DB
                res.send( createTemplate(articleData) );
           }
        }
    });
});

//Binding express app to port 
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
