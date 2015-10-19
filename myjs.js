var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 7;
var matches = 0;
var attempts =  0;
var accuracy = 0;
var games_played = 0;


//randomize cards
$(function () {

    var parent = $('#game-area');

    var divs = parent.children();

    while(divs.length){
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
});

//calculate accuracy
function accuracyScore() {
    var accuracy = (matches/ attempts) * 100;

    accuracy = accuracy.toFixed(2);

    return accuracy + '%';
}

//display stats when called
function display_stats() {

    $('.games-played .value').html(" " + games_played);

    $(".attempts .value").html(" " + attempts);

    $('.accuracy .value').html(" " +  accuracyScore());
}

//reset statistics
function reset_stats () {

    accuracy = 0;
    matches = 0;
    attempts = 0;

    display_stats();

}

// reset button
function reset(){

    games_played++;

    $('.front').removeClass('hidden');

    $('.back').removeClass('hidden');

    $(function () {

        var parent = $('#game-area');

        var divs = parent.children();

        while(divs.length){
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });

    reset_stats();

    //display_stats();
}

//function to check for card matches
function card_clicked(card_element) {

    //hiding the back image
    $(card_element).addClass('hidden');

    //targeting source for matching
    var the_card = $(card_element).prev().attr('card_src');

    //checking if a card has been clicked yet
    if (first_card_clicked == null) {

        //saving first card for match comparison
        first_card_clicked = the_card;

        return;

    } else {
        //saving second card for comparison
        second_card_clicked = the_card;

        attempts++;


        //checking for match
        if (first_card_clicked == second_card_clicked) {

            if(second_card_clicked == 'cardZ') {
                alert('Game over.  You\'ve been turned!');
                setTimeout(function() {
                    $('.front').removeClass('hidden');

                    $('.back').removeClass('hidden');

                    reset();
                },1500);

            }


            //disable mouse clicks on the game board while two cards are face up
            //works on all browsers save Opera Mini
            $('#game-area').css('pointer-events', 'none');

            //incrementing matches for win condition comparison
            matches++;

            //allot time for player to see that they got a match
            setTimeout(function () {

                //hides matched pairs
                $("[card_src='" + the_card + "']").addClass('hidden');

                //enabling mouse clicks on the game board
                $('#game-area').removeAttr('style');

            }, 500);

            //win condition comparison
            if (matches == total_possible_matches) {

                //eric hates this
                alert('You win!');

                setTimeout(function() {
                    $('.front').removeClass('hidden');

                    $('.back').removeClass('hidden');

                    reset();
                },1500);

            }
            //resetting variables for next round of match finding.
            first_card_clicked = null;
            second_card_clicked = null;

            return;

        } else {
            //disable mouse clicks on the game board while two cards are face up
            //works on all browsers save Opera Mini
            $('#game-area').css('pointer-events', 'none');


            //function to reset cards
            setTimeout(function () {

                //target the back image and removing class of first_card_click
                $("img[card_src='" + first_card_clicked + "']").next('img').removeClass('hidden');

                //removing class of second_card_click
                $(card_element).removeClass('hidden');

                //resetting variables for next round of clicking.
                first_card_clicked = null;
                second_card_clicked = null;

                //enabling mouse clicks on the game board
                $('#game-area').removeAttr('style');

                return;
            }, 1250);
        }
        display_stats();
    }
}