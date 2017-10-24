$(document).ready(function() {

	//After page loads,
	//request the existing notes,
	//and add them to the page.
	loadNotes();
});

function loadNotes() {

	//asynchronous GET request to the API route,
	//the server responds with an array containing Note objects.
	$.get('/note', function(allNotes) {
		$("#wall").empty();

		console.log(allNotes);

		allNotes.forEach(function(note) {

			//for each note object in the array
			//build a div, with the name inside an h3,
			//and the message inside a paragraph.
			var h3 = $("<h3>").addClass("note-name").text(note.name);
			var p = $("<p>").addClass("note-msg").text(note.msg);
			var noteDiv = $("<div>").addClass('note-wrapper').append(h3).append(p);

			//add this div to the DOM, inside the div with the id="wall"
			$("#wall").append(noteDiv);
		});
	});
}
