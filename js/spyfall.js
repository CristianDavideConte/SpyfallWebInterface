//The names of all the scenaries which are going to be displayed by default and the ones the game will be reset to whenever it ends
//They can be first found in the gameTable HTML element and can be removed using one of the popUpMenu at the bottom of the game HTML element
const defaultGamePlayableScenaryArray = new Array("Aeroplano", "Banca", "Spiaggia", "Teatro", "Casinò", 
													"Cattedrale", "Tendone del Circo", "Festa Aziendale", "Esercito dei Crociati", "Centro Benessere", 
													"Ambasciata", "Ospedale", "Albergo", "Base Militare", "Studio Cinematografico", 
													"Nave da Crociera", "Treno Passeggeri", "Nave Pirata", "Stazione Polare", "Commissariato", 
													"Ristorante", "Scuola", "Stazione di Servizio", "Stazione Spaziale", "Sottomarino", 
													"Supermercato", "Università");

//The names of all the scenaries which are going to be hidden by default and the ones the game will hide again whenever it ends
//They can be first found in order to add them to the gameTable HTML element, in one of the popUpMenu at the bottom of the game HTML element
const defaultGameNotPlayableScenaryArray = new Array("Parco di Divertimenti", "Museo d'Arte", "Fabbrica di Caramelle", "Mostra Felina", "Cimitero", 
												"Miniera di Carbone", "Cantiere", "Convention di Giochi", "Pompa di Benzina", "Porto", 
												"Stadio di Hockey", "Prigione", "Club Jazz", "Biblioteca", "Discoteca", 
												"Ippodromo", "Casa di Riposo", "Concerto Rock", "Autobus Turistico", "Stadio", 
												"Metropolitana", "Le Nazioni Unite", "Vigneto", "Matrimonio", "Zoo"
												);

//An array of HTML elements containing text that will be used as the game rules' description
const gameRulesHTMLElements = new Array("<h2>Introduzione</h2>",
										"<h3>Una partita di Spyfall è costituita da diversi Round di gioco.</h3>",
										"<h3>Ad ogni Round i giocatori si troveranno tutti in uno stesso Scenario ed ognuno con uno specifico Ruolo assegnato.</h3>",
										"<h3>Tra di loro saranno presenti una o più spie che dovranno scoprire dove si trovano gli altri giocatori senza farsi scoprire.</h3>",
										"<h2>Obiettivi</h2>", 
										"<h3>L'obiettivo della spia è di evitare di essere scoperta fino alla fine del Round.</h3>",
										"<h3>L'obiettivo delle non-spie è quello di cercare di capire chi fra i presenti è una spia.</h3>",
										"<h2>Svolgimento di un Round</h2>",
										"<h3>All'inizio di ogni Round si sceglie il primo giocatore e si stabilisce la durata del Round stesso.</h3>",
										"<h3>Una volta fatto partire il timer, il primo giocatore fa una domanda ad un altro giocatore a sua scelta chiamandolo per nome, questo risponderà e procederà a fare una domanda ad un altro giocatore che a sua volta risponderà e domanderà, e così via.</h3>",
										"<h3>Le domande di solito sono inerenti allo scenario in cui ci si trova, ma questo non è obbligatorio...</h3>",
										"<h3>All'interno dello stesso Round le domande non possono essere ripetute in alcuna forma e non sono ammesse domande che riprendono domande e/o risposte di altri giocatori.</h3>",
										"<h3>Si possono fare domande a tutti gli altri giocatori meno che a colui il quale si ha appena risposto.</h3>",
										"<h2>Condizioni di Vittoria</h2>",
										"<h3>Alla fine di ogni Round, in ordine, ogni giocatore accusa un altro giocatore di essere una spia.</h3>",
										"<h3>I giocatori sono ora liberi di discutere l'accusa appena fatta.</h3>",
										"<h3>Se TUTTI i giocatori, escluso l'accusato che non ha diritto di parola, concordano con l'accusa, l'accusato deve rivelare il suo RUOLO.</h3>",
										"<h3>In caso contrario si passa al giocatore successivo che può ora accusare chi ritiene essere una spia.</h3>",
										"<h3>Nel caso in cui il giocatore che rivela il proprio ruolo sia effettivamente una spia, tutte le non-spie ottengono due punti.</h3>",
										"<h3>Nel caso in cui non si giunga mai ad un accordo comune ogni spia ottiene un punto. In questo caso, a turno, le spie si rivelano e cercano di indovinare lo scenario di quel Round.</h3>",
										"<h3>Non è consentito a nessuna spia, uscita allo scoperto, parlare con gli altri giocatori fino a quando ogni spia non avrà indicato quello che, secondo lei, è lo Scenario di quel Round.</h3>",
										"<h3>Una volta che ogni spia ha indicato uno Scenario, questo viene rivelato dal primo giocatore: ogni spia che ha indovinato riceve due punti.</h3>",
										"<h3>Il primo giocatore che raggiunge il numero massimo di punti stabilito vince la partita.</h3>",
										"<h3>In caso di parità il giocatore più giovane che per ultimo è stato una spia, e non è stato scoperto, vince.</h3>"
										);
										
const gameTableColCountFullWidthDevice = 5;						//The number of columns of the gameTable for large width screens
const gameTableColCountLowWidthDevice = 4;						//The number of columns of the gameTable for low width screens
const modifyGameScenaryTableColCount = 3;						//The number of columns of the menuTables
		
const pixelNumberLowWidthDevice = 1080;							//The highest possible number of pixel for a device's width to be considered low

const timerMinValue = 1;										//The minimum number of minutes the timer can be set to										


var gameTableColCount = gameTableColCountFullWidthDevice;	//The actual number of columns of the gameTable
var points = 0;												//The number of player's points

var gamePlayableScenary;									//The scenaries that are currently being displayed in the game section
var gameNotPlayableScenary;									//The scenaries that are currently not being displayed in the game section

var startingTime = timerMinValue;							//The number of minutes the timer starts to countdown from and that will be reset to in the next round
var timerRemaningMinutes = timerMinValue;					//The current number of minutes of the timer 
var timerRemaningSeconds;									//The current number of timerRemaningSeconds of the timer 
var timerStarted = false;									//True if the timer is currently going on, false if stopped
var timerHasBeenModified = true;							//True if the minutes number of the timer has been modified by user throught any action, false otherwise
var timerWasInterrupted = false;		
var startingTimerDate = Date.now();							//The timer's startingTime date in milliseconds
var endingTimerDate;										//The timer's endTime date
var timerTimeoutValue;										//The number of milliseconds that passes from a call to the countDown function and the next one
	
var previousTouch;											//The touch object associated with the previous user touch

var documentBodyElement;									//The documentBody object associated with HTML document.body element 
		
var topToolBarElement;										//The topToolBar object associated with HTML topToolBar div element 				
var infoImageElement;										//The infoImage object associated with HTML info img element inside the topToolBar div element 
var timerSectionElement;									//The timerSection object associated with HTML timerSection form element
var timerImageElement;										//The timerImage object associated with HTML timerImage img element inside the timerSection form element
var timerElement;											//The timer object associated with HTML timer input element inside the timerSection form element	
var timerPlayImageElement;									//The timerPlayImage object associated with HTML timerButton img element inside the timerSection form element
var timerPauseImageElement; 								//The timerPauseImage object associated with HTML timerButton img element inside the timerSection form element
var endGameButtonElement;									//The endGameButton object associated with HTML endGameButton button element inside the topToolBar div element 

var gameElement;											//The game object associated with HTML game div element 
var gameTableElement;										//The gameTable object associated with HTML gameTable table element inside the game div element 
var gameTableButtonSectionElement;							//The gameTableButtonSection object associated with HTML gameTableButtonSection div element inside the game div element 	

var bottomToolBarElement;									//The bottomToolBar object associated with HTML bottomToolBar div element 		
var pointsElement;											//The points object associated with HTML points input element
var scenaryInputElement;									//The scenaryInput object associated with HTML scenary input box element
var roleInputElement;										//The roleInput object associated with HTML role input box element
var resetGameButtonElement;									//The resetGameButton object associated with HTML resetGameButton button element inside the bottomToolBar div element 

var menuSectionElement;										//The menuSection object associated with HTML menuSection div element 
var menuOverlayElement;										//The menu's overlay object assocciated with HTML menu div element inside the menuSection div element	
var menuElement;											//The menu object associated with HTML menu div element inside the menuSection div element		
var logoImageElement;										//The logoImage object associated with HTML logo img element inside the menuTitleSection div of the HTML menu element 
	

/* This Function calls all the initialization functions for:
 * The linking of javascript variables to their HTML associated elements
 * The gamePlayableScenary and gameNotPlayableScenary javascript Sets first initialization
 * The gameElement javascript variable first initialization
 * The game elements's Events handlers initialization
 * The HTML images sources loadng
 * The window's height (fixes mobile navigation bars behavior)
 */
function init() {				
	variablesInit();											//The game's variables are first linked to their respective HTML elements
	gameTableArrayInit();										//The Set structures containing the names of the Scenaries that are going to be displayed during the game are initialized to some default array values
	
	const gameTableTitle = document.createElement("h1");		//Creates the gameTable's title HTML h1 element
	gameTableTitle.innerHTML = "Scenari";						//Set the title's text 
	createGameTable(gameTableTitle);							//The gameTableElement is filled with the necessary game inital components 	
	
	gameHandlersInit();											//The game's javascript variables associated with the corresponding HTML elements are linked to their handlers 
	imagesInit();												//The images are loaded last for performance
	
	resetHeight();												//Initially sets the height (fixes mobile top search bar behavior)
	setTimeout(() => showRules(), 400);							//After all the animations have completed the game's rules are shown to the user
}

/* This function initializes all the game's variables that are associated with an HTML element 
 * and set the columns number of the gameTable inside the gameElement
 */
function variablesInit() {
	if(window.innerWidth <= pixelNumberLowWidthDevice)									//If the number of width's pixels is lesser than pixelNumberLowWidthDevice
		gameTableColCount = gameTableColCountLowWidthDevice;							//The columns number of the gameTable inside the gameTable is set to gameTableColCountLowWidthDevice
		
	documentBodyElement = document.body;												//Stores the document.body HTML element inside the documentBodyElement javascript variable for a faster access later
	
	topToolBarElement = document.getElementById("topToolBar");							//Stores the topToolBar HTML element inside the topToolBarElement javascript variable for a faster access later
	infoImageElement = document.getElementById("infoImage");							//Stores the infoImage HTML element inside the infoImageElement javascript variable for a faster access later
	timerSectionElement = document.getElementById("timerSection");						//Stores the timerSection HTML element inside the timerSectionElement javascript variable for a faster access later
	timerImageElement = document.getElementById("timerImage");							//Stores the timerImage HTML element inside the timerImageElement javascript variable for a faster access later
	timerElement = document.getElementById("timer");									//Stores the timer HTML element inside the timerElement javascript variable for a faster access later
	endGameButtonElement = document.getElementById("endGameButton");					//Stores the endGameButton HTML element inside the endGameButtonElement javascript variable for a faster access later
	
	gameElement = document.getElementById("game");										//Stores the game HTML element inside the gameElement javascript variable for a faster access later
	
	bottomToolBarElement = document.getElementById("bottomToolBar");					//Stores the bottomToolBar HTML element inside the bottomToolBarElement javascript variable for a faster access later
	pointsElement = document.getElementById("points");									//Stores the points HTML element inside the pointsElement javascript variable for a faster access later
	scenaryInputElement = document.getElementById("scenaryInput");						//Stores the scenaryInput HTML element inside the scenaryInputElement javascript variable for a faster access later
	roleInputElement = document.getElementById("roleInput");							//Stores the roleInput HTML element inside the roleInputElement javascript variable for a faster access later
	resetGameButtonElement = document.getElementById("resetGameButton");				//Stores the resetGameButton HTML element inside the resetGameButtonElement javascript variable for a faster access later
	
	menuSectionElement = document.getElementById("menuSection");						//Stores the menuSection HTML element inside the menuSectionElement javascript variable for a faster access later
}	

/* This Function:
 * Initializes the gamePlayableScenary and the gameNotPlayableScenary javascript variables 
 * Add the default values (which are going to be shown) to the gamePlayableScenary Set
 * Add the default values (which are going to be hidden) to the gameNotPlayableScenary Set
 */
function gameTableArrayInit() {					
	gamePlayableScenary = new Set();								//Initializes gamePlayableScenary javascript variable to a new Set
	gameNotPlayableScenary = new Set();								//Initializes gameNotPlayableScenary javascript variable to a new Set
	
	for(const scenary of defaultGamePlayableScenaryArray) 			//For each default value in the defaultGamePlayableScenaryArray javascript variable
		gamePlayableScenary.add(scenary);							//Add it to the gamePlayableScenary javascript variable
	for(const scenary of defaultGameNotPlayableScenaryArray)		//For each default value in the defaultGameNotPlayableScenaryArray javascript variable
		gameNotPlayableScenary.add(scenary);						//Add it to the gameNotPlayableScenary javascript variable
}

/* This Function add all the Events handlers to the corresponding javascript variables assocciated to the corresponding HTML element */
function gameHandlersInit() {		
	window.addEventListener("resize", resetHeight);																				//Resets the height whenever the window's resized
	
	document.addEventListener("contextmenu", event => event.preventDefault(), {passive:false});									//Prevents the use of the Right-Click contextmenu on the HTML document 
	documentBodyElement.addEventListener("selectstart", event => event.preventDefault(), {passive: false});						//Prevens the user to select any documentBodyElement (except text inside the inputBoxes) when dragging the mouse over
	
	infoImageElement.addEventListener("click", showRules, {passive:true});														//Calls showRules when then infoImageElement is clicked
	
	topToolBarElement.addEventListener("wheel", event => event.preventDefault(), {passive: false});								//Prevents the scroll on the topToolBarElement with mousewheel
	topToolBarElement.addEventListener("touchmove", event => event.preventDefault(), {passive: false});							//Prevents the scroll on the topToolBarElement with touchscroll
	bottomToolBarElement.addEventListener("wheel", event => event.preventDefault(), {passive: false});							//Prevens the scroll on the bottomToolBarElement with mousewheel
	bottomToolBarElement.addEventListener("touchmove", event => event.preventDefault(), {passive: false});						//Prevents the scroll on the bottomToolBarElement with touchscroll
	
	timerElement.addEventListener("mousedown", updateOnClick, {passive:false});													//Calls updateOnClick when the timerElement is clicked
	timerElement.addEventListener("wheel", updateOnWheel, {passive:false});														//Calls updateOnWheel when the timerElement is scrolled with the mouse wheel
	timerElement.addEventListener("touchstart", touchStartInitialization, {passive: false});									//Calls touchStartInitialization when pointsElement is first touched 
	timerElement.addEventListener("touchmove", event => updateOnTouchScroll(event, -1), {passive: false});						//Calls updateOnTouchScroll with the inverted scrolling direction when the timerElement is scrolled with the mouse wheel				
	
	pointsElement.addEventListener("mousedown", updateOnClick, {passive: false});												//Calls updateOnClick when the pointsElement is clicked
	pointsElement.addEventListener("wheel", updateOnWheel, {passive: false});													//Calls updateOnWheel when the pointsElement is scrolled with the mouse wheel
	pointsElement.addEventListener("touchstart", touchStartInitialization, {passive: false});									//Calls touchStartInitialization when pointsElement is first touched 
	pointsElement.addEventListener("touchmove", event => updateOnTouchScroll(event, 1), {passive: false});						//Calls updateOnTouchScroll with the actual scrolling direction when the pointsElement is scrolled with the mouse wheel
	
	scenaryInputElement.addEventListener("input", checkScenaryInput);
	roleInputElement.addEventListener("input", checkRoleInput);
	
	resetGameButtonElement.addEventListener("click", resetGame, {passive:true});												//Calls resetGame when the resetGameButtonElement is clicked
	endGameButtonElement.addEventListener("click", endGame, {passive: true});													//Calls endGame when the endGameButtonElement is clicked
}

/* This function initializes all the game's images in 3 steps:
 * 1) If needed the HTML element is created 
 * 2) The HTML attributes of the element are set (es. scr, id, alt)
 * 3) If needed a event handler is added to the javascript variable associated the HTML img element
 */
function imagesInit() {
	infoImageElement.src = "./images/info.jpg";																		//The source of the HTML image associated with the infoImageElement javascript variable is set 
	infoImageElement.alt = "Info";																					//The alternative text of the HTML image associated with the infoImageElement javascript variable is set
	
	logoImageElement = document.createElement("img");																//The HTML img element associated with the logoImageElement javascript variable is created 
	logoImageElement.src = "./images/spylogo.jpg";																	//The source of the HTML image associated with the logoImageElement javascript variable is set 
	logoImageElement.setAttribute("id", "logo");																	//The HTML img element assocciated with the logoImageElement is given an id attribute 
	logoImageElement.alt = "Spyfall";																				//The alternative text of the HTML image associated with the logoImageElement javascript variable is set
	
	timerImageElement.src = "./images/timer.jpg";																	//The source of the HTML image associated with the timerImageElement javascript variable is set 
	timerImageElement.alt = "Timer";																				//The alternative text of the HTML image associated with the timerImageElement javascript variable is set
	timerImageElement.addEventListener("mousedown", event => {
		if(event.button == 1)
			showMessage("EASTER EGG", "Il Tempo è denaro, non sprecarlo !");
		rewindTimer();
	}, {passive:true});																								//Calls rewindTimer when the timerImageElement is clicked 
	
	timerPlayButtonElement = document.createElement("img");															//The HTML img element associated with the timerPlayButtonElement javascript variable is created 
	timerPlayButtonElement.src = "./images/playButton.jpg";															//The source of the HTML image associated with the timerPlayButtonElement javascript variable is set 
	timerPlayButtonElement.setAttribute("id", "timerButton");														//It's ok to set the same ID as timerPauseButtonElement because they'll never be in HTML document at the same time
	timerPlayButtonElement.alt = "Play";																			//The alternative text of the HTML image associated with the timerPlayButtonElement javascript variable is set
	timerPlayButtonElement.addEventListener("click", changeTimerState, {passive:true});								//Calls changeTimerState when the timerPlayButtonElement is clicked 
	
	timerPauseButtonElement = document.createElement("img");														//The HTML img element associated with the timerPauseButtonElement javascript variable is created 
	timerPauseButtonElement.src = "./images/pauseButton.jpg";														//The source of the HTML image associated with the timerPauseButtonElement javascript variable is set 
	timerPauseButtonElement.setAttribute("id", "timerButton");														//It's ok to set the same ID as timerPlayButtonElement because they'll never be in HTML document at the same time
	timerPauseButtonElement.alt = "Pause";																			//The alternative text of the HTML image associated with the timerPauseButtonElement javascript variable is set
	timerPauseButtonElement.addEventListener("click", changeTimerState, {passive:true});							//Calls changeTimerState when the timerPauseButtonElement is clicked 						

	timerSectionElement.appendChild(timerPlayButtonElement);														//The timerButton HTML element inside the timerSection HTML element is set to the timerPlayButtonElement by default
}		
	
/* This Function resets the body height to that of the inner browser
 * This is used to fix the different height behaviour of the mobile browsers' navigation bars 
 */
function resetHeight(){
	documentBodyElement.style.height = window.innerHeight + "px";
}
	
/* This Function activates on a touchEvent and:
 * prevents the user to select any HTML element by long pressing or moving the finger
 * updates the previousTouch javascript variable to the last detected touch 
 */
function touchStartInitialization(event) {
	event.preventDefault();											//Prevents the text selection with a long press and every default touchEvent response
	previousTouch = event.targetTouches[0];							//Updates the previousTouch javascript variable to the last detected touch 
}

/* This Function calls the scroll function on the touchmoveEvent's target whenever a fingers travel a total distance of deltaYforScroll pixels since the first touch
 * The scroll function is called by passing it the Y variation (since the first touch) multiplied by the passed scrollingDirection
 * If scrollingDirection is a positive number the scroll function will follow the finger's scrolling direction
 * If scrollingDirection is a negative number the scroll function will follow the finger's opposite scrolling direction
 * When the finger has traveled a total distance of deltaYforScroll since the first touch the previousTouch javascript variable is updated resetting the finger's traveled distance
 */
function updateOnTouchScroll(event, scrollingDirection) {					
	event.preventDefault();											//Prevents the document to scroll 
	let currentTouch = event.targetTouches[0];						//Stores inside the currentTouch javascript variable the last detected touch object
	let delta = currentTouch.clientY - previousTouch.clientY;		//The distance the finger traveled on the Y axis from the first touch of the touchEvent
	let deltaYforScroll = event.target.offsetHeight/2;				//The number of pixels the user has to move his finger through in order to trigger a scroll on the element is equal to the element height / 2
	
	if(delta > deltaYforScroll || delta < -deltaYforScroll) {		//Every deltaYforScroll pixels upward or downward on the Y axis (this check is usefull to have a linear and controlled scroll indipendent by the speed of finger's movement)
		if(menuSectionElement.innerHTML == "") 						//If the user didn't trigger any popUpMenu during the movement
			scroll(delta * scrollingDirection, event.target.id);	//The scroll function is called by passing it the delta (its sign is the only thing that matters) and the touchEvent target's id
		previousTouch = currentTouch;								//The finger's travel is reset by setting the previousTouch javascript variable equals to the last detected touch
	}
}	
		
/*This function creates a table inside the "game"-class element containing all the gamePlayableScenary elements */		
function createGameTable(title) {	
	gameTableButtonSectionElement = document.createElement("div");						
	gameTableButtonSectionElement.setAttribute("class", "menuButtonSection");																		//If it's not the first time we create the game table																		//The gameTable's title is saved 
	gameElement.innerHTML = "";	
	
	if(title != null) 																																//Before creating any table the game div element should empty
		gameElement.appendChild(title);
	
	//If some scenaries have not been selected a button to add them will appear after the gameTable
	if(gameNotPlayableScenary.size) 	
		gameTableButtonSectionElement.appendChild(getButton("addGameScenaryButton", "modifyGameScenaryButton", "+", showScenaryNotChosenMenu));		//Add the addGameScenaryButton to the game's div					
	
	//If some scenaries have been selected a button to remove them will appear after the gameTable
	if(gamePlayableScenary.size) 
		gameTableButtonSectionElement.appendChild(getButton("removeGameScenaryButton", "modifyGameScenaryButton", "-", showScenaryChosenMenu));		//Add the removeGameScenaryButton to the game's div		
	
	gameTableElement = getFormattedTableFromArray(gameTableColCount, gamePlayableScenary, "gameBoxNotSelected", "");
	
	gameElement.appendChild(gameTableElement);    																									//Add the gameTable to the game's div
	gameElement.appendChild(gameTableButtonSectionElement);				
}

function showRules() {
	let titleSection = logoImageElement;
	titleSection.style.height = "6em";	
	titleSection.addEventListener("mousedown", event => {
		if(event.button == 0)
			window.open("https://spyfall.adrianocola.com/");																		//Opens the actual game page in a new tab when the logoImageElement is clicked with the left mouse button
		else if(event.button == 1) 
			window.open("https://cristiandavideconte.github.io/myPersonalWebPage/");												//Opens my website in a new tab when the logoImageElement is clicked with the middle mouse button
	}, {passive:true});		
	
	let content = document.createElement("div");
	for(const line of gameRulesHTMLElements)
		content.innerHTML += line;
	
	showPopUpMenu(titleSection, 
					content, 
					[getButton("confirmButton", "menuButton", "Chiudi", removeMenuAndRestoreMainPage)], 
					new Map([["keydown", (event) => {	event.stopPropagation();
														let keyPressed = event.key;
														if(keyPressed == "Enter" || keyPressed == "Escape") {
															removeMenuAndRestoreMainPage();
															return;
														}

														if(keyPressed == "F5") {
															location = location;						//Allows a page refresh inside the menu
															return;
														}
													}
							]])
			);
}

function showScenaryNotChosenMenu() {			
	let titleSection = document.createElement("h2");													//Creates the menu's title
	titleSection.innerHTML = "Aggiungi Scenari";	
	let menuTable = getFormattedTableFromArray(modifyGameScenaryTableColCount, gameNotPlayableScenary, "gameBoxSelected", "fromMenu");		
	showPopUpMenu(titleSection, 
					menuTable, 	
					[getButton("confirmButton", "menuButton", "Conferma", () => {
																				confirmButtonHandler();
																				if(!isBrowserEdge()) 
																					gameElement.scrollTo({
																						top: 0,
																						behavior: "smooth"
																					});	
					}), 
					 getButton("selectAllButton", "menuButton", "Seleziona Tutti", function () {
																					let cells = new Set();
																					for(let row of menuTable.rows)
																						for(let cell of row.cells)
																							cells.add(cell);
																					changeGameTableStates(cells, "gameBoxSelected", "gameBoxNotSelected");
																				 }
					 ),
					getButton("cancelButton", "menuButton", "Annulla", () => {
																				removeMenuAndRestoreMainPage();
																				if(!isBrowserEdge()) 
																					gameElement.scrollTo({
																						top: gameElement.scrollHeight,
																						behavior: "smooth"
																					});	
					})],
					new Map([["keydown", (event) => {	event.stopPropagation();
					
														let keyPressed = event.key;
														if(keyPressed == "Enter") {
															confirmButtonHandler();
															return;
														}
														if(keyPressed == "Escape") {
															removeMenuAndRestoreMainPage();
															return;
														}
														if(keyPressed == "F5") {
															location = location;						//Allows a page refresh inside the menu
															return;
														}
													}
							]])
				);			
}	
			
function showScenaryChosenMenu() {	
	let titleSection = document.createElement("h2");													//Creates the menu's title
	titleSection.innerHTML = "Rimuovi Scenari";
	let menuTable = getFormattedTableFromArray(modifyGameScenaryTableColCount, gamePlayableScenary, "gameBoxNotSelected", "fromMenu");
	showPopUpMenu(titleSection, 
					menuTable,
					[getButton("confirmButton", "menuButton", "Conferma", () => {
																				confirmButtonHandler();
																				if(!isBrowserEdge()) 
																					gameElement.scrollTo({
																						top: 0,
																						behavior: "smooth"
																					});	
					}), 
					 getButton("selectAllButton", "menuButton", "Seleziona Tutti", function () {
																					let cells = new Set();
																					for(let row of menuTable.rows)
																						for(let cell of row.cells)
																							cells.add(cell);
																					changeGameTableStates(cells, "gameBoxNotSelected", "gameBoxSelected");
																				 }
					 ),
					getButton("cancelButton", "menuButton", "Annulla", () => {
																				removeMenuAndRestoreMainPage();
																				if(!isBrowserEdge()) 
																					gameElement.scrollTo({
																						top: gameElement.scrollHeight,
																						behavior: "smooth"
																					});	
					})],
					new Map([["keydown", (event) => {	event.stopPropagation();
														
														let keyPressed = event.key;
														if(keyPressed == "Enter") {
															confirmButtonHandler();
															return;
														}
														if(keyPressed == "Escape") {
															removeMenuAndRestoreMainPage();
															return;
														}
														if(keyPressed == "F5") {
															location = location;						//Allows a page refresh inside the menu
															return;
														}
													}
							]])
				);
}		

function showMessage(titleText, contentText) {	
	let titleSection = document.createElement("h2");													//Creates the menu's title
	titleSection.innerHTML = titleText;
	let content = document.createElement("h3");
	content.innerHTML = contentText;
	showPopUpMenu(titleSection, 
					content, 
					[getButton("confirmButton", "menuButton", "OK", removeMenuAndRestoreMainPage)], 
					new Map([["keydown", (event) => {	event.stopPropagation();
														let keyPressed = event.key;
														if(keyPressed == "Enter" || keyPressed == "Escape") {
															removeMenuAndRestoreMainPage();
															return;
														}

														if(keyPressed == "F5") {
															location = location;						//Allows a page refresh inside the menu
															return;
														}
													}
							]])
				);
}

/* This function creates a menu element, prevents action on elements other than the menu and makes those element a background content */
function showPopUpMenu(titleSection, content, buttonSection, menuEventsMap) {
	if(timerStarted) {
		changeTimerState();
		timerWasInterrupted = true;
	}
	
	if(menuOverlayElement == null) {
		menuOverlayElement = document.createElement("div");						
		menuOverlayElement.setAttribute("class", "popUpOverlay");
	}
	
	menuOverlayElement.addEventListener("click", removeMenuAndRestoreMainPage, {passive: false});
	menuElement = getPopUpMenu(titleSection, content, buttonSection, menuEventsMap);	
	menuSectionElement.appendChild(menuOverlayElement);
	menuSectionElement.appendChild(menuElement);
	for(const menuEventAndHandlerCupple of menuEventsMap.entries())
		menuElement.addEventListener(menuEventAndHandlerCupple[0], menuEventAndHandlerCupple[1], {passive: false});											//Creates the menu inside the HTML menu div
	
	topToolBarElement.classList.add("backgroundContent");										//Make the topToolBar a background content
	bottomToolBarElement.classList.add("backgroundContent");									//Make the bottomToolBar a background content
	gameElement.classList.add("backgroundContent");												//Make the game a background content
	
	document.addEventListener("wheel", preventNonMenuElementFromScrolling, {passive: false});
	document.addEventListener("touchmove", preventNonMenuElementFromScrolling, {passive: false});
	document.addEventListener("keydown", shiftFocusToMenu);																
}

/* This function creates an HTML button with the given id, class, text and Eventhandler
 * buttonID can be "" if not present
 * buttonClass can be "" if not present
 * buttonText can be "" if not present
 * buttonHandler has to be passed. It can evenctually be null
 */
function getButton(buttonId, buttonClass, buttonText, buttonHandler) {
	let button = document.createElement("button");
	if(buttonId != "")
		button.setAttribute("id", buttonId);
	if(buttonClass != "")	
		button.setAttribute("class", buttonClass);
	if(buttonText != "")
		button.innerHTML = buttonText;
	button.addEventListener("click", buttonHandler, {passive: false});
	return button;
}


/* This function returns a styled menu with a title, a content, an array of buttons below it and that reacts to keyboards events*/
function getPopUpMenu(title, content, buttonsArray) {
	let menu = document.createElement("div");
	let titleSection = document.createElement("div");
	let contentSection = document.createElement("div");
	let buttonSection = document.createElement("div");
	
	titleSection.setAttribute("class", "menuTitleSection");				
	titleSection.appendChild(title);			
	titleSection.addEventListener("wheel", event => event.preventDefault(), {passive: false});								//Prevents the scroll on the titleSection with mousewheel
	titleSection.addEventListener("touchmove", event => event.preventDefault(), {passive: false});							//Prevents the scroll on the titleSection with touchscroll
	
	contentSection.setAttribute("class", "menuContentSection");
	contentSection.appendChild(content);
	
	buttonSection.setAttribute("class", "menuButtonSection");
	for(const button of buttonsArray)
		buttonSection.appendChild(button);			
	buttonSection.addEventListener("wheel", event => event.preventDefault(), {passive: false});							//Prevens the scroll on the buttonSection with mousewheel
	buttonSection.addEventListener("touchmove", event => event.preventDefault(), {passive: false});						//Prevents the scroll on the buttonSection with touchscroll

	menu.setAttribute("class", "menu");	
	menu.appendChild(titleSection);
	menu.appendChild(contentSection);
	menu.appendChild(buttonSection);
		
	return menu;		
}
			
/* This Function returns an HTML table with:
 * The given columnsNum as the number of columns
 * The given optionsSet's elements as the td 
 * The given cellClass as the HTML class of each td
 */
function getFormattedTableFromArray(columnsNum, optionsSet, cellClass, idModifier){
	let table = document.createElement("table");												//Creates the table
	let optionSetSize = optionsSet.size;
	
	let rowCounter = -1;																		//Tells you at what row number you are at
	let cellCounter;																			//Tells you at what cell number you are at				
	let tr,i;																					//Loop's TableRow element and counter
	
	let option = optionsSet.values();
	
	for(i = 0; i < optionSetSize; i++) {			
		if(i % columnsNum == 0) {
			rowCounter++;
			cellCounter = 0;
			tr = table.insertRow(rowCounter);          											//The table row element						
		}
		
		let cellId = option.next().value;
		let td = tr.insertCell(cellCounter);	
	
		td.setAttribute("id", cellId + idModifier);	
		td.setAttribute("class", cellClass);	
		td.innerHTML = cellId;
		td.addEventListener("click", changeGameBoxState, {passive: false});
		cellCounter++;				
	}
	
	return table;
}

function confirmButtonHandler() {
	let menuScenaryTable = new Array();
	let gamePlayableScenaryRemoved = false;							//Indicates if at least one element of the menuScenaryTable has been selected -> used for scenary removal
	let rows = document.getElementsByClassName("menuContentSection")[0].firstChild.rows;
	
	for(const row of rows) {
		const cells = row.cells;
		for(const cell of cells) { 
			const id = cell.id.replace("fromMenu","");	//Remove the part from the cellId that refers to the menu elements in order to use the id for referring the corresponding gameTable elements
			if(cell.className == "gameBoxNotSelected") {//NotSelected means the user disable the gameBox or didn't enable it	
				/* If the gameBox has not been selected, the gameScenaryArrays should be updated only when gamePlayableScenary doesn't have the Scenary 						
				 * This means the player is trying to add a new scenary to the game and that the gameTable should be modified
				 */
				if(!gamePlayableScenary.has(id)) {					
					gamePlayableScenary.add(id);
					gameNotPlayableScenary.delete(id);	
					
					let td;
					let gameTableElementRowNumber = gameTableElement.rows.length;
					let gameTableElementLastRow = gameTableElement.rows[gameTableElementRowNumber-1];
					let gameTableElementLastRowCellsNumber;
					
					if(gameTableElementLastRow != null) {
						gameTableElementLastRowCellsNumber = gameTableElementLastRow.cells.length;
															
						if(gameTableElementLastRowCellsNumber < gameTableColCount) 
							td = gameTableElementLastRow.insertCell(gameTableElementLastRowCellsNumber);
						else 
							td = gameTableElement.insertRow(gameTableElementRowNumber).insertCell(0);
					} else 									
						td = gameTableElement.insertRow(0).insertCell(0);					//If the gameTableLastRow is null it means there is no element in my gameTable
					
					td.setAttribute("id", id);	
					td.setAttribute("class", "gameBoxNotSelected");	
					td.innerHTML = id;
					td.addEventListener("click", changeGameBoxState, {passive: false});
				}

			} else {							
				/* If the gameBox has been selected, the gameScenaryArrays should be updated only when gamePlayableScenary has the Scenary 						
				 * This means the player is trying to remove a new scenary from the game and that the gameTable should be modified
				 */
				if(gamePlayableScenary.has(id)) {
					gamePlayableScenary.delete(id);
					gameNotPlayableScenary.add(id);
					if(!gamePlayableScenaryRemoved)
						gamePlayableScenaryRemoved = true;
				}
			}
		}
	}
					
	if(gamePlayableScenaryRemoved)									//This becomes true only when the user removes a scenary		
		createGameTable(gameElement.firstChild);					//Pass it its own title
	else {															
		gameTableButtonSectionElement.innerHTML = "";
		//If some scenaries have not been selected a button to add them will appear after the gameTable
		if(gameNotPlayableScenary.size) 	
			gameTableButtonSectionElement.appendChild(getButton("addGameScenaryButton", "modifyGameScenaryButton", "+", showScenaryNotChosenMenu));		//Add the addGameScenaryButton to the game's div					
		
		//If some scenaries have been selected a button to remove them will appear after the gameTable
		if(gamePlayableScenary.size) 
			gameTableButtonSectionElement.appendChild(getButton("removeGameScenaryButton", "modifyGameScenaryButton", "-", showScenaryChosenMenu));		//Add the removeGameScenaryButton to the game's div		
	}	
	
	removeMenuAndRestoreMainPage();	
}

/* This function removes the currently displayed menu and Restores the normal game's main page look and behavior */
function removeMenuAndRestoreMainPage() {
	if(timerWasInterrupted) {																				//If the timer was running before the menu appeared 
		timerWasInterrupted = false;																		//The timerWasInterrupted javascript variable is set to false
		changeTimerState();																					//The timer state is restored
	}
				
	menuOverlayElement.removeEventListener("click", removeMenuAndRestoreMainPage);							//Prevents the user to trigger this function twice by clicking the menu overlay again
	menuElement.removeChild(menuElement.lastChild);															//Prevents the user to trigger this function twice by clicking the menu buttons again
	
	setTimeout(() => {
		menuSection.innerHTML = "";																			//Remove the currently displayed popUpMenu from HTML menu div after it has animated
		menuOverlayElement.classList.remove("popUpOverlayDismissed");										//Remove the popUpOverlayDismissed class from the menuOverlayElement HTML element so that when it's used again it's not considered as "dismissed"
	}, 350);
	
	menuElement.classList.add("menuDismissed");																//Add the menuDismissed class to the menuElement HTML element so that it animates properly before being removed								 
	menuOverlayElement.classList.add("popUpOverlayDismissed");												//Add the popUpOverlayDismissed class to the popUpOverlay HTML element so that it animates properly before being removed	

	let backgroundContentElements = document.getElementsByClassName("backgroundContent");					//Stores the background contents collection inside a variable for a faster access later
	while(backgroundContentElements.length)																	//For each background content
		backgroundContentElements[0].classList.remove("backgroundContent");									//Remove the backgroundContent class from it
					
	document.removeEventListener("wheel", preventNonMenuElementFromScrolling);								//Removes the preventNonMenuElementFromScrolling WheelEventListener from the document so that the normal wheel scrolling behavior is restored
	document.removeEventListener("touchmove", preventNonMenuElementFromScrolling);							//Removes the preventNonMenuElementFromScrolling TouchMoveEventListener from the document so that the normal touch scrolling behavior is restored
	document.removeEventListener("keydown", shiftFocusToMenu);												//Removes the shiftFocusToMenu KeyDownEventListener from the document so that the keydown events normal behavior is restored
}

/* This Function:
 * Consumes the passed event for the current target 
 * Clones it 
 * Passes the the clone event to the menuElement
 * No particular checks are done inside the function: if the menuElement hasn't been initialized or it's null an exception will be raised
 */
function shiftFocusToMenu(event) {
	event.preventDefault();												//Prevents the event's default behavior 
	let menuEvent = new event.constructor(event.type, event);			//Clones the passed event and stores it inside a variable
	menuElement.dispatchEvent(menuEvent);								//Dispatch the cloned event to the menuElement
}

/* This Function prevents the scrolling out of the currently displayed menu 
 * No particular checks are done inside the function, it's better to use it only when there are other elements other than the Body and the HTML
 * Otherwise the scroll will be broken 
 */
function preventNonMenuElementFromScrolling(event) {
	let targetTagName = event.target.tagName;							//Stores the event target's tagName for faster access later
	if(targetTagName == "HTML" || targetTagName == "BODY")				//If the scroll happens on the body or the html (which means the cursor is out of the menu) 
		event.preventDefault();											//The scroll is prevented 
}

/* This Function sets all the cells of the gameTable element inside the HTML game element that have oldClass as their only class to newClass */
function changeGameTableStates(gameTableElementsToReset, oldClass, newClass) {
	for(let element of gameTableElementsToReset) 							//For each element inside the iterable gameTableElementsToReset passed
		if(element.className == oldClass)									//If the class of the element is equals to oldClass
			element.className = newClass; 									//It gets changed to newClass
}

/* This function resets all the document's inputBox elements's text fields */
function resetInputs() {
	let elementsToReset = document.getElementsByClassName("inputBox");		//Stores the document's inputBox collection inside the elementsToReset javascript variable for a faster access later	
	let max = elementsToReset.length;										//Stores the elementsToReset collection lenght inside the max javascript variable for a faster access later
	let i;																	//The index of the for-loop (a classic for-loop is needed to change the elements HTML value attribute)

	for (i = 0; i < max; i++) 												//For every element inside elementsToReset
		elementsToReset[i].value = ""; 										//Set its HTML value attribute to "" (empties the text fields)
}

/* This functions:
 * Resets the timerRemaningMinutes javascript variable equals to the startingTime javascript variable which is the value the timer has started to count down from
 * Sets the value attribute of the HTML timer element to the startingTime javascript variable (the seconds are defaulted to :00)
 * Sets the timerHasBeenModified javascript variable to true
 * Calls the changeTimerState if needed
 */
function rewindTimer() {
	timerRemaningMinutes = startingTime;									//Reset the timerRemaningMinutes javascript variable equals to the startingTime javascript variable which is the value the timer has started to count down from
	timerElement.value = startingTime + ":00";								//Set the value attribute of the HTML timer element to the startingTime javascript variable (the seconds are defaulted to :00)
	timerHasBeenModified = true;											//Sets the timerHasBeenModified javascript variable to true
	
	if(timerStarted) 														//If the timer was counting down when this function has been called 
		changeTimerState(); 												//Calls the changeTimerState
}

/* This Function resets the HTML game element to the state it was before the round was first started */
function resetGame() {
	changeGameTableStates(document.getElementsByTagName("td"), "gameBoxSelected", "gameBoxNotSelected");		//Calls changeGameTableStates and resets every cell's class of the HTML gameTable element to gameBoxNotSelected
	resetInputs();																								//Calls resetInputs to clear all inputBox HTML elements
	rewindTimer();																								//Calls rewindTimer to set the HTML timer element and all the javascript variable associated to it back to the values they had when this round started
}

/* This Function resets the HTML game element to its original state */
function endGame() {
	endGameButtonElement.removeEventListener("click", endGame);													//Prevents the user to trigger this function twice by clicking the endGameButton again
	
	const gameTableTitle = document.createElement("h1");														//The new gameTableTitle HTML h1 element is created							
	gameTableTitle.innerHTML = "Scenari";																		//The new gameTableTitle innerHTML is set 
	
	variablesInit();																							//Calls the variablesInit to reset all the game javascript variables back to the default state
	gameTableArrayInit();																						//Calls the gameTableArrayInit to reset the gamePlayableScenary and the gameNotPlayableScenary sets back to the default state		

	if(timerStarted)																							//If the timer was counting down when this function has been called 
		changeTimerState();																						//Calls the changeTimerState

	resetInputs();																								//Calls resetInputs to clear all inputBox HTML elements				
	resetVariable("timer");																						//Calls resetVariable passing the timer id so that the HTML timer element is set back to the default state
	resetVariable("points");																					//Calls resetVariable passing the points id so that the HTML points element is set back to the default state

	if (!isBrowserEdge()) {
		setTimeout(() => endGameButtonElement.addEventListener("click", endGame,{passive: true}), 400)				//The endGameButton behavior (when clicked) is restored	after the transition
		setTimeout(() => createGameTable(gameTableTitle), 200);														//After waiting the first half of the transition the new gameTable is created by calling the createGameTable and passing it the just created title
		gameElement.animate([																						//Animates the old gameTable (after half of the transition the old gameTable will be swapped with the new one): 3d version uses the GPU instead of the CPU
				{offset: 0.0, "transform": "translate3d(0, 0, 0)", opacity:1},										//Starting position and opacity
				{offset: 0.5, "transform": "translate3d(200vw,0, 0)", opacity:0},									//After half the transition time the gameTable will be translated to the right (out of the window) where the new gameTable is created
				{offset: 0.51, "transform": "translate3d(-100vw, 0, 0)", opacity:0},								//It gets moved to the left of the visible window (but keeping the opacity to 0) so that it looks the new gameTable was always there					
				{offset: 1, "transform": "translate3d(0, 0, 0)", opacity:1}											//The new gameTable is moved back to the original gameTable position and its opacity is increased to 1 so that it can be visible again
		], { 
		  duration: 400,																							//The transition lasts 400milliseconds
		});
	} else {
		endGameButtonElement.addEventListener("click", endGame,{passive: true});
		createGameTable(gameTableTitle);
	}
}

/* This Function updates:
 * The countDown function timeout
 * The timerButton HTML element inside the timerSection HTML element 
 * The timerStarted javascript variable state
 */
function changeTimerState() {
	if(timerStarted) {																				//If the timer has begun counting down
		clearTimeout(timerTimeoutValue);															//Remove any timeout for the countDown function so that it won't be called again in 1second
		timerSectionElement.replaceChild(timerPlayButtonElement, timerSectionElement.lastChild);	//The timerButton HTML element inside the timerSection HTML element gets updated (the img is changed)
		timerStarted = false;																		//Updates the timerStarted javascript variable
	} else {																						//If the timer hasn't begun counting down yet
		timerTimeoutValue = setTimeout(countDown, 400);												//Set a new timeout for the countDown function so that it will called in 1second
		timerSectionElement.replaceChild(timerPauseButtonElement, timerSectionElement.lastChild);	//The timerButton HTML element inside the timerSection HTML element gets updated (the img is changed)
		timerStarted = true;																		//Updates the timerStarted javascript variable
	}
}

/* This Function updates the HTML timer element value and the javascript variables associated with it
 * Must be called only when the timer has started because it doesn't have an internal check.
 * If the timer value has been modified by the user this function takes care of the javascript variables updating process
 * Once the timer value reaches 0:00 this function will restore it and javascript variables assocciated with it to the default values
 * All the math inside this function is in milliseconds
 */
function countDown() {
	if(timerHasBeenModified) {															//First check if the timer's value has been modified by the user
		startingTimerDate = Date.now();													//If so the startingTimerDate javascript variable is updated to the current time in milliseconds
		endingTimerDate = startingTimerDate + timerRemaningMinutes * 60 * 1000;			//Then the endingTimerDate javascript variable is updated by converting the new timer value into milliseconds and by adding it to the startingTimerDate
		timerHasBeenModified = false;													//At this point the function knows all the timer's assocciated values can be recalculated and sets the timerHasBeenModified javascript variable to false
	} else
		startingTimerDate += 1000;														//Otherwise, if the user didn't modify the timer we count down 1second

	timerRemaningSeconds = Math.floor((endingTimerDate - startingTimerDate) / 1000);	//The timerRemaningSeconds javascript variable is calculated by dividing the milliseconds between the endingTimerDate and the startingTimerDate by 1000 and then approximating the result (this number can be higher than 60)
	timerRemaningMinutes = Math.floor(timerRemaningSeconds / 60) % 60;					//The timerRemaningMinutes javascript variable is calculated by dividing the timerRemaningSeconds by 60, approximating the result and then getting rest of a division by 60 so that the numer of minutes is in the [0...59] range
	timerRemaningSeconds %= 60;															//The timerRemaningSeconds javascript variable is divided by 60 and the rest is the number of seconds remaning in the [0...59] range

	if(timerRemaningMinutes > 0 || timerRemaningSeconds >= 0)   {						//If there's time left
		timerElement.value = (timerRemaningSeconds < 10) ? timerRemaningMinutes + ":0" + timerRemaningSeconds : timerRemaningMinutes + ":" + timerRemaningSeconds;	//Updates HMTL timer element value taking care of having always displayed 2 digits for the seconds
		timerTimeoutValue = setTimeout(countDown, 1000);								//The countDown will be called again in 1second
	} else {																			//If there's no time left
		timerRemaningMinutes = startingTime;											//Updates the timerRemaningMinutes javascript variable to the value this timer started counting down from
		timerElement.value = timerRemaningMinutes + ":00";								//Updates HTML timer element value
		changeTimerState();																//Call the changeTimerState that will handle the timeout reset and the timerButton update 
		timerHasBeenModified = true;													//The timer's has been modified by this else statement so the timerHasBeenModified javascript variable has to be updated
		showMessage("TIMER SCADUTO", "È arrivata la tua ora !");						//Tell the user about it					
	} 
}

/* This Function is a wheel even handler for the wheelEvent
 * The action will be delegated to the scroll function
 * This function is mainly used to update the points and the timer's HTML elements values
 */
function updateOnWheel(event) {
	event.preventDefault();								//The default action is prevented 
	scroll(event.deltaY, event.target.id);				//The scroll function is called by passing it the deltaY of the scroll and the id of the event's target
}

/* This Function analizes the passed delta number and 
 * based on its sign will call a specific handler
 * Id is the event's target id.
 */
function scroll(delta, id) {
	if(delta < 0) {										//If the scroll is going upward (the top of the window is the 0, our Y is getting closer to it)
		changeVariableUp(id);							//The changeVariableUp function will be called by passing it the given id
		return;											//There's no need to check anything else because a scroll has one direction at a time
	}
	
	if(delta > 0) {										//If is going downward (the top of the window is the 0, our Y is getting more far from it)
		changeVariableDown(id);							//The changeVariableDown function will be called by passing it the given id
		return;											//There's no need to check anything else because a scroll has one direction at a time
	}
}

/* This Function is a click even handler for the mouseEvent
 * The action will be delegated to the specific button handler
 * This function is mainly used to update the points and the timer's HTML elements values
 */
function updateOnClick(event){
	event.preventDefault();						//The default action is prevented 
	event.stopPropagation();					//The event should be handled only by the functions below
	let id = event.target.id;					//The event's target id is stored for performance purpose
	let buttonPressedNumber = event.button;		//The event's button number is stored for performance purpose
	
	if(buttonPressedNumber == 0) {				//If the event's button is the left mouse button
		changeVariableUp(id);					//The changeVariableUp handler is called with the event's target id
		return;									//There's no need to check anything else because only one button at a time can be pressed
	}
	
	if(buttonPressedNumber == 2) {				//If the event's button is the right mouse button
		changeVariableDown(id);					//The changeVariableDown handler is called with the event's target id
		return;									//There's no need to check anything else because only one button at a time can be pressed
	}
	
	if(buttonPressedNumber == 1) {				//If the event's button is the middle mouse button
		resetVariable(id);						//The resetVariable handler is called with the event's target id
		return;									//There's no need to check anything else because only one button at a time can be pressed
	}
}

/* This Function reverses the state of gameBox HTML Element by changing its class 
 * to gameBoxSelected if it was selected or 
 * to gameBoxSelected otherwise 
 */
function changeGameBoxState(event) {
	event.preventDefault();												//The click should not be propagated to other HTML elements (i.e. the background content behind menu's with gameBoxes)
	let gameBox = event.target;											//A javascript variable is associated with the target of the click
	
	if(gameBox.className == "gameBoxNotSelected")						//If the gameBox was notSelected
		gameBox.className = "gameBoxSelected";							//It becomes Selected
	else																//If the gameBox was Selected
		gameBox.className = "gameBoxNotSelected";						//It becomes notSelected
}

/* This Function takes an id and if it's in a Set of HTML ids 
 * resets the value of the corresponding associated javascript variable and 
 * updates all the elements associated with it
 */
function resetVariable(id) {
	if(id == "points") {												//"points" is the id of the HTML input field in the bottomToolBar associated with the javascript pointsElement variable					
		if(points) {													//If the points javascript variable value is already at 0 there's no need to update it
			points = 0;													//The javascript points variable is reset to 0
			pointsElement.value = "0";									//The HTML points input field is updated with the new value
		}
		return;															//There's no need to check other options because the HTML elements' ids are unique 
	}

	if(id == "timer" & !timerStarted) {									//"timer" is the id of the HTML input field in the topToolBar associated with the javascript topToolBarElement variable and can be modified only when it's not running
		if(timerRemaningMinutes != timerMinValue) {						//If the timer javascript variable value is already at the minumum allowed value there's no need to update it
			timerRemaningMinutes = timerMinValue;						//The javascript timer variable value is reset to the timerMinValue
			startingTime = timerMinValue;								//The javascript startingTime variable is updated to the new timer value so that when we'll press the resetGameButton the timer will be restore to the correct value
			timerElement.value = timerRemaningMinutes + ":00";			//The HTML timer input field's value is updated: is faster to add ":00" than to look for the timerRemaningSeconds javascript variable value
			timerHasBeenModified = true;								//The javascript timerHasBeenModified variable is set to true so that the next time the countDown function will be called it will work correctly
		}
		return;															//There's no need to check other options because the HTML elements' ids are unique 
	}
}

/* This Function takes an id and if it's in a Set of HTML ids 
 * increases the value of the corresponding associated javascript variable and 
 * updates all the elements associated with it
 */
function changeVariableUp(id) {
	if(id == "points") {												//"points" is the id of the HTML input field in the bottomToolBar associated with the javascript pointsElement variable
		if(points < 99)													//The maximum allowed ammount of points in the game is 99 and the javascript points variable is increased only when its lower than that number
			points++;													//The javascript points variable is increased by 1
		else {															//If the user tries to set an incorrect value: EASTER EGG	
			points = 0;													//The points are reset to 0 ehehehe
			showMessage("EASTER EGG", "Sei troppo forte...sicuro di non star barando?");		
		}
		pointsElement.value = points;									//The HTML points input field is updated with the new value
		return;															//There's no need to check other options because the HTML elements' ids are unique 
	}

	if(id == "timer" & !timerStarted) {									//"timer" is the id of the HTML input field in the topToolBar associated with the javascript topToolBarElement variable and can be modified only when it's not running
		if(timerRemaningMinutes < 59) {									//The maximum allowed ammount of timer's minutes in the game is 59 and the javascript timer variable is increased only when its lower than that number
			timerRemaningMinutes++;										//The javascript timer variable is increased by 1
			startingTime = timerRemaningMinutes;						//The javascript startingTime variable is updated to the new timer value so that when we'll press the resetGameButton the timer will be restore to the correct value
		} else {														//If the user tries to set an incorrect value: EASTER EGG	
			timerRemaningMinutes = timerMinValue; 						//The timer value is reset to the timerMinValue ehehehe							
			startingTime = timerRemaningMinutes;						//The startingTime value is reset to the timerMinValue as well to avoid problems ehehehe
			showMessage("EASTER EGG", "Vuoi stare qui fino a domani? Io no...");		
		}

		timerElement.value = timerRemaningMinutes + ":00";				//The HTML timer input field's value is updated: is faster to add ":00" than to look for the timerRemaningSeconds javascript variable value
		timerHasBeenModified = true;									//The javascript timerHasBeenModified variable is set to true so that the next time the countDown function will be called it will work correctly
		return;															//There's no need to check other options because the HTML elements' ids are unique 
	}
}

/* This Function takes an id and if it's in a Set of HTML ids 
 * lowers the value of the corresponding associated javascript variable and 
 * updates all the elements associated with it
 */
function changeVariableDown(id) {
	if(id == "points") {										//"points" is the id of the HTML input field in the bottomToolBar associated with the javascript pointsElement variable
		if(points > 0) {										//If the points are <= 0 there's no need to do anything
			points--;											//The javascript points variable is decremented by 1
			pointsElement.value = points;						//The HTML points input field is updated with the new value
		} else  
			showMessage("EASTER EGG", "Contali meglio...");
		return; 												//There's no need to check other options because the HTML elements' ids are unique 
	}

	if(id == "timer" & !timerStarted) {							//"timer" is the id of the HTML input field in the topToolBar associated with the javascript topToolBarElement variable and can be modified only when it's not running
		if(timerRemaningMinutes > timerMinValue) {				//If the timer is already set to the minumum accepted value there's no need to update its value			
			timerRemaningMinutes--;								//The javascript timer variable is decremented by 1
			startingTime = timerRemaningMinutes;				//The javascript startingTime variable is updated to the new timer value so that when we'll press the resetGameButton the timer will be restore to the correct value
			timerElement.value = timerRemaningMinutes + ":00";	//The HTML timer input field's value is updated: is faster to add ":00" than to look for the timerRemaningSeconds javascript variable value
			timerHasBeenModified = true;						//The javascript timerHasBeenModified variable is set to true so that the next time the countDown function will be called it will work correctly
		} else 
			showMessage("EASTER EGG", "Fidati, ti serve tempo...");//If the user tries to set an incorrect value: EASTER EGG						
		return;													//There's no need to check other options because the HTML elements' ids are unique 
	}
}				


function isBrowserEdge() {
	let chrome = navigator.userAgent.search("Chrome") == 81;
	return chrome && navigator.userAgent.search("Edge") == 116;
}

function checkScenaryInput() {
	if(scenaryInputElement.value == "Casa di Ana") {
		showMessage("EASTER EGG", "Qualcuno ha detto festa? &#127881");
		return;
	}
	
	if(scenaryInputElement.value == "Casa di Daniel") {
		showMessage("EASTER EGG", "Relax & Chill &#128083");
		return;
	}
	
	if(scenaryInputElement.value == "Casa di Mike") {
		showMessage("EASTER EGG", "Prepara il barbeque &#128527");
		return;
	}	
	
	if(scenaryInputElement.value == "Casa di Sara") {
		showMessage("EASTER EGG", "Ti vanno Pizza, Risiko e Tabu ? &#128523");
		return;
	}
	
	if(scenaryInputElement.value == "Casa di Pietro") {
		showMessage("EASTER EGG", "Occhio al cane, cercerà di suicidarsi per le scale &#129300");
		return;
	}
	
	if(scenaryInputElement.value == "Casa di Lollo") {
		showMessage("EASTER EGG", "Non far scappare la Lola &#128054");
		return;
	}
	
	if(scenaryInputElement.value == "Casa di Cri") {
		showMessage("EASTER EGG", "Di Sua Maestà volevi dire &#129332");
		return;
	}
}

function checkRoleInput() {
	if(roleInputElement.value == "Ana"){
		window.open("https://it.wikipedia.org/wiki/Ipersonnia");
		return;
	}
	
	if(roleInputElement.value == "Daniel"){
		window.open("https://it.wikipedia.org/wiki/Afasia");
		return;
	}
	
	if(roleInputElement.value == "Mike"){
		window.open("https://it.wikipedia.org/wiki/Alopecia_androgenetica");
		return;
	}
	
	if(roleInputElement.value == "Sara"){
		window.open("https://it.wikipedia.org/wiki/Nanismo");
		return;
	}
	
	if(roleInputElement.value == "Pietro" || roleInputElement.value == "Gay"){
		window.open("https://it.wikipedia.org/wiki/Omosessualit%C3%A0");
		return;
	}
	
	if(roleInputElement.value == "Lollo"){
		window.open("https://it.wikipedia.org/wiki/Paranoia");
		return;
	}
	
	if(roleInputElement.value == "Cri"){
		window.open("https://it.wikipedia.org/wiki/Disturbo_narcisistico_di_personalit%C3%A0");
		return;
	}
}