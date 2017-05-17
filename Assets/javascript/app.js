var topics = ["cat", "grumpy cat", "dog", "monkey", "rabbit", "panda", "shark", "penguin", "turtle", "seal", "jellyfish", "kangaroo", "sloth", "duck", "pig", "deer", "mouse", "cheetah", "zebra", "polar bear"];

function renderButtons(){
	//emptying previous buttons so there are no repeats
	$("#animal-buttons").empty();

	for (var i = 0; i < topics.length; i++){
		var button = $("<button>");
		button.html(topics[i]);
		button.addClass("gif-button");
		//button.attr("data-name", topics[i]);
		$("#animal-buttons").append(button);
	}
}

function displayGifs(){
	var animal = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		var imageDiv = $("<div>");
		console.log(response);



	});
}

renderButtons();