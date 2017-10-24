$(document).ready(function() {

	//After page loads,
	//request the existing notes,
	//and add them to the page.
	loadNotes();

	//When user clicks Submit button
	$("#addNote").on("click", function(e) {

		//prevent page refresh
		e.preventDefault();

		//Construct a Note object,
		//instantiating the Object's properties using
		//the user's input from the form
		var newNote = {
			name : $("#name").val().trim(),
			msg : $("#msg").val().trim()
		};
		console.log(newNote.name);
		console.log(newNote.msg);

		//Client-side Validation
		//Verify that none of the required values are left blank.
		if(newNote.name === undefined || newNote.name === "") {
			alert("Name cannot be left empty.");
			return false;
		}
		else if(newNote.msg === undefined || newNote.msg === "") {
			alert("Note cannot be left empty.");
			return false;
		}

		//Use AJAX to make a POST request to the API route
		//sending the Note object in the body of the request.
		$.post('/note', newNote, function(data, textStatus, xhr) {
			console.log(data);
			console.log(textStatus);

			if(data.error === true) {
				//server-side error
				//display message to user
			}
			else {
				//success
				$("#new-note-form").hide();
				loadNotes();
			}
		});

	});//end on-click

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
