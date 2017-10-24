$(document).ready(function() {

	loadNotes();


	function loadNotes() {
		$.get('/note', function(allNotes) {
			$("#wall").empty();

			console.log(allNotes);

			allNotes.forEach(function(note) {
				var h3 = $("<h3>").addClass("note-name").text(note.name);
				var p = $("<p>").addClass("note-msg").text(note.message);
				var noteDiv = $("<div>").addClass('note-wrapper').append(h3).append(p);

				$("#wall").append(noteDiv);
			});
		});
	}

});