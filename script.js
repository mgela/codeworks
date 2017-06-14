
// global variables
////////////////////////////////////////////////////////////////////////////////
let cards = [];
let player = [];
let dealer = [];
let winner = "";
////////////////////////////////////////////////////////////////////////////////

function card(name, suit, cssClass){

	this.name = name;
	this.suit = suit;
  this.cssClass = suit + "_" + name;
}







// deck creation, will return array of 52 cards in order.
// shuffle it afterwards
function deck(){
  //console.log("asdasd");
	// disable buttons so we don't hit before we deal. (error)
  $('#hit').removeAttr('disabled');
  $('#stand').removeAttr('disabled');
  $('#double').removeAttr('disabled');

	var cardClass = cards;
	$(this).addClass(cardClass);

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
//console.log(deck()[1]);


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
		 console.log(player.length);
$('#player'+ player.length).addClass(player[player.length-1].cssClass);
  //console.log("hello");

setTimeout(

 function(){
	 var totalPlayer = cardCounter(player);
	 $('#playerCounter').html(totalPlayer);
		if (totalPlayer > 21){
			winner = "dealer";
			getWinner(winner);

		//  console.log("Player has busted");
		}

 },
 1000
 );}

 /*var totalPlayer = cardCounter(player);
  if (totalPlayer > 21){
    winner = "dealer";
    getWinner(winner);*/

  //  console.log("Player has busted");


// deals 2 cards only and populates global var player and dealer.
//1 card must be flipped (pending)
function deal() {

  var temp;
  if (cards.length > 0){
    dealer = cards.splice(0,2);
    player = cards.splice(0,2);
console.log(dealer[0].cssClass);
$('#dealer1').addClass('cardBack')
$('#dealer2').addClass(dealer[1].cssClass)
$('#player1').addClass(player[0].cssClass)
$('#player2').addClass(player[1].cssClass)
$('#playerCounter').html(cardCounter(player))
$('#dealerCounter').html(cardCounter(dealer))



	setTimeout(
		function(){
			if (cardCounter(player) == 21){
		 	 alert("BLACKJACK");
			reset();
			return false;
		}
	}, 1000
	);
  }

}


//count K/Q/J as 10, and count A as 11 if total is less than 11.
// if total is > 11, another 11 would total 22 (bust)
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
//function will run on Stand.
// dealer must keep drawing until he hits 17.
function dealerPlay(){
  //console.log("stand");
	$('#dealer1').addClass(dealer[0].cssClass)

  var totalDealer = cardCounter(dealer);
    //console.log(totalDealer);
		while (totalDealer < 17) {

    dealer.push(cards.shift());
$('#dealer'+ dealer.length).addClass(dealer[dealer.length-1].cssClass);
    totalDealer = cardCounter(dealer);
		$('#dealerCounter').html(totalDealer);
    }
		setTimeout(

		 function(){
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


		 },
		 1000
		 );}
/*  if (totalDealer > 21){
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

	}*/

function getWinner(winner){
	if (!alert(winner + " wins, game over.")){
		reset()
	}

  //alert(winner + " wins, game over.");
  return false;

}

function double(){


	if (cards.length > 0)
     player.push(cards.shift());
		// console.log(player.length);
$('#player'+ player.length).addClass(player[player.length-1].cssClass);
  //console.log("hello");
	$('#dealer1').addClass(dealer[0].cssClass)

	var totalDealer = cardCounter(dealer);
		if (cardCounter(player) > 21){
			setTimeout(function(){
				alert("Dealer wins")
				reset();

			},1000);
			return false;
		}
		while (totalDealer < 17) {

		dealer.push(cards.shift());
	$('#dealer'+ dealer.length).addClass(dealer[dealer.length-1].cssClass);
		totalDealer = cardCounter(dealer);
		$('#dealerCounter').html(totalDealer);

	}
	setTimeout(

	 function(){
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


	 },
	 1000
	 );


}

function reset(){
	playerCards = 0;
	dealerCards = 0;
	totalPlayer = 0;
	totalDealer = 0;
	$("#dealer1").removeClass();
	$("#dealer2").removeClass();
	$("#dealer3").removeClass();
	$("#dealer4").removeClass();
	$("#dealer5").removeClass();
	$("#player1").removeClass();
	$("#player2").removeClass();
	$("#player3").removeClass();
	$("#player4").removeClass();
	$("#player5").removeClass();
	$("#playerCounter").html(0);
	$("#dealerCounter").html(0);
}
