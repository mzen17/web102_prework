/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    games.forEach((game) => {
        const newDiv = document.createElement("div");
        const newImg = document.createElement("img");

        newImg.src = game["img"]
        newImg.classList.add('game-img')

        newDiv.textContent = game["name"] + " | " + game["description"]
        newDiv.classList.add("game-card");
        newDiv.appendChild(newImg)

        gamesContainer.appendChild(newDiv)
        
    })
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON)
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalBackers = GAMES_JSON.reduce((accumBackers, game) => accumBackers + game["backers"], 0);
contributionsCard.innerText = `${totalBackers.toLocaleString()}`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((accumBackers, game) => accumBackers + game["pledged"], 0);
raisedCard.innerText = `$${totalRaised.toLocaleString()}`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = GAMES_JSON.length

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const tmp_json = GAMES_JSON.filter(data => data["pledged"] < data["goal"])

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(tmp_json)
    console.log(tmp_json)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const tmp_json = GAMES_JSON.filter(data => data["pledged"] >= data["goal"])

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(tmp_json)
    console.log(tmp_json)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
    console.log(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const amtFunded = GAMES_JSON.filter(data => data["pledged"] >= data["goal"]).length
const notFunded = GAMES_JSON.filter(data => data["pledged"] < data["goal"]).length
const raiseAMT = `$${totalRaised.toLocaleString()}`//recycle earlier compute

const gameText = (num) => num === 1 ? "game" : "games";
const fundedText = gameText(amtFunded);
const unfundedText = gameText(notFunded);

// create a string that explains the number of unfunded games using the ternary operator
let message = `A total of ${raiseAMT} has been raised for ${amtFunded} ${fundedText}. `;
message += `Currently, ${notFunded} ${unfundedText} remain unfunded. `;

if (notFunded === 0) {
    message += "We have achieved our goals!";
} else {
    message += "We need your help to fund these amazing games!";
}

// create a new DOM element containing the template string and append it to the description container
let p = document.createElement('p')
p.innerText = message
descriptionContainer.appendChild(p)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topper = document.createElement('p')
topper.innerText = first["name"]
firstGameContainer.appendChild(topper)

// do the same for the runner up item
let runner = document.createElement('p')
runner.innerText = second["name"]
secondGameContainer.appendChild(runner)
