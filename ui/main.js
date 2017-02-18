console.log('Loaded!');

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
				 var cmnts = request.responseText;
				 cmnts = JSON.parse(cmnts);
				 var disCmnt= [];
				 for (i=0; i<cmnts.length;i++)
				 {
					 disCmnt+= '<br/>'+cmnts[i]+' : ';
					 i++;
					 disCmnt+= cmnts[i]+'<br/>';
				 }
				 var pc = document.getElementById('comments');	
				 pc.innerHTML = disCmnt;
			}
		}
	};

	// Code to capture the comment and name of the user
	var cmntInput = document.getElementById('text-comnt');
	var cmnt = cmntInput.value;
	var nameInput = document.getElementById('name');
	 var name = nameInput.value;
	 
	 //Make the request
    request.open('GET', 'http://localhost:8080/post-cmnt?name='+name+'&comment='+cmnt, true); //for localhost
    // request.open('GET', 'http://padmasaravan.imad.hasura-app.io/submit-name?name='+name, true);
    request.send(null);	
 };
