let characters = 0;
let pageQuote = 0;
let currentQuote = 0;
let prevQuote = 0;
let feedback = 0;
let nextBtn = 0;
let timeout = 0;

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

function newQuote(){
    prevQuote = currentQuote;
    
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
    
    newQuote();
}

window.onload = (e) => {
    pageQuote = document.querySelector("#quote");
    characters = document.querySelectorAll(".character");
    feedback = document.querySelector("#feedback");
    nextBtn = document.querySelector("#button");
    
    nextBtn.addEventListener("click", newQuote);
    
    newQuote();
    
    for(let i = 0; i < characters.length; i++){
        characters[i].addEventListener("click", checkAnswer);
        
        let characterName = characters[i].dataset.name;
        characters[i].querySelector("p").innerHTML = characterName;
    }
    
};

let checkAnswer = (e) => {
    let card = e.target;
    
    // if the name or image are clicked, correct the target to the div
    if(card.childNodes.length <= 1){
        card = card.parentNode;
    }
    
    // check div clicked against the current quotes author
    if(card.dataset.name == currentQuote.author){
//        pageQuote.innerHTML = "Correct!";
        pageQuote.style.backgroundColor = "green";       
    }
    else{
//        pageQuote.innerHTML = "Incorrect.";
        pageQuote.style.backgroundColor = "red";
        
        
    }
    
    // if there is a pending timeout, clear it to prevent ui changing 'too quickly'
    clearTimeout(timeout);
    
    // reset the feedback ui after 2 seconds
    timeout = setTimeout(resetUI, 2000);
}
