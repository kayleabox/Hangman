    window.onload = function () {

    document.getElementById("win").style.visibility = "hidden";

    var words = ["marble", "obsidian", "quartz", "granite", "basalt", "feldspar", "sedimentary", "igneous", "metamorphic", "gabbro", "limestone", "shale", "malachite"];
    var usedWords = [];
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
    //var game = { alreadyguessed: [], wins: 0, correct: []};
    var alreadyguessed = [];
    var wins = 0;
    var won = false;
    var correct = [];


    function reset(){
    	won = false;
    	alreadyguessed = [];
    	correct = [];
    }


    /*function checkWord(compWord) {
        if (usedWords.includes(compWord) === true) {
            var used = true;
        }
        else{
            var used = false;
        }
        console.log(used);
        console.log(compWord);
        return used;
    };*/

    function getCompWord() {

        var compWord = words[Math.floor(Math.random() * words.length)];
        /*var check = checkWord(compWord);
        console.log(check);
        if (check === true) {
            compWord = getCompWord();
        } */
        //else {
            //var guessRemaining = compWord.length;
            console.log(compWord);
            usedWords.push(compWord);
            var index = words.indexOf(compWord);
            console.log("index" + index)
            words.splice(index, 1);
            console.log("usedwords" + usedWords);
            console.log(words);
            return compWord;
        //}

    };

    function printBlanks(compWord){
    	var displayWord = [];
    	for(i = 0; i < compWord.length; i++){ //there is an issue getting the length sometimes
    		/*Uncaught TypeError: Cannot read property 'length' of undefined
            at printBlanks (game.js:48)
            at rungame (game.js:155)*/
            displayWord.push("_");
    	}
    	console.log(displayWord);
    	return displayWord;
    };

    function setImg(compWord){
        var html = '<img class="rockpic" src = "assets/images/' + compWord + '.jpg">';

        document.querySelector("#rockimgs").innerHTML = html;
    };

    function displayStats(displayWord, wins, guessRemaining, alreadyguessed){
        var strword = displayWord.join("");
        var html = "<p>word: " + strword  + "</p>" +
        "<p>wins: " + wins + "</p>" +
        "<p>Guesses Remaining: " + guessRemaining + "</p>" +
        "<p>Already Guessed: " + alreadyguessed + "</p>";

        document.querySelector("#game").innerHTML = html;
    };

    function checkIndex(correct, compWord){
    	var indices = [];
    	for(i = 0; i < compWord.length; i++){
    		if (compWord[i] === correct){
    			indices.push(i);
    		}
    	}
    	return indices;
    };

    function checkWin(compWord, displayWord, wins){
    	var strdisplayword = displayWord.join("");
    	var won;
    	if (compWord === strdisplayword){
    		won = true; 
    		return won;
    	}
    };

    function showBtn(){
        document.getElementById("win").style.visibility = "hidden";
        $(document).on('click','#yes',function(){                   
                reset();
                rungame();
        })
        $(document).on('click','#no',function(){                    
            var html = "<p style = 'font-size: 30;'> goodbye!</p>";
            document.querySelector("#game").innerHTML = html;
        })
    };

    function game(compWord, displayWord) {
        var guessRemaining = compWord.length;
        document.onkeyup = function(event) {
            if (guessRemaining > 0 && won !== true) {
                var userGuess = event.key;
                console.log(userGuess);
                /*if (alreadyguessed.includes(userGuess) !== true && ){
                	guessRemaining--;
                	alreadyguessed.push(userGuess);
                	//console.log(alreadyguessed);//test
                }*/

                console.log(compWord);

                var match = compWord.search(userGuess);
                if (alreadyguessed.includes(userGuess) !== true && match < 0 ){
                    guessRemaining--;
                    alreadyguessed.push(userGuess);
                    //console.log(alreadyguessed);//test
                }
                //console.log(userGuess);
                //console.log(match);


                if (match !== -1) {
                    console.log("yay! " + wins);
                    var indices = checkIndex(userGuess, compWord);
                    console.log (indices);
                    for (i = 0; i<indices.length; i++){
                    	displayWord[indices[i]] = userGuess;
                    	//console.log(i);
                	}
                    correct.push(userGuess);
                } 
                else {
                    console.log("try again " + guessRemaining);
                }

                won = checkWin(compWord, displayWord, wins);
                if (won === true){
                	wins++;
                	console.log("this many wins " + wins + "you won!" + won);
                    document.getElementById("win").style.visibility = "visible";
                    /*var html2 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/ehcshoYIIM4" frameborder="0" allowfullscreen></iframe>'
                    "<p> here is a little treat for your viewing pleasure</p>";

                    $("#game").append(html2);*/
                }
                else{
                	console.log("you haven't won!");

                }

                displayStats(displayWord, wins, guessRemaining, alreadyguessed);
            }
            else if(guessRemaining === 0 && won !== true){
                //this needs to move into the last else clause
                var html =  "<p> you hit rock bottom!</p>" +
                "<p>play again?</p> <button type='button' id ='yes'>yes</button> <button type='button' id ='no'>no</button>";

                document.querySelector("#game").innerHTML = html;

                showBtn();
            }
            else{
	
                var html = "<p>play again?</p> <button type='button' id ='yes'>yes</button> <button type='button' id ='no'>no</button>";

                document.querySelector("#game").innerHTML = html;

                setImg("rocks");

                showBtn();

            }

        };
    };

   	 function rungame(){
	    
	    var compWord = getCompWord();

	    console.log(compWord);

        setImg(compWord);

	    var displayWord = printBlanks(compWord);

	    displayStats(displayWord, wins, compWord.length, alreadyguessed);
	 
	    game(compWord, displayWord);

	};

	rungame();
};