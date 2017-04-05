var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool; // Postgres client for node
var crypto = require('crypto'); // Crypto lib - to implement Hashing
var bodyParser = require('body-parser'); // Express library - bodyParser - to load the data into req.body variable
var session = require('express-session');

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

// To inform express app to load the json content (if any) into req.body variable for every incoming request
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomWord',
    cookie: { maxAge: 1000*60*60*24*30}
}));

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
        <!-- The tag is for Mobile browsers so that the page is not zoomed out -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
         <!-- Adding the CSS elements -->
        <link href="/ui/style.css" rel="stylesheet" />
    
         <title class="center"> ${title} </title>
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
        <hr/>
        <h4> Comments </h4>
        <div id="comment_form">
        </div>
        <div id="comments">
            <center> Comments....Loading....</center>
        </div>
        <script type="text/javascript" src="/ui/article.js"></script>
     </body>
    </html> 
    
    `;
    
    return htmlTemplate ;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('ui/:filename', function(req, res){
   res.sendFile(path.join(__dirname,'ui', req.params.filename)); 
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


// Hashing Function - using Crypto lib
function hash (input, salt){
    var hashVal = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashVal.toString('hex')].join('$');
}

// Code to implement --  Hashing Endpoint
app.get('/hash/:input', function(req, res){
   var hashedStr = hash(req.params.input,'some-random-salt');
   res.send(hashedStr);
});

// Code to implement Create User Endpoit
app.post('/create-user', function(req, res){
   // Get username & password
   var username = req.body.username;
   var password = req.body.password;
   
   // Random salt string
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash (password, salt);
   
   //Insert into the DB - to create a User entry
   pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)', [username, dbString], function (err, result){
       if (err){
            res.status(500).send(err.toString());
        }else{
            res.send("User : "+username+" created Successfully" );
        }
   });
});

// Code to check the Login of the user
app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
        if (err){
            res.status(500).send(err.toString());
        }
        else
        {
            if (result.rows[0].length === 0){
                res.send(403).send("Username / Password - Invalid");
            }
            else{
                // Match the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2]; //Becoz the salt - value is stored as the 3rd value -while storing in the password DB...joined with $
                var hashPass = hash(password,salt);
                if (hashPass === dbString){
                    
                    //set the session
                    req.session.auth = {userId: result.rows[0].id};
                    
                    // set cookie with a session id
                    //Internally on the server side, it maps the Session id to an Object(auth : UserID)
                    res.send("Login successfull");
                }
                else{
                    res.send(403).send("Username / Password - Invalid");
                }
            }
        }
    });
});

app.get('/check-login', function(req, res){
    if (req.session && req.session.auth && req.session.auth.userId){
        res.send('Hi there, '+req.session.auth.userId.toString()+' !!! U are logged in ....');
    }
    else{
        res.send('You are not logged in...');
    }
});

app.get('/logout', function(req, res){
    delete req.session.auth;
    res.send('Logout Successful');
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
    pool.query("SELECT * FROM ARTICLE WHERE TITLE=$1",[req.params.articleName], function(err, result){
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
