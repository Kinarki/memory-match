var firstClicked = null;



function cardClick(cardNumber) {
    var the_card = $('#card' + cardNumber).attr('src');
    if(firstClicked == null) {
        firstClicked = the_card;
    } else if(firstClicked == the_card) {

    }
}
