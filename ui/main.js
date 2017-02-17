console.log('Loaded!');

var button = document.getElementById('count-button');

button.onclick = function()
{
    // Create a request
    var request = new XMLHttpRequest();
    
    // Get the response and store it in a variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                //Take action
                var counter = request.responseText; // Response value accessed as Text
                var span = document.getElementById('count-span');
                span.innerHTML = counter.toString();  // Update the value of the Span element in the page
            }
        }
    };
    
    //Make the request
    // request.open('GET', 'http://localhost:8080/counter', true); //for localhost
    request.open('GET', 'http://padmasaravan.imad.hasura-app.io/counter', true);
    request.send(null);
 };

 
  // Make a request to server once the Button is clicked
 var subBtn = document.getElementById('submit-Btn');
 subBtn.onclick = function()
 {
   // Create a request
    var request = new XMLHttpRequest();
    
    // Get the response and store it in a variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
				 // Populate the list using the server's response
				 var names = request.responseText;
				 names = JSON.parse(names);
				 var list= [];
				 for (i=0; i<names.length;i++)
				 {
					 list+= '<li>'+names[i]+'</li>';
				 }
				 var ul = document.getElementById('nameList');	
				 ul.innerHTML = list;
			}
		}
	};

	// Code to capture the value in the Input box
	 var nameInput = document.getElementById('name');
	 var name = nameInput.value;
	 
	 //Make the request
    // request.open('GET', 'http://localhost:8080/submit-name?name='+name, true); //for localhost
    request.open('GET', 'http://padmasaravan.imad.hasura-app.io/submit-name?name='+name, true);
    request.send(null);	
 };
 
 
/* Code to change the HTML content from Javascript

var element = document.getElementById('body-text');
element.innerHTML = 'New Text changed by JavaScript';

*/

/* Code to move the Image to right..when it is clicked on

var img = document.getElementById('body-img');
var marginLeft =0;

img.onclick = function(){
    var interval = setInterval(moveRight,50);  // call the moveRight funtion every 50ms
    function moveRight(){
        if(marginLeft == 900){
            clearInterval(interval); //Stop the timer
        }else{
            marginLeft = marginLeft + 1;
            img.style.marginLeft = marginLeft + 'px';
        }
    } // End of moveRight fucntion
}; // End of function
*/