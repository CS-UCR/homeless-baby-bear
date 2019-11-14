const onPicDropDiv = document.querySelector(".on-pic-drop");

// call initialization file
if (window.File && window.FileList && window.FileReader) {
	Init();
}

//
// initialize
function Init() {

	var fileselect = getID("fileselect"),
		filedrag = getID("filedrag"),
		submitbutton = getID("submitbutton");

	// file select
	fileselect.addEventListener("change", FileSelectHandler, false);

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {
	
		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.display = "block";
		
		// remove submit button
		submitbutton.style.display = "none";
	}

}

// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

	// process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		ParseFile(f);
	}

	onPicDropDiv.style.display = "block";
}

function ParseFile(file) {

	

	output(
		"<p>File information: <strong>" + file.name +
		"</strong> type: <strong>" + file.type +
		"</strong> size: <strong>" + formatBytes(file.size) +
		"</strong></p>"
	);
	
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getID(id) {
	return document.getElementById(id);
}

function output(msg) {
	var m = getID("messages");
	m.innerHTML = msg + m.innerHTML;
}
