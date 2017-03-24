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

	// Code to capture the username and password
	var userName = document.getElementById('username');
	var uName = userName.value;
	var password = document.getElementById('password');
	 var pWord = password.value;
	 
	 //Make the request
    
    
    //request.open('GET', 'http://localhost:8080/post-cmnt?name='+name+'&comment='+cmnt, true); //for localhost
     request.open('GET', 'http://padmasaravan.imad.hasura-app.io/post-cmnt?name='+name+'&comment='+cmnt, true);
    request.send(null);	
 };
