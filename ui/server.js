var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

/*
Assigning values to different sections of the Article pages. Each page's content  is created as a Javascript Object
*/

var articles = {
    'article-one': {
        title: 'Article One |  Padma Bala',
        heading: 'Article One',
        date: 'Feb 4 2017',
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

//Code to capture the name sent as a part of the URL
var names =[];
app.get('/submit-name', function (req,res) {
   var name = req.query.name;
   names.push(name); // Add the value of name var to the end of the array names
   // JSON Javascript Object Notation
   res.send(JSON.stringify(names)); //Converts the content of the names array into a series of String.
});


// To return the HTML template as the response
app.get('/:articleName', function(req,res){
    var articleName = req.params.articleName; // Getting the value of the parameter from the URL
    res.send( createTemplate(articles[articleName]) );
});

// Code to return the counter value when /counter page is accessed
var count = 0; 
app.get('/counter', function (req,res) {
   count++;
   res.send(count.toString());
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});