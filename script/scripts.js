// LOGIN AND REGISTER POPUP BUTTONS

//Open login
document.querySelector("#login-button").addEventListener("click", function(){
  document.querySelector(".popup-login").classList.add("show");
});
//Close login
document.querySelector("#close-login").addEventListener("click", function(){
  document.querySelector(".popup-login").classList.remove("show");
});
//Open signup
document.querySelector("#signup-button").addEventListener("click", function(){
  document.querySelector(".popup-signup").classList.add("show");
});
//Close signup
document.querySelector("#close-signup").addEventListener("click", function(){
  document.querySelector(".popup-signup").classList.remove("show");
});


//Global variable to know who is the logged user
var logged_user;
var allCookies = document.cookie.split(";");
  for (current_cookie of allCookies){
    if (current_cookie.split("=")[0]==" logged_user"){
		logged_user = current_cookie.split("=")[1].split(",");
    }  
 }

// COOKIES FUNCTIONS

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// LOGIN COMPARED
function login_compared(email){
  // close the login popup, hide the login and signup buttons and show the profile interface
  document.querySelector(".popup-login").classList.remove("show");
  document.getElementById("guest").style.visibility = "hidden";
  document.getElementById("user-area").style.display="flex";
  var nav_elements_user = document.querySelectorAll(".user-mobile-nav");
  for (element of nav_elements_user){
  	element.classList.add("show");
  }

  // get the data of the user
  var allCookies = document.cookie.split(";");
  for (current_cookie of allCookies){
    var current_user = current_cookie.split("=")[1].split(",");
    if (current_user[2]==email){
      logged_user = current_user;
      setCookie("logged_user", current_user, 1000);
    }  
  }

  // set user image and name
  document.getElementById("profile-img-icon").src = logged_user[3];
  document.getElementById("profile-names").innerHTML="Hi " + logged_user[0] + "  &#8205";

}


// FORM VALIDATION SYSTEM

// Auxiliar method for email validation
jQuery.validator.addMethod("email_validation",
           function(value, element) {
                  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
           },
           "The format must be example@domain.extension"
);
// Auxiliar method for password validation
jQuery.validator.addMethod("letters_numbers",
           function(value, element) {
                  return /^[0-9a-z]+$/.test(value);
           },
           "Passwords can contain only lowercase letters and numbers"
);
// Auxiliar method for repeated emails
jQuery.validator.addMethod("repeated_email",
           function(value, element) {
                    var allCookies = document.cookie.split(";");
                    var already_registered = false;

                    // check if the email is already registered
                    for (current_cookie of allCookies){
                      if ((current_cookie.split("=")[1][2])==value){
                        already_registered = true;
                      }  
                    }

                    return !already_registered;
           },
           "This email is already registered!"
);

// when page is loaded execute it
$(document).ready(function() {
	// the actual window
	var URLactual = window.location.toString();
	var user = URLactual.includes("users.html");
	//if a user was logged in another page
	if (logged_user!="" && logged_user!=undefined){
		//it must remain logged
		document.getElementById("guest").style.visibility = "hidden";
  		document.getElementById("user-area").style.display="flex";
  		document.getElementById("profile-img-icon").src = logged_user[3];
  		document.getElementById("profile-names").innerHTML="Hi " + logged_user[0] + "  &#8205";
  		var nav_elements_user = document.querySelectorAll(".user-mobile-nav");
  		for (element of nav_elements_user){
  			element.classList.add("show");
  		}

	}

    //sign-up form validation
    $("#signup-form").validate({
      rules: {
          username: {
            required: true,
            minlength: 3
          },
          password: {
            required: true,
            maxlength: 8,
            letters_numbers: true
          },
          email: {
            required: true,
            email_validation: true,
            repeated_email: true
          },
          check: {
            required: true
          }
      },
      messages: {
        check: {
          required: "Please accept the terms"
        }
      }
    });

    //edit profile form validation
    $("#profile-form").validate({
      rules: {
          username: {
            required: true,
            minlength: 3
          },
          password: {
            required: true,
            maxlength: 8,
            letters_numbers: true
          },
          email: {
            required: true,
            email_validation: true,
            repeated_email: true
          }
      }
    });

    //login form validation
    $("#login-form").validate({
      rules: {
          email: {
            required: true
          },
          password: {
            required: true
          }
      }
    });

    //add experience form validation
    $("#experiences-form").validate({
      rules: {
          title: {
            required: true
          },
          text: {
            required: true
          },
          leavingfrom: {
            required: true
          }
      }
    });

    //edit experience form validation
    $("#edit-experiences-form").validate({
      rules: {
          title: {
            required: true
          },
          text: {
            required: true
          },
          leavingfrom: {
            required: true
          }
      }
    });

	
	if (user){
		var allCookies = document.cookie.split(";");
		for (i=0; i < allCookies.length; i++){
			if (!(allCookies[i].includes('logged_user')) && !(allCookies[i].includes('exp_'))){
				var cookies = allCookies[i].split(',');
				
				var body = document.getElementById("ranking");
				var tr = document.createElement("tr");
				var th = document.createElement("th");
				
				th.setAttribute("scope", "row");
				var usern = cookies[0].split('=')
				var us = document.createTextNode(usern[1]);
				th.appendChild(us);
				var td0 = document.createTextNode(cookies[cookies.length-2]);
				var td1 = document.createElement("td");
				var td2 = document.createElement("td");
				td1.appendChild(td0);
				var td0 = document.createTextNode(cookies[cookies.length -1]);
				td2.appendChild(td0);
				tr.appendChild(th);
				tr.appendChild(td1);
				tr.appendChild(td2);
				body.appendChild(tr);
			}
		}
		
		
		var table, rows, switching, i, x, y, shouldSwitch;
		table = document.getElementById("tableusers");
		switching = true;
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
			// Start by saying: no switching is done:
			switching = false;
			rows = table.rows;
			/* Loop through all table rows (except the
			first, which contains table headers): */
			for (i = 1; i < (rows.length - 1); i++) {
			  	// Start by saying there should be no switching:
			  	shouldSwitch = false;
			  	/* Get the two elements you want to compare,
			  	one from current row and one from the next: */
			  	x = rows[i].getElementsByTagName("TD")[1];
			  	y = rows[i + 1].getElementsByTagName("TD")[1];
			  	// Check if the two rows should switch place:
			  	if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
			  	}
			}
			if (shouldSwitch) {
			  	/* If a switch has been marked, make the switch
			  	and mark that a switch has been done: */
			  	rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			  	switching = true;
			}
		}
	}

	// Function to print the different collections of the user
	if (URLactual.includes("myexperiences.html")){
		var allCookies = document.cookie.split("; ");
		var collections = [];
		//iterate over all cookies
		for (i=0; i < allCookies.length; i++){
			//experiences cookies
			if (allCookies[i].includes('exp_')){
				//experiences of the logged user
				if (allCookies[i].split(',')[13] == logged_user[2]){
					var collection = allCookies[i].split(',')[12];
					//store all collections of the user in collections array
					collections.push(collection);
				}
			}
		}

		//print the collections in the html
		for (collection of collections){
		    var opt = document.createElement('option');
		    opt.setAttribute('onclick',"searchbyCollection("+"\""+collection+"\""+")");
		    opt.value = collection;
		    opt.innerHTML = collection;
		    select = document.getElementById("collection-select");
		    select.appendChild(opt);
		}

	}


	// Function to include all the added experiences 
	if (URLactual.includes("trip.html") || URLactual.includes("experiences.html") || URLactual.includes("myexperiences.html")){
		var allCookies = document.cookie.split("; ");
	
	for (i=0; i < allCookies.length; i++){
		//All the experiences stored in cookies
		if (allCookies[i].includes('exp_')){
			//First we catch all the variables from each experience
			var cookies = allCookies[i].split(',');
			var title = cookies[0];
			var title = title.split('=');
			var exp_id = title[0];
			var title = title[1];
			var description = cookies[1];
			var budget = cookies[2];
			var cultural = cookies[3];
			var historical = cookies[4];
			var beach = cookies[5];
			var mountain = cookies[6];
			var rural = cookies[7];
			var business = cookies[8];
			var leaving = cookies[9];
			var collaborator = cookies[11];
			var collection = cookies[12];
			
			//Create the divs with its attributes
			var div1 = document.createElement('div');
			div1.setAttribute('class', "col-12 col-lg-4 card-item");
			var div2 = document.createElement('div');
			div2.setAttribute('class', "header-cards2 card text-center p-3 experience");
			var p = document.createElement('p');
			p.setAttribute('class',"visually-hidden");
			div2.appendChild(p);
			var div3 = document.createElement('div');
			div3.setAttribute('class', "card-body");
			
			//The div for the images using carousel
			var divc = document.createElement('div');
			divc.setAttribute('id', exp_id);
			divc.setAttribute('class', 'carousel slide');
			divc.setAttribute('data-bs-ride', 'carousel');
			
			divci = document.createElement('div');
			divci.setAttribute('class', 'carousel-indicators');
			var photostr = cookies[10].split('@');
			if (cookies[10] != ''){
				//The amount of buttons of each type will be the amount of images
				//Create buttons for the 1 image
				var butt = document.createElement('button');
				butt.setAttribute('type', 'button');
				butt.setAttribute('data-bs-target', '#'+exp_id);
				butt.setAttribute('data-bs-slide-to', '0');
				butt.setAttribute('class', 'active');
				butt.setAttribute('aria-current', 'true');
				butt.setAttribute('aria-label', 'Slide 1');
				divci.appendChild(butt);
				//For the remaining images
				for (j=1; j < photostr.length-1; j++){
					var butt = document.createElement('button');
					butt.setAttribute('type', 'button');
					butt.setAttribute('data-bs-target', '#'+exp_id);
					butt.setAttribute('data-bs-slide-to', j);
					butt.setAttribute('class', '');
					divci.appendChild(butt);
				}
				divc.appendChild(divci);
				//Nowe we append the images (same explanation as the buttons)
				//First image
				var ci = document.createElement('div');
				ci.setAttribute('class', 'carousel-inner');
				var item = document.createElement('div');
				item.setAttribute('class', 'carousel-item active');
				var photo = "images/"+ photostr[0];
				var img = document.createElement("img");
				img.setAttribute("src", photo);
				img.setAttribute("class", "d-inline-block align-text-top img-fluid");
				item.appendChild(img);
				ci.appendChild(item);
				//Remaining images
				for (j=1; j < photostr.length-1; j++){
					var item = document.createElement('div');
					item.setAttribute('class', 'carousel-item');
					var photo = "images/"+ photostr[j];
					var img = document.createElement("img");
					img.setAttribute("src", photo);
					img.setAttribute("class", "d-inline-block align-text-top img-fluid");
					item.appendChild(img);
					ci.appendChild(item);
				}
				divc.appendChild(ci);
				//Create buttons prev and next for the images
				var butt = document.createElement('button');
				butt.setAttribute('type', 'button');
				butt.setAttribute('data-bs-target', '#'+exp_id);
				butt.setAttribute('data-bs-slide', 'prev');
				butt.setAttribute('class', 'carousel-control-prev');
				var span = document.createElement('span');
				span.setAttribute('aria-hidden',"true");
				span.setAttribute('class', 'carousel-control-prev-icon');
				butt.appendChild(span);
				var span = document.createElement('span');
				span.setAttribute('class', 'visually-hidden');
				span.appendChild(document.createTextNode('Previous'));
				butt.appendChild(span);
				divc.appendChild(butt);
				var butt = document.createElement('button');
				butt.setAttribute('type', 'button');
				butt.setAttribute('data-bs-target', '#'+exp_id);
				butt.setAttribute('data-bs-slide', 'next');
				butt.setAttribute('class', 'carousel-control-next');
				var span = document.createElement('span');
				span.setAttribute('aria-hidden',"true");
				span.setAttribute('class', 'carousel-control-next-icon');
				butt.appendChild(span);
				var span = document.createElement('span');
				span.setAttribute('class', 'visually-hidden');
				span.appendChild(document.createTextNode('Next'));
				butt.appendChild(span);
				divc.appendChild(butt);
				
				
				
			}
			div3.appendChild(divc);
			
			// Title 
			var tit = document.createElement("h5");
			tit.setAttribute("class", "card-title fbold margint name");
			var tit2 = document.createTextNode(title);
			tit.appendChild(tit2);
			div3.appendChild(tit);
			
			//More info (inside we have description, interests, leaving from, author, collaborator (if any) and collection (if any))
			var div4 = document.createElement('div');
			div4.setAttribute('class', "moreinfo");
			//Description
			var desc = document.createElement("p");
			var desct = document.createTextNode(description);
			desc.appendChild(desct);
			div4.appendChild(desc);
			//Budget
			var bud = document.createElement("p");
			bud.setAttribute('class', 'budget');
			var budt = document.createTextNode('Budget: ');
			bud.appendChild(budt);
			var budt = document.createTextNode(budget);
			bud.appendChild(budt);
			div4.appendChild(bud);
			//Interests: here we append to the p element all the interests
			var interests = document.createElement("p");
			interests.setAttribute('class', 'interest');
			var intt = document.createTextNode('Interests: ');
			interests.appendChild(intt);

			if (cultural == 'true'){
			var intt = document.createTextNode('Cultural ');
			interests.appendChild(intt);
			}
			if (historical == 'true'){
			var intt = document.createTextNode('Historical ');
			interests.appendChild(intt);
			}
			if (beach == 'true'){
			var intt = document.createTextNode('Beach ');
			interests.appendChild(intt);
			}
			if (mountain == 'true'){
			var intt = document.createTextNode('Mountain ');
			interests.appendChild(intt);
			}
			if (rural == 'true'){
			var intt = document.createTextNode('Rural ');
			interests.appendChild(intt);
			}
			if (business == 'true'){
			var intt = document.createTextNode('Business');
			interests.appendChild(intt);
			}

			div4.appendChild(interests);
			//Leaving from
			var lf = document.createElement("p");
			lf.setAttribute('class', 'leavingfrom');
			var lft = document.createTextNode('Leaving from: ');
			lf.appendChild(lft);
			var lft = document.createTextNode(leaving);
			lf.appendChild(lft);
			div4.appendChild(lf);
			// Author: if we have a collaborator we append to Owner: user this '& collaborator', 
			var c = document.createElement("p");
			c.setAttribute('class', 'author');
			
			var ct = document.createTextNode('Owner(s): ');
			c.appendChild(ct);
			var author = cookies[cookies.length-2];
			c.appendChild(document.createTextNode(cookies[cookies.length-2]));
			if (collaborator != '') {
				c.appendChild(document.createTextNode(' & '));
				c.appendChild(document.createTextNode(collaborator));
			}
			div4.appendChild(c);
			
			
			var collec = document.createElement("p");
			collec.setAttribute('class', 'collection');
			if (collection == ''){
				collec.setAttribute('class',"visually-hidden");
			}
			//Collection: if we haven't include a collection this part is hidden
			var collect = document.createTextNode('Collection: ');
			collec.appendChild(collect);
			var collect = document.createTextNode(collection);
			collec.appendChild(collect);
			div4.appendChild(collec);
			div3.appendChild(div4);
			// End of more info div
			
			//Read more 
			var read = document.createElement('a');
			read.setAttribute('class', "card-text readmore");
			read.setAttribute('onclick', "expandF()");
			var at = document.createTextNode('Read more');
			read.appendChild(at);
			div3.appendChild(read);
			
			var p = document.createElement('p');
			div3.appendChild(p);
			
			//Icons part
			//Likes with attributes
			var i1 = document.createElement('i');
			i1.setAttribute('class', "fa fa-heart-o emptyheart card-icons");
			i1.setAttribute('onclick', "likesF()");
			div3.appendChild(i1);
			var i2 = document.createElement('i');
			i2.setAttribute('class', "fa fa-heart fullheart card-icons");
			i2.setAttribute('style', 'display: none; color: red');
			i2.setAttribute('onclick', "unlikesF()");
			div3.appendChild(i2);
			//Amount of likes (stored in cookies)
			var i3 = document.createElement('i');
			var initial = document.createTextNode(cookies[cookies.length-1]);
			i3.setAttribute('class', 'likes');
			i3.appendChild(initial);
			div3.appendChild(i3);
			//Separation
			div3.appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0' ) );
			var i4 = document.createElement('i');
			//Coomments
			i4.setAttribute('class', "fa fa-comment-o card-icons");
			i4.setAttribute('onclick', "commentsF()");
			div3.appendChild(i4);
			//Separation
			div3.appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0' ) );
			//Share
			var i5 = document.createElement('i');
			i5.setAttribute('class', "fa fa-share-alt card-icons");
			i5.setAttribute('onclick', "shareF()");
			div3.appendChild(i5);
			var allCookies = document.cookie.split(";");
			
			for (m=0; m < allCookies.length; m++){
				if (allCookies[m].includes('logged_user')){
					var user = allCookies[m].split(',');
			}}
			var logged = false;
			if ( ((author == user[2]) || (collaborator == user[2]) )&& (user[2] != '')){ //If the logged user is the owner or collaborator of the experience, he/she can edit and delete it
			var logged = true;
			//Separation
			div3.appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0' ) );
			//Delete icon
			var i6 = document.createElement('i');
			i6.setAttribute('class', "fa fa-trash card-icons");
			i6.setAttribute('onclick', "deleteexpF()");
			div3.appendChild(i6);
			//Separation
			div3.appendChild( document.createTextNode( '\u00A0\u00A0\u00A0\u00A0' ) );
			//Edit icon
			var i7 = document.createElement('i');
			i7.setAttribute('class', "fa fa-edit card-icons");
			i7.setAttribute('onclick', "editexp("+"\""+String(exp_id)+"\""+")");
			div3.appendChild(i7);
			}
			
			//Append everything on the main div
			div2.appendChild(div3);
			var p = document.createElement('p');
			p.setAttribute('class',"visually-hidden");
			div2.appendChild(p);
			div1.appendChild(div2);
			var father = document.getElementById('principal');
			if ((!URLactual.includes("myexperiences.html")) || (logged)){
			father.appendChild(div1);}
		
			}
		}
	}
});

// SIGN UP
// Clear form fields when delete button is pressed
$("#delete-btn").click(function(event) {
     $("#signup-form")[0].reset();
});

// Save elements when save button is pressed
$("#save-btn").click(function(){

  var email = $("#email").val();
  var username = $("#user-name").val();
  var password = $("#pass-word").val();
  var profile_img = $("#profile-img").val();
  var num_experiences = 0;
  var num_likes = 0;

  // if an image is not provided set default
  if (profile_img == ""){
    profile_img = "images/profile_img.png";
  }
  else{
    profile_img = "images/"+profile_img.slice(11);
  }

  //Check that required data is filled
  var required_ok = true;
  if (email=="" || username=="" || password==""){
    required_ok = false;
  }

  // store form data in a string
  var data = username + "," + password + "," + email + "," + profile_img + "," + num_experiences + "," + num_likes;

  // if there are no cookies (no registered users) do not look for them
  try{
    var allCookies = document.cookie.split(";");
    var already_registered = false;

    // check if the email is already registered
    for (current_cookie of allCookies){
      if ((current_cookie.split("=")[1].split(",")[2])==email){
        already_registered = true;
      }  
    }
  }
  catch (error){
    var already_registered = false;
  }

  // if the email is not registered and data is filled, create a new cookie
  if (already_registered==false){
    if (required_ok==true){
      setCookie(email, data, 1000);
    }
  }
  else{
    return false;
  }

});

// MY PROFILE POPUP BUTTONS

//Open my profile
document.querySelector("#open-profile").addEventListener("click", function(){
  document.querySelector(".popup-profile").classList.add("show");

  $("#profile-username").val(String(logged_user[0]));
  $("#profile-password").val(String(logged_user[1]));
  $("#profile-email").val(String(logged_user[2]));
  $("#profile-picture").val(String(logged_user[3]));

});
//Open my profile in mobile
document.querySelector("#open-profile-mb").addEventListener("click", function(){
  document.querySelector(".popup-profile").classList.add("show");

  $("#profile-username").val(String(logged_user[0]));
  $("#profile-password").val(String(logged_user[1]));
  $("#profile-email").val(String(logged_user[2]));
  $("#profile-picture").val(String(logged_user[3]));

});

//Update profile
document.querySelector("#update-btn").addEventListener("click", function(){
  document.querySelector(".popup-profile").classList.remove("show");

  var email = $("#profile-email").val();
  var username = $("#profile-username").val();
  var password = $("#profile-password").val();
  var profile_img = $("#profile-picture").val();

  // if optional data is not provided use the previous values
  if (profile_img == ""){
    profile_img = logged_user[3];
  }
  else{
    // correct path of the image (changing C:/fakepath/ by images/)
    profile_img = "images/"+profile_img.slice(11);
  }

  // check that required data is filled
  var required_ok = true;
  if (email=="" || username=="" || password==""){
    required_ok = false;
  }
  
  // store form data in a string
  var data = username + "," + password + "," + email + "," + profile_img  + "," + logged_user[4]+ "," + logged_user[5];

  var allCookies = document.cookie.split(";");
  var already_registered = false;

  // update profile img and cookie
  document.getElementById("profile-img-icon").src = profile_img;
  setCookie(email, data, 1000);

  // update information about the logged user
  setCookie("logged_user", data, 1000);
  // set user image and name
  document.getElementById("profile-img-icon").src = profile_img;
  document.getElementById("profile-names").innerHTML="Hi " + username + "  &#8205";

});

//Close my profile
document.querySelector("#close-profile").addEventListener("click", function(){
  document.querySelector(".popup-profile").classList.remove("show");
});

// Request login
$("#request-login").click(function(){

  var email = $("#username-email").val();
  var password = $("#password").val();


  //Check that required data is filled
  var required_ok = true;
  if (email=="" || password==""){
    required_ok = false;
  }
  
  // if there are no cookies an error raise
  try{
    var allCookies = document.cookie.split(";");
    var correct_user = false;

    // check if the email is already registered
    for (current_cookie of allCookies){
      var current_user = current_cookie.split("=")[1].split(",");
      if ((current_user[2]==email) && (current_user[1]==password)){
        correct_user = true;
      }  
    }
  }
  // if there are no cookies set the user as incorrect
  catch (error){
    var correct_user = false;
  }

  // if the email is not registered and data is filled, create a new cookie
  if (required_ok==true){
    if (correct_user==true){
      login_compared(email);
    }
    else{
      document.getElementById("invalid-login").style.display="block";
    }
  }
  return false;
});

// Log out
$("#logout").click(function(){
  // delete the logged user
  logged_user=""
  setCookie("logged_user", "", 1000);
  var URLactual = window.location.toString();
  var chat = URLactual.includes("chat.html");
  var myexp = URLactual.includes("myexperiences.html");
  if (chat){
	  window.location = 'index.html';
  }
  if (myexp){
	  window.location = 'index.html';
  }
  // set user image and name
  document.getElementById("user-area").style.display="none ";

  //hide menu
  document.querySelector(".user-mobile-nav").classList.remove("show");

});
// Log out mobile
$("#logout-mb").click(function(){
  // delete the logged user
  logged_user=""
  setCookie("logged_user", "", 1000);
  var URLactual = window.location.toString();
  var chat = URLactual.includes("chat.html");
  var myexp = URLactual.includes("myexperiences.html");
  if (chat){
	  window.location = 'index.html';
  }
  if (myexp){
	  window.location = 'index.html';
  }
	
  // set user image and name
  document.getElementById("user-area").style.display="none ";

  //hide menu
  document.querySelector(".user-mobile-nav").classList.remove("show");

});


/* SEARCH AN EXPERIENCE */

function searchF(){
	var filter = document.getElementById("searchexpb").value;
	var input = document.getElementById("searchexp").value.toLowerCase();
	var grids = document.getElementsByClassName("card-item");
	var counter = 0;
	
	//We hide de alert  (if it is displayed)
	var alertdiv = document.getElementsByClassName('alert-danger');
	alertdiv[0].style.display = 'none';
	
	if (filter == 'All'){
	for (i=0; i < grids.length; i++){
		var txt = grids[i].textContent || grids[i].innerText;
		if (txt.toLowerCase().indexOf(input) > -1) {
                    grids[i].style.display = "block";
                } 
		else {
                    grids[i].style.display = "none";
					counter++
                } 
	}}
	else {
		var filter_elem = document.getElementsByClassName(filter);
		for (i=0; i < grids.length; i++){
			var innerhtml = filter_elem[i].innerHTML.toLowerCase();

		if (innerhtml.includes(input)) {
                    grids[i].style.display = "block";
                } 
		else {
                    grids[i].style.display = "none";
					counter++
	}}}
	if (counter == grids.length){
	    var alertdiv = document.getElementsByClassName('alert-danger');
	    alertdiv[0].style.display = 'block';
	}
};

function closealertF(){
	var alertdiv = document.getElementsByClassName('alert-danger');
	alertdiv[0].style.display= 'none';
}

function expandF(){
	var actual = event.srcElement;
	actual.style.display = "none";
	var father = actual.parentNode;
	var info = document.getElementsByClassName("moreinfo");
	for (i=0; i < info.length; i++){
		if (info[i].parentNode == father){
			info[i].style.display = "block";
			}
	}
	document.querySelector(".popup-exp").classList.add("show");
	var exp = document.getElementById("exp-form");
	exp.appendChild(father);
};


//Close exp
document.querySelector("#close-exp").addEventListener("click", function(){
	var exp = document.getElementById("exp-form");
	var card = document.getElementsByClassName("experience");
	for (i=0; i < card.length; i++){
		if (card[i].childNodes.length < 3 ){
		card[i].appendChild(exp.childNodes[1]);
		document.getElementsByClassName("moreinfo")[i].style.display = 'none';
		document.getElementsByClassName("readmore")[i].style.display = 'inline';
	}}
	document.querySelector(".popup-exp").classList.remove("show");
});

function closeexpF(){
	var exp = document.getElementById("exp-form");
	var card = document.getElementsByClassName("experience");
	
	for (i=0; i < card.length; i++){
		var chil = card[i].childNodes;	
		if (card[i].childNodes.length < 3 ){
		card[i].appendChild(exp.childNodes[1]);
		document.getElementsByClassName("moreinfo")[i].style.display = 'none';
		document.getElementsByClassName("readmore")[i].style.display = 'inline';
	}}
	
	document.querySelector(".popup-exp").classList.remove("show");
	
};

/* TRIP PLANNING */

function likesF(){
	var guest = document.getElementById("guest").style.display;
	if (guest != "none"){
		var emptyh = document.getElementsByClassName("emptyheart");
		for (i=0; i < emptyh.length; i++){
			if (emptyh[i] == event.srcElement){
				emptyh[i].style.display = "none";
				document.getElementsByClassName("fullheart")[i].style.display = "inline";
				document.getElementsByClassName('likes')[i].innerHTML =  parseInt(document.getElementsByClassName('likes')[i].innerHTML) + 1;
				var author = document.getElementsByClassName('author')[i];
				var author = author.innerHTML.split(' ');
				var cardbody = document.getElementsByClassName('card-body')[i+1];
				var experience = cardbody.childNodes[0].id;
				/*var parent = document.getElementsByClassName("emptyheart")[i].parentNode;
				var loggeduser= false;
				for (j = 0; j < parent.childNodes.length; j++){
					if (parent.childNodes[j].className == "fa fa-trash"){
					var loggeduser = true;}
				}*/
		}}
		
		var allCookies = document.cookie.split(";");
		for (i=0; i < allCookies.length; i++){
				
				var user = allCookies[i].split('=');
				var author1 = author[1];
				if (user[0][0] == ' '){
					var author1 = ' ' + author[1]; 
				}

				if (user[0] == author1){
					var data = allCookies[i].split('=');
					var cookies = data[1].split(',');
				}
		}
		var likes = parseInt(cookies[5]) + 1;
		var cookies = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	cookies[4] + ',' + likes;
		setCookie(data[0], cookies, 1000);
		
		if (experience.includes('exp_')){ //If the experience is stored in cookies, update the likes
			
			var allCookies = document.cookie.split(";");
			for (i=0; i < allCookies.length; i++){
				cookies = allCookies[i].split('=');
				if (cookies[0] == experience){
					var data = cookies[1];
				}
			}
			var cookies = data.split(',');

			var likes = parseInt(cookies[14]) + 1;

			var data = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	cookies[4] + ',' + cookies[5] + ',' + cookies[6] + ',' + cookies[7] + ',' + cookies[8] + ',' + cookies[9] + ',' + cookies[10] + ',' +cookies[11] + ',' + cookies[12] + ',' +cookies[13] + ',' + likes;
			setCookie(experience, data, 1000);
		}
		
}
	else {
		document.querySelector(".popup-login").classList.add("show");		
	}
};

function unlikesF(){
	var fullh = document.getElementsByClassName("fullheart");
		for (i=0; i < fullh.length; i++){
			if (fullh[i] == event.srcElement){
				fullh[i].style.display = "none";
				document.getElementsByClassName("emptyheart")[i].style.display = "inline";
				document.getElementsByClassName('likes')[i].innerHTML =  parseInt(document.getElementsByClassName('likes')[i].innerHTML) - 1;
				var author = document.getElementsByClassName('author')[i];
				var author = author.innerHTML.split(' ');
				var cardbody = document.getElementsByClassName('card-body')[i+1];
				var experience = cardbody.childNodes[0].id;
				/*var parent = document.getElementsByClassName("emptyheart")[i].parentNode;
				var loggeduser= false;
				for (j = 0; j < parent.childNodes.length; j++){
					if (parent.childNodes[j].className == "fa fa-trash"){
					var loggeduser = true;}
				}*/
		}}
		
		var allCookies = document.cookie.split(";");
		for (i=0; i < allCookies.length; i++){
				
				var user = allCookies[i].split('=');
				var author1 = author[1];
				if (user[0][0] == ' '){
					var author1 = ' ' + author[1]; 
				}

				if (user[0] == author1){
					var data = allCookies[i].split('=');
					var cookies = data[1].split(',');
				}
		}
		var likes = parseInt(cookies[5]) - 1;
		var cookies = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	cookies[4] + ',' + likes;
		setCookie(data[0], cookies, 1000);
		

		if (experience.includes('exp_')){ //If the experience is stored in cookies, update the likes
			
			var allCookies = document.cookie.split(";");
			for (i=0; i < allCookies.length; i++){
				cookies = allCookies[i].split('=');
				if (cookies[0] == experience){
					var data = cookies[1];
				}
			}
			var cookies = data.split(',');

			var likes = parseInt(cookies[14]) - 1;

			var data = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	cookies[4] + ',' + cookies[5] + ',' + cookies[6] + ',' + cookies[7] + ',' + cookies[8] + ',' + cookies[9] + ',' + cookies[10] + ',' +cookies[11] + ',' + cookies[12] + ',' +cookies[13] + ',' + likes;
			setCookie(experience, data, 1000);
		}
};

function commentsF(){
	var guest = document.getElementById("guest").style.display;
	if (guest == "none"){
		alert("popup experiences");
	}
	else {
		document.querySelector(".popup-login").classList.add("show");	
	}
};

function shareF(){
	var guest = document.getElementById("guest").style.display;
	if (guest == "none"){
		alert("popup share");
	}
	else {
		document.querySelector(".popup-login").classList.add("show");		
	}
};

function searchTripF(){
	
	var budget = document.getElementById("budget").value;
	var interest = document.getElementById("interest").value;
	var leavingfrom = document.getElementById("leavingfrom").value.toLowerCase();
	var grids = document.getElementsByClassName("card-item");
	var counter = 0;
	//We hide de alert  (if it is displayed)
	var alertdiv = document.getElementsByClassName('alert-danger');
	alertdiv[0].style.display = 'none';
	//Display all the experiences
	for (i=0; i < grids.length; i++){
        grids[i].style.display = "block";
    } 
	//If budget is not All, we filter and display only the experiences with that specific budget
	if (budget != 'All'){
		var filter_elem = document.getElementsByClassName('budget');
		for (i=0; i < grids.length; i++){
		if (!filter_elem[i].innerHTML.includes(budget)) {
                    grids[i].style.display = "none";
					counter++;
	}}}
	//After the budget filter, we display (taking only the resulting experiences from the first filter) only the experiences with that specific interest 
	if (interest != 'All'){
		var filter_elem = document.getElementsByClassName('interest');
		for (i=0; i < grids.length; i++){
		if ((!filter_elem[i].innerHTML.toLowerCase().includes(interest))&& (grids[i].style.display == "block")) {
                    grids[i].style.display = "none";
					counter++;
	}}}
	//Filter from leaving from
	if (leavingfrom != ''){
		var filter_elem = document.getElementsByClassName('leavingfrom');
		for (i=0; i < grids.length; i++){
		if ((!filter_elem[i].innerHTML.toLowerCase().includes(leavingfrom))&& (grids[i].style.display == "block")) {
                    grids[i].style.display = "none";
					counter++;
	}}}

	//If any experience matches with the filters, we display all the experiences and an alerts saying that there wasm`t any coincidence
	if (counter == grids.length){
	    var alertdiv = document.getElementsByClassName('alert-danger');
	    alertdiv[0].style.display = 'block';
	}
};

/* USERS */
function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}


/* CREATE EXPERIENCES */

function addExpF(){
  
  var title = document.getElementById('experience-title').value;
  var description = document.getElementById('experience-text').value;
  var budget = document.getElementById('experience-budget').value;
  var cultural = document.getElementById('cultural-tag').checked;
  var historical = document.getElementById('historical-tag').checked;
  var beach = document.getElementById('beach-tag').checked;
  var mountain = document.getElementById('mountain-tag').checked;
  var rural = document.getElementById('rural-tag').checked;
  var business = document.getElementById('business-tag').checked;
  var leaving = document.getElementById('experience-leavingfrom').value;
  var images_array = document.getElementById('experience-img').files;
  var images = "";
  //store all images in an array
  for (image of images_array){
    images = images + image.name + "@";
  }
  var collection = document.getElementById('experience-collection').value;
  var collaborator = document.getElementById('experience-collaborator').value;
  var author = logged_user[2];
  var likes = 0;

  var data =  title + "," + description + "," + budget + "," + cultural + "," 
        + historical + "," + beach + "," + mountain + "," + rural + "," + business 
        + "," + leaving + "," + images + "," + collaborator + "," + collection + "," + author + "," + likes;
  var exp_id = "exp_" + title;

  //create a cookie with the info of the experience
  setCookie(exp_id, data, 1000);

	//retrieve the data of the creator of the experience
	var allCookies = document.cookie.split(";");
		for (i=0; i < allCookies.length; i++){
				
				var user = allCookies[i].split('=');
				if (user[0][0] == ' '){
					var author = ' ' + author; 
				}
				
				if (author.includes(user[0])){
					var data = allCookies[i].split('=');
					var cookies = data[1].split(',');
				}
		}
		

	//update user data after inserting the experience (update number of experiences)
	var exp = parseInt(cookies[4]) +1;
	var datauser = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	exp + ',' + cookies[5];
	setCookie(data[0], datauser, 1000);
	
	

  //clear fields of the form
  $("#experiences-form")[0].reset();

  //close the popup
  document.querySelector(".popup-addexperience").classList.remove("show");

  //reload the page to print the new experience
  location.reload();
  window.location = 'myexperiences.html';

};

//return an array of arrays contianing the information of each experience
function returnExp(){
  
  var allCookies = document.cookie.split("; ");
  var all_experiences = [];

  // store all experience cookies in an array 
  for (current_cookie of allCookies){
    //if the name of the cookie starts with "exp_", it is an experience
    if (current_cookie.split("=")[0].slice(0,4)=="exp_"){
      data = current_cookie.split("=")[1].split(",");
      all_experiences.push(data);
    }
  }

  return all_experiences;
};

//delete the experience that calls it
function deleteexpF(){

	var icon = event.srcElement;
	var parent = icon.parentNode;
	var carousel = parent.childNodes[0].id;
	
	//retrieve the data of the experience to be deleted
	var allCookies = document.cookie.split(";");
	for (i=0; i < allCookies.length; i++){
		if (allCookies[i].includes('logged_user')){
			var data = allCookies[i].split('=');
			var datae = data[1].split(',');
		}
	}
	//delete the data of the cookie
	setCookie(carousel,"",-1);

	//retrieve the data of the creator of the experience
	var allCookies = document.cookie.split(";");
	for (i=0; i < allCookies.length; i++){
		if (allCookies[i].includes('logged_user')){
			var data = allCookies[i].split('=');
			var cookies = data[1].split(',');
		}
	}

	//update user data after deleting the experience (update likes and number of experiences)
	var exp = parseInt(cookies[cookies.length - 2]) -1;
	var likes = parseInt(cookies[cookies.length - 1]) - parseInt(datae[datae.length - 1]);
	var data = cookies[0] + ',' + cookies[1] + ',' + cookies[2] + ',' + cookies[3] + ',' +	exp + ',' + likes;
	setCookie('logged_user', data, 1000);
	
	
	var parent = parent.parentNode;
	var parent = parent.parentNode;
	parent.style.display = "none";
};


//Open add experience
document.querySelector("#add-experience").addEventListener("click", function(){
  document.querySelector(".popup-addexperience").classList.add("show");
});
//Close add experience
document.querySelector("#close-addexperience").addEventListener("click", function(){
  document.querySelector(".popup-addexperience").classList.remove("show");
});

//Close edit experience
document.querySelector("#close-editexperience").addEventListener("click", function(){
  document.querySelector(".popup-editexperience").classList.remove("show");
});

function editexp(exp_id){
	//open pop up
	document.querySelector(".popup-editexperience").classList.add("show");
	
	//retrieve data from the experience to be edited
	for (i=0; i < allCookies.length; i++){
		if (allCookies[i].includes(exp_id)){
			var data = allCookies[i].split('=');
			data = data[1].split(',');
		}
	}

	//set previous values in the form
	$("#edit-experience-title").val(String(data[0]));
	$("#edit-experience-text").val(String(data[1]));
	$("#edit-experience-budget").val(String(data[2]));
	$("#edit-cultural-tag").prop("checked",data[3]==="true");
	$("#edit-historical-tag").prop("checked",data[4]==="true");
	$("#edit-beach-tag").prop("checked",data[5]==="true");
	$("#edit-mountain-tag").prop("checked",data[6]==="true");
	$("#edit-rural-tag").prop("checked",data[7]==="true");
	$("#edit-business-tag").prop("checked",data[8]==="true");
	$("#edit-experience-leavingfrom").val(String(data[9]));
	$("#edit-experience-collaborator").val(String(data[11]));
	$("#edit-experience-collection").val(String(data[12]));
	
};

//Update experience
function updateExp(){

	var title = document.getElementById('edit-experience-title').value;
	var exp_id = "exp_"+title;

	//retrieve data from the experience to be edited
	for (i=0; i < allCookies.length; i++){
		if (allCookies[i].includes(exp_id)){
			var exp_data = allCookies[i].split('=');
			exp_data = exp_data[1].split(',');
		}
	}

  	var description = document.getElementById('edit-experience-text').value;
  	var budget = document.getElementById('edit-experience-budget').value;
  	var cultural = document.getElementById('edit-cultural-tag').checked;
  	var historical = document.getElementById('edit-historical-tag').checked;
  	var beach = document.getElementById('edit-beach-tag').checked;
  	var mountain = document.getElementById('edit-mountain-tag').checked;
  	var rural = document.getElementById('edit-rural-tag').checked;
  	var business = document.getElementById('edit-business-tag').checked;
  	var leaving = document.getElementById('edit-experience-leavingfrom').value;
  	var images_array = document.getElementById('edit-experience-img').files;
  	// if the user has selected image/s, update them
  	if (images_array[0] != undefined){
	  	var images = "";
	  	//store all images in an array
	  	for (image of images_array){
	  	  images = images + image.name + "@";
	  	}
	}
	// if not, use the previous ones
	else{
		images = exp_data[10];
	}

  	var collection = document.getElementById('experience-collection').value;
  	var collaborator = document.getElementById('experience-collaborator').value;
  	var user = logged_user[2];
  	var likes = 0;
	
  	var data =  title + "," + description + "," + budget + "," + cultural + "," 
  	      + historical + "," + beach + "," + mountain + "," + rural + "," + business 
  	      + "," + leaving + "," + images + "," + collaborator + "," + collection + "," + user + "," + likes;
	
  	//create a cookie with the info of the experience (it will repalce the previous one)
  	setCookie(exp_id, data, 1000);
	
  	//clear fields of the form
  	$("#experiences-form")[0].reset();
	
  	//close the popup
  	document.querySelector(".popup-editexperience").classList.remove("show");
	
  	//reload the page to update the new experience
  	location.reload();
};

// COLLECTIONS 
function searchbyCollection(filter){
	var filter = filter.toLowerCase();
	var collection = document.getElementsByClassName('collection');
	var grids = document.getElementsByClassName("card-item");
	for (i=0; i < grids.length; i++){ //Display all the blocks
			grids[i].style.display = "block";
		}
	var counter = 0;
	if (filter != 'all'){
	for (i=0; i < grids.length; i++){
		var collectionhtml = collection[i].innerHTML;
		if (collectionhtml.includes(filter)) {
                    grids[i].style.display = "block";
                } 
		else {
                    grids[i].style.display = "none";
					counter++
                } 
	}
	if (counter == grids.length){
		for (i=0; i < grids.length; i++){ //Display all the blocks
			grids[i].style.display = "block";
		}
	}}
}
