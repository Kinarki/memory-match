var firstClicked = null;
var secondClicked = null;

function cardClick(card_element) {
    $(card_element).addClass('hidden');
    var the_card = $(card_element).prev().attr('src');

        if(firstClicked == null) {

            firstClicked = the_card;
            console.log(firstClicked);

        } else {

            secondClicked = the_card;

            if(firstClicked == secondClicked) {
                //hide cards
                console.log('match');

                firstClicked = null;
                secondClicked = null;

            } else {
                //reset
                firstClicked = null;
                secondClicked=null;
            }
        }
}