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
	var userName = document.getElementById('username').value;
	var passWord = document.getElementById('password').value;

	 //Make the request

    //request.open('POST', 'http://localhost:8080/login', true); //for localhost
     request.open('POST', 'http://padmasaravan.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username:userName, password:passWord}));	
 };
