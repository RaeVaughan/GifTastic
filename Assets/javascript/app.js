//array of topics that will prepopulate row of buttons
var topics = ["cat", "grumpy cat", "dog", "monkey", "rabbit", "panda", "shark", "penguin", "turtle", "seal", "jellyfish", "kangaroo", "sloth", "duck", "pig", "deer", "mouse", "cheetah", "zebra", "polar bear"];

//function to render the array as buttons, call function below
function renderButtons(){
	//emptying previous buttons so there are no repeats
	$("#animal-buttons").empty();

	//loops through array and adds button, class, and data attribute per button, and appends
	for (var i = 0; i < topics.length; i++){
		var a = $("<button class='btn btn-default'>");
		a.html(topics[i]);
		a.addClass("gif-button");
		a.attr("data-name", topics[i]);
		$("#animal-buttons").append(a);
	}
}

//function to display gifs
function displayGifs(){
	var animal = $(this).attr("data-name");
	//sets variable to be random number so that query url can pick a random page, enabling different gifs to appear
	var number = Math.floor(Math.random()*101);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + number; 

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		
		var results = response.data;

		//loops through results to create div each image will go in and image tags
		for (var i = 0; i < results.length; i++){
			var gifDiv = $("<div>");
			var gif = $("<img>");
		
			//gifs start still but are given all data attributes necessary to animate
			gif.attr("src", results[i].images.fixed_height_still.url);
			gif.attr("data-still", results[i].images.fixed_height_still.url);
			gif.attr("data-animate", results[i].images.fixed_height.url);
			gif.attr("data-state", "still");
			gif.addClass("gif");

			//prepending gifs inside the gifDiv, then each image inside that div
			gifDiv.prepend(gif);
			$("#gif-images").prepend(gifDiv);
		}
	});
}

//function to add an animal from text box on click of submit button
$("#add-animal").click(function(event){
	event.preventDefault();
	//takes value from text box, trims it, saves it to variable
	var search = $("#animal-input").val().trim();
	//pushes that variable to the original topics array
	topics.push(search);
	//recalls function to render buttons so that new animal from search box appears as button
	renderButtons();
	//empties text box
	$("#animal-input").val("");
});

//function to animate the gifs (click called below in document.on("click"))
function animateGifs(){
	var state = $(this).attr("data-state");

	//if the state, on click, is still, change the src and data-state to animate; if not, change both to still
	if(state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}
	
//calls function to render buttons
renderButtons();

//allows clicks for dynamically generated things
$(document).on("click", ".gif-button", displayGifs);
$(document).on("click", "img", animateGifs);