var state = {
	questions: [
		{
			questionText: "The service box is an area on the court that __________",
			firstAnswer: "the person serving must stand in",
			secondAnswer: "the person returning the serve must be standing in before a server can serve",
			thirdAnswer: "is marked by a big X",
			fourthAnswer: "the ball must land in to be a playable serve",
			correctAnswer: 4
		},
		{
			questionText: "Correct scorekeeping order is:",
			firstAnswer: "45, 35, 20, 10",
			secondAnswer: "love, 15, 30, 40",
			thirdAnswer: "15, 30, 45, love",
			fourthAnswer: "15, 30, 40 , love",
			correctAnswer: 2
		},
		{
			questionText: "The player who delivers the ball to start the point is called the _____?",
			firstAnswer: "coach",
			secondAnswer: "receiver",
			thirdAnswer: "server",
			fourthAnswer: "a friend",
			correctAnswer: 3
		},
		{
			questionText: "What are some ways tennis can be played?",
			firstAnswer: "singles",
			secondAnswer: "doubles",
			thirdAnswer: "mixed gender",
			fourthAnswer: "all of the above",
			correctAnswer: 4
		},
		{
			questionText: "Missing both the first and second serves is called a:",
			firstAnswer: "epic failure",
			secondAnswer: "double fault",
			thirdAnswer: "deuce",
			fourthAnswer: "advantage",
			correctAnswer: 2
		}
	],
	currentScore: 0,
	currentQuestion: 0
};

var template = 
'<div>' +
	'<h2></h2>' +
	'<input type="radio" id="answer1" name="answer"/><label for="answer1" value="1">' +
	'</label></br>' +
	'<input type="radio" id="answer2" name="answer"/><label for="answer2" value="2">' +
	'</label></br>' +
	'<input type="radio" id="answer3" name="answer"/><label for="answer3" value="3">' +
	'</label></br>' +
	'<input type="radio" id="answer4" name="answer"/><label for="answer4" value="4">' +
	'</label></br>' +
	'<label><input type="submit" id="submit" value="Submit"></label>' +
	'<button type="button" id="nextButton" class="hidden">Next Question</button>' +
'</div>';

var renderQuestion = function (state, template, element){
	var currentQuestion = $(template);
	if (state.currentQuestion != state.questions.length){
		currentQuestion.find('h2').text(state.questions[state.currentQuestion].questionText);
		currentQuestion.find('label[for=answer1]').text(state.questions[state.currentQuestion].firstAnswer);
		currentQuestion.find('label[for=answer2]').text(state.questions[state.currentQuestion].secondAnswer);
		currentQuestion.find('label[for=answer3]').text(state.questions[state.currentQuestion].thirdAnswer);
		currentQuestion.find('label[for=answer4]').text(state.questions[state.currentQuestion].fourthAnswer);
		element.html(currentQuestion);
	}
};

var checkResult = function(state, target){
	if(target.attr('value') == state.questions[state.currentQuestion].correctAnswer){
		target.addClass('green');
		state.currentScore++;
		state.currentQuestion++;
	} else{
		target.addClass('red');
		$('label[value=' + state.questions[state.currentQuestion].correctAnswer + ']').addClass('green');
		state.currentQuestion++;
	}
};

var renderScore = function(state, firstElement, secondElement){
	firstElement.text(state.currentQuestion + " out of " + state.questions.length);
	secondElement.text(state.currentScore + " correct, " + (state.currentQuestion - state.currentScore) + " incorrect")
};

var renderLastPage = function(state, showElement, hideElement){
	if (state.currentQuestion == state.questions.length){
		hideElement.hide();
		showElement.find('h2').text("You got " + state.currentScore + " out of " + state.questions.length + " correct!");
		showElement.show();
		state.currentQuestion = 0;
		state.currentScore = 0;
	}
};

$('#firstButton').click(function(event){
	event.preventDefault();
	$('#main').show();
	$('#start-button').hide();
	renderQuestion(state, template, $('#form'));
});

$('#form').on('click', '#submit', function(event){
	event.preventDefault();
	var target = $('input[name=answer]:checked+label', '#form');
	checkResult(state, target);
	$('#nextButton').show();
	$('#submit').hide();
	renderScore(state, $('.lower-left'), $('.lower-right'));
});

$('#form').on('click', '#nextButton', function(event){
	event.preventDefault();
	renderQuestion(state, template, $('#form'));
	renderScore(state, $('.lower-left'), $('.lower-right'));
	renderLastPage(state, $('#restartPage'), $('#main'));
});

$('#restartButton').click(function(event){
	event.preventDefault();
	$('#restartPage').hide();
	renderQuestion(state, template, $('#form'));
	renderScore(state, $('.lower-left'), $('.lower-right'));
	$('#main').show();
});


