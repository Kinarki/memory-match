var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

//function to check for card matches
function card_clicked(card_element) {

    //hiding the back image
    $(card_element).addClass('hidden');

    //targeting source for matching
    var the_card = $(card_element).prev().attr('src');

        //checking if a card has been clicked yet
        if(first_card_clicked == null) {

            //saving first card for match comparison
            first_card_clicked = the_card;

        } else {

            //saving second card for comparison
            second_card_clicked = the_card;

            //checking for match
            if(first_card_clicked == second_card_clicked) {

                //incrementing match_counter for win condition comparison
                match_counter++;

                //allot time for player to see that they got a match
                setTimeout(function(){

                    //hides matched pairs
                    $("[src='" + the_card+ "']").addClass('hidden');

                },500);

                //win condition comparison
                if (match_counter == total_possible_matches) {

                    //eric hates this
                    alert('You win!');

                }
                //resetting variables for next round of match finding.
                first_card_clicked = null;
                second_card_clicked = null;

            } else {
                //disable mouse clicks on the game board while two cards are face up
                //works on all browsers save Opera Mini
                $('#game-area').css('pointer-events', 'none');

                //function to reset cards
                setTimeout(function(){

                    //target the back image and removing class of first_card_click
                    $("img[src='" + first_card_clicked + "']").next('img').removeClass('hidden');

                    //removing class of second_card_click
                    $(card_element).removeClass('hidden');

                    //resetting variables for next round of clicking.
                    first_card_clicked = null;
                    second_card_clicked=null;

                    //enabling mouse clicks on the game board
                    $('#game-area').removeAttr('style')
                },2000);

            }

        }
}