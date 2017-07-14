function quiz(question, choices, correctIndex) {
	this.question = question;
	this.choices = choices;
	this.correctIndex = correctIndex;
}

var quizes = [new quiz("q1", ["a1","a2","a3","a4"], 2), new quiz("q2", ["a2-1","a2-2","a2-3","a2-4"], 1)];
//console.log(quizes[1]);
$(document).ready(function(){
	var list = document.createElement('li');
	$('#question').html(quizes[1].question);	
	
	for (var i = 0; i< quizes[1].choices.length; i++){
		list.innerHTML = quizes[1].choices[i];
		list.value = i;
//console.log(list.outerHTML);
		$('#answer-choices').append(list.outerHTML);
	}

	$('#answer-choices').on('click', function(e){
		if(e.target.value == quizes[1].correctIndex)
		{
			alert("yes");
		} else {
			alert("no");
		}
//console.log(e);
	});
});
