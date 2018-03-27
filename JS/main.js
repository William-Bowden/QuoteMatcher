let pageQuote = 0;
let currentQuote = 0;
let prevQuote = 0;
let timeout = 0;

let scoreLbl = 0;
let score = 0;
let attempts = 0;
let numOfQuotes = 3; //probably going to be ~15/20
let allowAnswer = true;

let quotes = [
            {author:"Michael", quote:"WHERE... ARE... THE TURTLES!"},
            {author:"Michael", quote:"Michael quote 2"},
            {author:"Michael", quote:"Michael quote 3"},
            {author:"Jim", quote:"Jim quote 1"},
            {author:"Pam", quote:"Pam quote 1"},
            {author:"Dwight", quote:"Dwight quote 1"},
            {author:"Andy", quote:"Andy quote 1"},
            {author:"Angela", quote:"Angela quote 1"},
            {author:"Toby", quote:"Toby quote 1"},
            {author:"Stanley", quote:"Stanley quote 1"},
            {author:"Creed", quote:"Creed quote 1"},
            {author:"Darryl", quote:"Darryl quote 1"},
            {author:"Erin", quote:"Erin quote 1"},
            {author:"Holly", quote:"Holly quote 1"},
            {author:"Kelly", quote:"Kelly quote 1"},
            {author:"Kevin", quote:"Kevin quote 1"},
            {author:"Meredith", quote:"Meredith quote 1"},
            {author:"Oscar", quote:"Oscar quote 1"},
            {author:"Phyllis", quote:"Phyllis quote 1"},
            {author:"Ryan", quote:"Ryan quote 1"}
        ];


window.onload = (e) => {
    setupGame();    
};

function setupGame(){
    // set/reset game variables
    currentQuote = 0;
    prevQuote = 0;
    timeout = 0;
    
    score = 0;
    attempts = 0;
    allowAnswer = true;
    
    pageQuote = document.querySelector("#quote");
    scoreLbl = document.querySelector("#score");
    let characters = document.querySelectorAll(".character");
    
    newQuote();
    
    for(let i = 0; i < characters.length; i++){
        characters[i].addEventListener("click", checkAnswer);
        
        let characterName = characters[i].dataset.name;
        characters[i].querySelector("p").innerHTML = characterName;
    }
}

function newQuote(){    
    // don't ask the same quote two times in a row
    while(currentQuote == prevQuote){
        i = Math.floor(Math.random() * Math.floor(quotes.length));
        currentQuote = quotes[i];
    }
    
    pageQuote.innerHTML = `<em>"${currentQuote.quote}"</em>`;
}

function resetUI(){
    pageQuote.style.backgroundColor = "dimgrey";
    pageQuote.innerHTML = currentQuote.quote;
    
    allowAnswer = true;
    
    newQuote();
}

function updateScore(){
    scoreLbl.innerHTML = score + " / " + attempts;
}

let checkAnswer = (e) => {
    // if the user is not allowed to answer
    if(!allowAnswer){
        // return out of the function
        return;
    }
    
    let card = e.target;
    
    // if the name or image are clicked, correct the target to the div
    if(card.childNodes.length <= 1){
        card = card.parentNode;
    }
    
    // check div clicked against the current quotes author
    if(card.dataset.name == currentQuote.author){
        pageQuote.style.backgroundColor = "green";
        
        // checks to make sure the answer wasn't clicked multiple times
        if(currentQuote != prevQuote){
            score += 1;
            attempts += 1;
        }
    }
    else{
        pageQuote.style.backgroundColor = "red";
        
        // checks to make sure the answer wasn't clicked multiple times
        if(currentQuote != prevQuote){
            attempts += 1;
        }
    }
        
    // set this quote as done, therefore the previous
    prevQuote = currentQuote;
    
    allowAnswer = false;
    
    updateScore();
    
    // if there is a pending timeout, clear it to prevent ui changing unexpectedly
    clearTimeout(timeout);
    
    if(attempts < numOfQuotes){
        // reset the feedback ui after 2 seconds
        timeout = setTimeout(resetUI, 1000);
    }
    else{
        // game is complete!
        gameover();
    }
}

function gameover(){
    // replace with some HTML way of displaying final score & restart button
    console.log("You scored " + Math.ceil((score/attempts) * 100) + "%");
}
