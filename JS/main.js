let pageQuote = 0;
let currentQuote = 0;
let prevQuote = 0;
let timeout = 0;

let scoreLbl = 0;
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
            {author:"Holly", quote:"Lets get ethical, ethical."},
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
    scoreLbl.innerHTML = "SCORE: " + score + " / " + attempts;
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
    scoreLbl.innerHTML = "You scored " + Math.ceil((score/attempts) * 100) + "%";
}
