
$(document).ready(function () {
	


	$('#files').addEventListener('change', handleFileSelect, false);
	
});
 

 function downloadEnd(e) {
document.all.download.value=e;
}


function handleFileSelect(evt) {
	alert("parsing the file bro");
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }