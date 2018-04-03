let pageQuote = 0;
let cards = 0;
let currentQuote = 0;
let prevQuote = 0;
let timeout = 0;
let usedQuotes = [];
let characters = 0;
let hintBtns = 0;
let timer = 0;
let timerPercent = 0;

let score = 0;
let attempts = 0;
let numOfQuotes = 10; //probably going to be ~15/20
let allowAnswer = true;

let quotes = [
            {author:"Michael", quote:"WHERE... ARE... THE TURTLES!"},
            {author:"Michael", quote:"I'm not superstitious, but I am a little stitious."},
            {author:"Michael", quote:"That’s what she said!"},
            {author:"Jim", quote:"Everything I have I owe to this job...this stupid, wonderful, boring, amazing job."},
            {author:"Jim", quote:"Absolutely I do."},
            {author:"Jim", quote:"You're looking at the master of leaving parties early. I dont mean to brag, but New Year's Eve...I was home by 9."},
            {author:"Pam", quote:"I don’t want to say the computer was old, but its IP number was 1"},
            {author:"Pam", quote:"When you’re a kid, you assume your parents are soul mates. My kids are gonna be right about that."},
            {author:"Pam", quote:"I have no intention of timing him.  This isn't even a stopwatch. It's a digital thermometer.."},
            {author:"Dwight", quote:"There’s too many people on this earth. We need a new plague."},
            {author:"Dwight", quote:"We're third cousins, which is great for bloodlines and isn't technically incest."},
            {author:"Andy", quote:"Oh it is on, like a prawn who yawns at dawn."},
            {author:"Andy", quote:"I'm always thinking one step ahead, like a carpenter that makes stairs ."},
            {author:"Andy", quote:"I do not lose contests, I win them or quit them because they are unfair."},
            {author:"Angela", quote:"If you pray enough, you can turn yourself into a cat person."},
            {author:"Angela", quote:"Jazz is stupid. Just play the right notes."},
            {author:"Toby", quote:"Guys that’s really inappropriate"},
            {author:"Toby", quote:"My birthday was two months ago. There was no party."},
            {author:"Stanley", quote:"I do not apologize unless I think I’m wrong and if you don’t like it, you can leave."},
            {author:"Stanley", quote:"I have been trying to get on a jury duty ever single year since I was 18 years old."},
            {author:"Creed", quote:"Cool beans man. I live by the quary. We should hang out by the quary and throw thing down there."},
            {author:"Creed", quote:"I've done a lot more for a lot less."},
            {author:"Darryl", quote:"I'm hot, you're hot. Let's get it poppin."},
            {author:"Darryl", quote:"Girls would say the same thing, 'I'm comin over baby. And I would text back, 'BTB' - Bring That Booty."},
            {author:"Darryl", quote:"Dinkin Flicka."},
            {author:"Erin", quote:"Disposable cameras are fun, although it does seem wasteful. And you don’t ever get to you see your pictures."},
            {author:"Erin", quote:"Do you have a favorite age? Or month?"},
            {author:"Holly", quote:"Your wife becoming be will I"},
            {author:"Holly", quote:"&#9835 Lets get ethical, ethical. &#9835"},
            {author:"Kelly", quote:"I don't talk trash, I talk smack. They're totally different."},
            {author:"Kelly", quote:"I talk a lot, so I’ve learned to just tune myself out ."},
            {author:"Kevin", quote:"I have very little patience for stupidity."},
            {author:"Kevin", quote:"I got six numbers. One more would have been a complete telephone number!"},
            {author:"Meredith", quote:"Like my mom says, talk classy act nasty."},
            {author:"Meredith", quote:"I made a New Year's resolution that I'm not going to drink anymore...during the week."},
            {author:"Oscar", quote:"Besides having sex with men, I would say that the finer things club is the gayest thing about my life."},
            {author:"Oscar", quote:"If you would have seen the look he gave me he wanted to rock more than my vote."},
            {author:"Phyllis", quote:"We have a gym at home, its called the bedroom."},
            {author:"Phyllis", quote:"I love going to bars with bob. I tend to wear something lowcut, get men to flirt with me, and Bob beats them up."},
            {author:"Ryan", quote:"It’s called ‘owling.’ You’ll read about it in like eight months"},
            {author:"Ryan", quote:"Origami. It’s the sushi of paper."}
        ];

window.onload = (e) => {
    pageQuote = document.querySelector("#quote");
    characters = document.querySelectorAll(".character");
    hintBtns = document.querySelectorAll(".hint");
    cards = document.querySelectorAll(".card");
    tick();
    setupGame();
};

function tick(){
    setTimeout(tick, 20);
    timerPercent += 0.1;
    time.style.marginRight = timerPercent + "%";
    console.log(time.style.marginRight);
}

function setupGame(){
    // set/reset game variables
    currentQuote = 0;
    prevQuote = 0;
    timeout = 0;
    score = 0;
    attempts = 0;
    allowAnswer = true;
    
    timer = document.querySelector("#time");
    
    resetUI();
    
    // loop through and characters
    for(let i = 0; i < characters.length; i++){
        // add eventListener to characters
        characters[i].addEventListener("click", checkAnswer);
        
        // assign character name to character card
        let characterName = characters[i].dataset.name;
        characters[i].querySelector("p").innerHTML = characterName;
    }
    
    // setup Narrow it down button
    hintBtns[0].innerHTML = "Narrow it Down!";
    hintBtns[0].addEventListener("click", narrowDown);
    hintBtns[0].removeEventListener("click", setupGame);

    hintBtns[1].innerHTML = "Skip This Quote";
    hintBtns[1].addEventListener("click", skipQuote);
    
    // give button functionality to both buttons
    for(hintBtn of hintBtns){
        hintBtn.addEventListener("click", useHint);
        hintBtn.classList.remove("inactive");
    }
    

    // set initial score UI
    updateScore();
}

function newQuote(){
    // grab a random quote
    i = Math.floor(Math.random() * Math.floor(quotes.length));
    currentQuote = quotes[i];
    
    // loop through the list of used quotes
    for(obj of usedQuotes){
        // if the chosen quote has been used
        if( obj.quote == currentQuote.quote ){
            // retry, grab a new quote
            newQuote();
            return;
        }
    }
    
    usedQuotes.push(currentQuote);
    
    pageQuote.innerHTML = `<em>"${currentQuote.quote}"</em>`;
}

function resetUI(){
    // reset quote color
    pageQuote.style.backgroundColor = "dimgrey";
    
    allowAnswer = true;
    
    // for all elements that are inactive
    for(card of document.querySelectorAll("#cards .inactive")){
        // remove inactivity
        card.classList.remove("inactive");
    }
    
    // grab a new quote
    newQuote();
}

function updateScore(){
    let scoreLbl = document.querySelector("#score");
    scoreLbl.innerHTML = "SCORE: " + score + " / " + attempts;
}

let checkAnswer = (e) => {
    // if the user is not allowed to answer
    if(!allowAnswer){
        // leave/return out of the function
        return;
    }
    
    let card = e.target;
    
    // if the name or image are clicked, correct the target to the div
    if(card.childNodes.length <= 1){
        card = card.parentNode;
    }
    
    // if the card is inactive
    if( card.classList.contains("inactive")){
        // leave/return out of the function
        return;
    }
    
    // check div clicked against the current quotes author
    // correct
    if(card.dataset.name == currentQuote.author){
        pageQuote.style.backgroundColor = "green";
        score += 1;
        attempts += 1;
    }
    // incorrect
    else{
        pageQuote.style.backgroundColor = "red";
        
        attempts += 1;
    }
    
    pageQuote.innerHTML += " - " + currentQuote.author;
        
    // set this quote as done, therefore the previous
    prevQuote = currentQuote;
    
    allowAnswer = false;
    
    updateScore();
    
    // if there is a pending timeout, clear it to prevent ui changing unexpectedly
    clearTimeout(timeout);
    
    if(attempts < numOfQuotes){
        // reset the feedback ui after 1 seconds
        timeout = setTimeout(resetUI, 1000);
    }
    else{
        // game is complete!
        gameover();
    }
}

let useHint = (e) => {
    
    // if the button is inactive, "cancel" the action
    if(e.target.classList.contains("inactive")){
        return;
    }

    // deactivate the hintBtn(narrow it down button)
    e.target.classList.add("inactive");
}

let narrowDown = (e) => {
    
    // if the button is inactive, "cancel" the action
    if(e.target.classList.contains("inactive")){
        return;
    }
    
    let numDisabled = 0;
    
    // while less than 3/4ths of characters are disabled
    while(numDisabled < (characters.length * 3/4)){
        // check each card
        for(card of characters){
            // if not the author of the current quote 
            if(currentQuote.author != card.dataset.name){
                // 50% chance of turning inactive
                i = Math.random();
                if( i < 0.5 ){
                    card.classList.add("inactive");
                    numDisabled++;
                    
                    // if at least half of the characters are inactive, leave the loop
                    if(numDisabled >= (characters.length/2)){
                        break;
                    }
                }
            }
        }
    }   
}

let skipQuote = (e) => {
    
    newQuote();
    
}

function gameover(){
    let scoreLbl = document.querySelector("#score");
    scoreLbl.innerHTML = "You scored " + Math.ceil((score/attempts) * 100) + "%";
    
    // deactivate all cards
    for(card of characters){
       card.classList.add("inactive");
    }
    
    hintBtns[0].classList.remove("inactive");
    hintBtns[0].innerHTML = "Replay";
    hintBtns[1].classList.add("inactive");
    
    // set the hintBtn to act as a replay button and remove and inactivity
    hintBtns[0].addEventListener("click", setupGame);
    
}
