
// global variables
////////////////////////////////////////////////////////////////////////////////
var cards = [];
var player = [];
var dealer = [];
var winner = "";
////////////////////////////////////////////////////////////////////////////////

function card(name, suit, prop){

	this.name = name;
	this.suit = suit;
  this.cssClass = suit + "_" + name;
}

// deck creation, will return array of 52 cards in order.
function deck(){
  //console.log("asdasd");
  $('#hit').removeAttr('disabled');
  $('#stand').removeAttr('disabled');
  $('#double').removeAttr('disabled');
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( this.names[n], this.suits[s]) );
        }
    }
		//console.log(cards);
    return cards;
}
// fisher yates shuffle algorithm
function shuffle() {
  var m = cards.length, t, i;


  while (m) {


    i = Math.floor(Math.random() * m--);


    t = cards[m];
    cards[m] = cards[i];
    cards[i] = t;
  }
  return cards;
  //console.log(cards);
}
// deals 1 card only, multiple hits can "bust" player.
function hit() {
  //console.log("hit");

  if (cards.length > 0)
     player.push(cards.shift());

  //console.log("hello");
    var totalPlayer = cardCounter(player);
  if (totalPlayer > 21){
    winner = "dealer";
    getWinner(winner);
  //  console.log("Player has busted");
  }
}
// deals 2 cards and populates global var player and dealer.
function deal() {
  var temp;
  if (cards.length > 0){
    dealer = cards.splice(0,2);
    player = cards.splice(0,2);
    //console.log(dealer,player);
  }
}

//count K/Q/J as 10, and count A as 11 if total is less than 11.
//
function cardCounter(cards) {

  var i, total;

  total = 0;

  // Total card values counting Aces as one.

  for (i = 0; i < cards.length; i++)

      if (cards[i].name == "J" || cards[i].name == "Q" ||
          cards[i].name == "K")
        total += 10;
      else
			if (cards[i].name != "A")
        total += parseInt(cards[i].name, 10);
        //console.log(total);

  // Change as many ace values to 11 as possible.

  for (i = 0; i < cards.length; i++)
    if (cards[i].name == "A" /*&& total <= 11*/)
    if (total <= 11)
      total += 11;
			else total += 1;
      // console.log(total);
  return total;
}
//need function to run until dealer hits 17
function dealerPlay(){
  //console.log("stand");
  var totalDealer = cardCounter(dealer);
    //console.log(totalDealer);
		while (totalDealer < 17) {

    dealer.push(cards.shift());
    totalDealer = cardCounter(dealer);
    }

  if (totalDealer > 21){
    winner = "player";
    //alert("Dealer has busted");
  }
  totalPlayer = cardCounter(player);
  if (totalPlayer > totalDealer){
    winner = "player";
    getWinner(winner);
  } else if (totalDealer > totalPlayer) {
    winner = "dealer";
    getWinner(winner);
  } else if (totalDealer == totalPlayer){
    alert("It's a tie")}

    }

function getWinner(winner){
  alert(winner + " wins, game over.");
  return false;

}
// BUTTONS
//$('#score').document.write(cardCounter(player));



/*console.log(deck());
console.log(shuffle());
console.log(deal());
console.log(player);
console.log(dealer);
*/
