var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 7;
var matches = 0;
var attempts =  0;
var accuracy = 0;
var games_played = 0;
var time_start = false;
var current_time = 60;
var interval;
var audio = new Audio('audio/theme.mp3');
var music_flag = false;
//var audio_array = [];
var zombie_scare = new Audio('audio/zombie2.mp3');
var win_audio = new Audio('audio/we-are.mp3');
var rick = new Audio('audio/Rick.mp3');
var carl = new Audio('audio/Carl.mp3');
var carol = new Audio('audio/Carol.mp3');
var darryl = new Audio('audio/Darryl.mp3');
var glenn = new Audio('audio/Glenn.mp3');
var maggie = new Audio('audio/Maggie.mp3');
var michonne = new Audio('audio/Michonne.mp3');

//shows gameboard and stats.
function start() {
    $('.start').addClass('hidden');
    $("#game-area").removeClass('hidden');
    $('.footer').removeClass('hidden');
}
//timer function
function tick() {
    --current_time;
    $('.timer .value').html(" " + current_time);

    //if (current_time <= 10  && current_time > 0) {
    //
    //}
    if (current_time === 0) {
        turned();
    }

}

function resetInterval() {
    clearInterval(interval);
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
        audio.currentTime = 0;
        music_flag = false;
    });


});
//calculate accuracy
function accuracyScore() {
    var accuracy = (matches/ attempts) * 100;
    accuracy = accuracy.toFixed(0);

    if(isNaN(accuracy)) {
        $('.accuracy .value').html(0 + '%');

    } else {
        $('.accuracy .value').html(accuracy + '%');
    }

}

//display stats when called
function display_stats() {
    $('.games-played .value').html(" " + games_played);
    $(".attempts .value").html(" " + attempts);
    $('.timer .value').html(" " + current_time);
}

//reset statistics
function reset_stats () {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    current_time = 60;
    first_card_clicked = null;
    second_card_clicked = null;
    time_start = false;

    audio.pause();
    audio.currentTime = 0;
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
    $('.card').removeClass('flip');

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
        audio.pause();
        //hide game area for pop-up zombie
        $("#game-area").addClass('hidden');
        //hide footer for pop-up zombie
        $('.footer').addClass('hidden');
        //show pop-up zombie
        $(".pop-up").removeClass('hidden');
        zombie_scare.play();
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
    accuracyScore();
    //starts count down
    if (time_start === false) {
        interval = setInterval(function() {
            tick();
        }, 1000);
        time_start = true;
    }
    //$(card_element).addClass('.flip');
    $(card_element).parent().addClass('flip');

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
            //audio
            setTimeout(function(){
            switch(the_card) {
                case 'card1':
                    rick.play();
                    break;
                case 'card2':
                    carl.play();
                    break;
                case 'card3':
                    darryl.play();
                    break;
                case 'card4':
                    carol.play();
                    break;
                case 'card5':
                    glenn.play();
                    break;
                case 'card6':
                    maggie.play();
                    break;
                case 'card7':
                    michonne.play();
                    break;
            }
        }, 500);

            //loss condition
            if(second_card_clicked == 'cardZ') {
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

                //hiding the back image
                $("img[card_src='" + first_card_clicked + "']").next('img').addClass('hidden');

                //enabling mouse clicks on the game board
                $('#game-area').removeAttr('style');
            }, 1500);
            //win condition comparison
            if (matches == total_possible_matches) {
                resetInterval();
                setTimeout(function() {
                    audio.pause();
                    //hide game area for pop-up zombie
                    $("#game-area").addClass('hidden');
                    //hide footer for pop-up zombie
                    $('.footer').addClass('hidden');
                    //show safe-zone image and play audio
                    $('.safe-zone').removeClass('hidden');
                    }, 2000);
                setTimeout(function() {
                    $("#game-area").removeClass('hidden');
                    $('.footer').removeClass('hidden');
                    $('.safe-zone').addClass('hidden');
                    win_audio.play();
                    $('.card').removeClass('flip');
                    reset();
                },6500);
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
                $("img[card_src='" + first_card_clicked + "']").next('img').parent().removeClass('flip');

                //removing class of second_card_click
                $(card_element).parent().removeClass('flip');

                //resetting variables for next round of clicking.
                first_card_clicked = null;
                second_card_clicked = null;

                //enabling mouse clicks on the game board
                $('#game-area').removeAttr('style');
            }, 1500);
        }
        attempts++;
        display_stats();
    }
}