var topics = ["cat", "grumpy cat", "dog", "monkey", "rabbit", "panda", "shark", "penguin", "turtle", "seal", "jellyfish", "kangaroo", "sloth", "duck", "pig", "deer", "mouse", "cheetah", "zebra", "polar bear"];

function renderButtons(){
	//emptying previous buttons so there are no repeats
	$("#animal-buttons").empty();

	for (var i = 0; i < topics.length; i++){
		var a = $("<button class='btn bnt-default'>");
		a.html(topics[i]);
		a.addClass("gif-button");
		a.attr("data-name", topics[i]);
		$("#animal-buttons").append(a);
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
		
			gif.attr("src", results[i].images.fixed_height_still.url);
			gif.attr("data-still", results[i].images.fixed_height_still.url);
			gif.attr("data-animate", results[i].images.fixed_height.url);
			gif.attr("data-state", "still");
			gif.addClass("gif");

			gifDiv.prepend(gif);
			$("#gif-images").prepend(gifDiv);
		}
	});
}

$("#add-animal").click(function(event){
	event.preventDefault();
	var search = $("#animal-input").val().trim();
	topics.push(search);
	renderButtons();
	$("#animal-input").val("");
});

function animateGifs(){
		$(".gif").click(function(){
			var state = $(this).attr("data-state");

			if(state === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			} else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		});
	}





// $(".gif-button").click(function(){
// 	displayGifs();
// })
renderButtons();

$(document).on("click", ".gif-button", displayGifs);
$(document).on("click", "img", animateGifs);