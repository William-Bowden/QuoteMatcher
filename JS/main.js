let characters = 0;
let pageQuote = 0;
let currentQuote = 0;
let prevQuote = 0;
let feedback = 0;
let nextBtn = 0;

let quotes = [
            {author:"Michael", quote:"Michael quote 1"},
            {author:"Michael", quote:"Michael quote 2"},
            {author:"Michael", quote:"Michael quote 3"},
            {author:"Jim", quote:"Jim quote 1"},
            {author:"Pam", quote:"Pam quote 1"},
            {author:"Dwight", quote:"Dwight quote 1"},
            {author:"Andy", quote:"Andy quote 1"},
            {author:"Angela", quote:"Angela quote 1"},
            {author:"Toby", quote:"Toby quote 1"},
            {author:"Stanley", quote:"Stanley quote 1"}
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
    feedback.style.backgroundColor = "darkgrey";
    feedback.innerHTML = "Who said this quote?";
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
        feedback.innerHTML = "Correct!";
        feedback.style.backgroundColor = "green";
        
        //THIS MIGHT BE JUST FOR TESTING
        newQuote();
        //THIS MIGHT BE JUST FOR TESTING
        
    }
    else{
        feedback.innerHTML = "Incorrect.";
        feedback.style.backgroundColor = "red";
    }
        
    // reset the feedback ui after 2 seconds
    setTimeout(resetUI, 2000);
}
