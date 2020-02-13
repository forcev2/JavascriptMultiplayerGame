		var resp = 0;
		
		/*
		function serverSend(){
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  resp = this.responseText;
			}
		  };
		  xhttp.open("POST", "http://localhost:8001");
		  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		  xhttp.send("fname=Henry&lname=Ford");			
		}
		*/
				// Create the XHR object.
		function createCORSRequest(method, url) {
		  var xhr = new XMLHttpRequest();
		  if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		  } else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		  } else {
			// CORS not supported.
			xhr = null;
		  }
		  return xhr;
		}

		// Helper method to parse the title tag from the response.

		// Make the actual CORS request.
		function makeCorsRequest(req) {
		  // This is a sample server that supports CORS.
		  var url = 'http://localhost:8001/' + req;

		  var xhr = createCORSRequest('GET', url);
		  if (!xhr) {
			alert('CORS not supported');
			return;
		  }
		  // Response handlers.
		  xhr.onload = function() {
			resp = xhr.responseText;
				//alert(resp);
		
			//alert("outside " + resp);
			//console.log("SERVER RESPONSE: "+ resp);
		  };
		 // console.log("SERVER RESPONSE outside: "+ resp);
		  
		  xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		  };

		xhr.send();
		

		  
		  
		  return resp;
		}
		
		function request(req){
			var url = 'http://localhost:8001/' + req;
			if (XMLHttpRequest) {
				var request = new XMLHttpRequest();
				if ('withCredentials' in request) {
					request.open('GET', url, true);
					request.onreadystatechange = handler;
					request.send();
				} else if (XDomainRequest) {
					var xdr = new XDomainRequest();
						xdr.open('get', url);
						xdr.send();
				} else {
					// CORS not supported
				}
			}
		}
		
