var expand = true;
var displaySpeed = 350;

$(document).ready(function(){
	
	//Search Box trigger
	$('#search').keyup(function() {
		SearchResults($(this).val());
	});
	
	//Add attributes to each allele
	$('.uniqueGene').each(function(index) {
		var sequenceTextContainer = $(this).find(".seqText");
		var sequenceText = cleanSequence(sequenceTextContainer.text());
		var seqCanvas = document.getElementById("seqCanvas" + index);
		var canvasContainer = $(this).find(".seqCanvas");
		
		//hide the sequence to start
		sequenceTextContainer.hide();
		
		//Expandable Sections
		AddSlideyness($(this), false, displaySpeed);
		
		//Render the sequence canvas
		renderSequenceCanvas(seqCanvas, sequenceText);
		$(this).find(".seqText").html(colorCodeSequence(sequenceText));
		
		//Add sequence expansion on hover
		canvasContainer.click(function(){
			sequenceTextContainer.slideToggle(displaySpeed);
		});

		/*
		//Allows user to easily select the sequence text
		sequenceContainer.click(function(){
			$(this).selText();
		});
		*/
	});
	
	//Expand/Collaspe all button
	$("#expandBtn").click(function(){
		$('.uniqueGene').each(function(index) {
			var target = $(this).find(".collapsedContent");
			if(expand){
				target.slideDown(displaySpeed);
			} else{
				target.slideUp(displaySpeed);
			}
		});
		expand = !expand;
	});
});

function SearchResults(searchItem){
	$('.uniqueGene').each(function(index) {
		if(	$(this).find(".sampleNames").text().indexOf(searchItem) != -1 ||
			$(this).find(".seqText").text().indexOf(searchItem) != -1){
				$(this).show();
		}else if(searchItem != ""){
			$(this).hide();
		}
	});
}

function AddSlideyness(container,show,delay){
	var trigger = container.find(".titleCard");
	var target = container.find(".collapsedContent");
	if(show==false){ target.hide(); }
	delay = delay || 500 //default value of 500 milliseconds
	trigger.css('cursor', 'pointer');
	trigger.click(function() {
		target.slideToggle(delay);
	});
}

//Converts the given sequence into a pretty image
function renderSequenceCanvas(canvas, sequence){
	var ctx=canvas.getContext("2d");
	
	var canvasWidth = 450;
	var width = canvasWidth / sequence.length;
	var height = 15;
	var i = 0;
	
	//ctx.fillStyle="rgb(200,0,200)";
	
	for (var i = 0; i < sequence.length; i++) {
		var code = sequence.charAt(i);
		if(code == "A") ctx.fillStyle="rgb(0,120,44)";
		else if(code == "T") ctx.fillStyle="rgb(171,0,0)";
		else if(code == "G") ctx.fillStyle="rgb(0,0,0)";
		else if(code == "C") ctx.fillStyle="rgb(16,33,161)";
		else if(code == "n") ctx.fillStyle="rgb(255,83,13)";
		else ctx.fillStyle="rgb(200,200,200)";
		ctx.fillRect(i*width,0, width, height);
	}
}

function cleanSequence(sequence){
	var result = "";
	var template = "ACTGn ";
	for(var i = 0; i < sequence.length; i++) {
		var code = sequence[i];
		if(template.indexOf(code) != -1){
			result += code;
		}
	}
	return result;
}

function colorCodeSequence(sequence){
	var result = "";
	result = sequence	.replace(new RegExp("n", 'g'),"<span class='ncode'>n</span>")
						.replace(new RegExp("A", 'g'),"<span class='Acode'>A</span>")
						.replace(new RegExp("C", 'g'),"<span class='Ccode'>C</span>")
						.replace(new RegExp("G", 'g'),"<span class='Gcode'>G</span>")
						.replace(new RegExp("T", 'g'),"<span class='Tcode'>T</span>");
	return result;
}



		
		
		
