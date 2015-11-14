var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 7;
var matches = 0;
var attempts =  0;
var accuracy = 0;
var games_played = 0;
var current_time = 45;
var interval;
var audio = new Audio('audio/theme.mp3');
var music_flag = false;

//shows gameboard and stats.
function start() {

    $('.start').addClass('hidden');

    $("#game-area").removeClass('hidden');

    $('.footer').removeClass('hidden');
}
//timer function
function tick() {
    --current_time;
    $('.timer .value').text(" " + current_time);

    //if (current_time <= 10) {
    //
    //}
    if (current_time === 0) {
        turned();
    }
}

$('#game-area').one('click', interval = setInterval(function() {
    tick();
}, 1000));

function resetInterval() {

    clearInterval(interval);

    current_time = 45;

    interval = setInterval(function () {
        tick();
    }, 1000);
}

//randomize cards
$(function () {

    var parent = $('#game-area');

    var divs = parent.children();

    while(divs.length){
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
});

$(document).ready(function(){
    //music play/stop button
    $('.music').on('click', function() {
        $('.music').toggle();
    });

    $('#music').on('click', function(){
        audio.play();
        music_flag = true;
    });

    $('#cisum').on('click', function(){
        audio.pause();
        music_flag = false;
    });


});
//calculate accuracy
function accuracyScore() {

    var accuracy = (matches/ attempts) * 100;

    accuracy = accuracy.toFixed(0);

    if(isNaN(accuracy)) {
        $('.accuracy .value').text(0 + '%');

    } else {
        $('.accuracy .value').text(accuracy + '%');
    }

    //return accuracy + '%';
}

//display stats when called
function display_stats() {

    $('.games-played .value').text(" " + games_played);

    $(".attempts .value").text(" " + attempts);

    accuracyScore();
    // $('.accuracy .value').text(" " + accuracyScore());

    $('.timer .value').text(" " + current_time);
}

//reset statistics
function reset_stats () {

    accuracy = 0;
    matches = 0;
    attempts = 0;

    first_card_clicked = null;
    second_card_clicked = null;
    current_time = 45;

    audio.pause();
    if (music_flag === true) {
        $('.music').toggle();
        music_flag = false;
    }

    display_stats();

    resetInterval();
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
}

function turned() {
    setTimeout(function(){
        //hide game area for pop-up zombie
        $("#game-area").addClass('hidden');
        //hide footer for pop-up zombie
        $('.footer').addClass('hidden');
        //show pop-up zombie
        $(".pop-up").removeClass('hidden');
    },500);

    //reverting classes from previous timeout
    setTimeout(function() {

        $("#game-area").removeClass('hidden');

        $('.footer').removeClass('hidden');

        $(".pop-up").addClass('hidden');

        reset();

    },2000);
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


    } else {
        //saving second card for comparison
        second_card_clicked = the_card;

        //checking for match
        if (first_card_clicked == second_card_clicked) {

            //loss condition
            if(second_card_clicked == 'cardZ') {
                //setTimeout(function(){
                ////hide game area for pop-up zombie
                //$("#game-area").addClass('hidden');
                ////hide footer for pop-up zombie
                //$('.footer').addClass('hidden');
                ////show pop-up zombie
                //$(".pop-up").removeClass('hidden');
                //},500);
                //
                ////reverting classes from previous timeout
                //setTimeout(function() {
                //
                //    $("#game-area").removeClass('hidden');
                //
                //    $('.footer').removeClass('hidden');
                //
                //    $(".pop-up").addClass('hidden');
                //
                //    reset();
                //
                //},2000);
                turned();
             return;
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

            }, 1250);
        }
        attempts++;
        display_stats();
    }
}