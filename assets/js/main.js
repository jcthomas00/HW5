
var counterInterval, quizes = [];
var TIME_LIMIT = 31;

//quiz object with constructor
function quiz(question, choices, correctIndex) {
	this.question = question;
	this.choices = choices;
	this.correctIndex = correctIndex;
}

//timer object to countdown seconds to answer
var timer = {
	time : TIME_LIMIT,
	running : false,
	start : function() {
			if (this.running === false) {
				this.running = true;
				counterInterval = setInterval(timer.countdown, 1000);
			}
	},
	countdown : function() {
		if (timer.time > 0) {
			$('#timer').html(--timer.time);
		}
		else {
			$('#timer').html("time's up!");	
			//wrongAnswer(true);
		}
	}
}


$.getJSON('https://opentdb.com/api.php?amount=25&category=31&type=multiple&difficulty=easy', 
	function(data){	
		var result = data.results, tempArray, randomIndex, tempVal;
		$.each(result, function(index, item){
			tempArray = item.incorrect_answers;
			randomIndex = Math.floor(Math.random()*tempArray.length);
			tempVal = tempArray[randomIndex];
			tempArray[randomIndex] = item.correct_answer;
			tempArray.push(tempVal);
			quizes.push(new quiz(item.question, tempArray, randomIndex));
		});
});

function populateData(data) {

	for (var i = Things.length - 1; i >= 0; i--) {
		Things[i]
	}
	console.log(data.results);
}

$(document).ready(function(){
	//start trivia round
	$('#go').on('click', function(){
		$(this).slideUp("slow");
		nextQuestion();
	});

	//what to do when an answer is selected
	$('#answer-choices').on('click', function(e){
		clearInterval(counterInterval);
		timer.running = false;
		if(e.target.value === curQuiz.correctIndex)
		{
			wrongAnswer(false);
		} else {
			wrongAnswer(true);
		}
		//need this to prevent document from reloading
		e.preventDefault();
	});	
});//end of document.ready

//get the next question
function nextQuestion() {
		//get a random question from quizes array
		curQuiz = quizes[Math.floor(Math.random()*quizes.length)];
		//show the question and choices with a slide up animation
		$("#question").html(curQuiz.question).hide();
		$('#question').slideDown("slow");	
		$('#answer-choices').html(makeList(curQuiz.choices)).hide();
		$('#answer-choices').slideDown("slow");
		//reset timer
		timer.time = TIME_LIMIT;
		timer.start();
		//reset the result area
		$('#result').removeClass();
		$('#result').html("");
}

//takes a quiz object and returns the choices in <li>
function makeList(answerList){
	var list = "";
	var listItem = document.createElement('li');		
	for (var i = 0; i< answerList.length; i++){
		listItem.innerHTML = answerList[i] ;
		listItem.value = i;
		list += listItem.outerHTML;
	}
	return list;
}

//show the correct answer	
function wrongAnswer(wrongFlag) {
	if (wrongFlag){
		$('#result').addClass("alert alert-danger");
		$('#result').html("Wrong! The  correct answer was " + curQuiz.choices[curQuiz.correctIndex]);
	}
	else {
		$('#result').addClass("alert alert-success");
		$('#result').html("You got the correct answer: " + curQuiz.choices[curQuiz.correctIndex]);
	}	
	//wait 5 seconds, then show the next question
	window.setTimeout(nextQuestion, 5000);
}
