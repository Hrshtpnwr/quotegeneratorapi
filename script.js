const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById("author");
const tagText = document.getElementById("tag");

const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-Quote");
const loader = document.getElementById("loader");
let apiQuotes = [];


// SHow Loading



function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}






//Show new Quote
function newQuote() {
    loading();
    //pick a random quote freom apiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author  field is blank and replace it with "Unkown"



    if (!quote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = quote.author;
        //tagText.textContent = quote.tag;
    }
    //Check quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');

    }


    //Set quote and hide loader

    quoteText.textContent = quote.text;
    complete()
}






async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();



    } catch (error) {
        console.log("error");

    }
}
//TweetQuotes

function tweetQuotes() {

    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterURL, '_blank');
}
// Event Listeners

twitterBtn.addEventListener('click', tweetQuotes);
newQuoteBtn.addEventListener('click', newQuote)





getQuotes();