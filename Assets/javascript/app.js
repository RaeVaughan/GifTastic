var topics = ["cat", "grumpy cat", "dog", "monkey", "rabbit", "panda", "shark", "penguin", "turtle", "seal", "jellyfish", "kangaroo", "sloth", "duck", "pig", "deer", "mouse", "cheetah", "zebra", "polar bear"];

function renderButtons(){
	//emptying previous buttons so there are no repeats
	$("#animal-buttons").empty();

	for (var i = 0; i < topics.length; i++){
		var button = $("<button>");
		button.html(topics[i]);
		button.addClass("gif-button");
		button.attr("data-name", topics[i]);
		$("#animal-buttons").append(button);
	}
}

function displayGifs(){
	var animal = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		
		var results = response.data;

		for (var i = 0; i < results.length; i++){
			var gifDiv = $("<div>");
			var gif = $("<img>");
			//you'll need fixed_height_still.url later
			gif.attr("src", results[i].images.original.url);

			gifDiv.append(gif);
			$("#gif-images").prepend(gifDiv);
		}
		
	});
}
$(document).on("click", ".gif-button", displayGifs);
// $(".gif-button").click(function(){
// 	displayGifs();
// })

renderButtons();