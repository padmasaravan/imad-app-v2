console.log('Loaded!');

  // Make a request to server once the Button is clicked
 var subBtn = document.getElementById('login-Btn');
 subBtn.onclick = function()
 {
   // Create a request
    var request = new XMLHttpRequest();
    
    // Get the response and store it in a variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
				 // Populate the list using the server's response
				alert('User logged in');
				console.log("Login successful");
			}
		}
	};

	// Code to capture the username and password
	var userName = document.getElementById('username').value;
	var passWord = document.getElementById('password').value;
    alert(userName);
    alert(passWord);
	 //Make the request

    //request.open('POST', 'http://localhost:8080/login', true); //for localhost
     request.open('POST', 'http://padmasaravan.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username:userName, password:passWord}));	
 };
