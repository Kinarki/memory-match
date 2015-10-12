$(function () {
    // randomize cards
    var parent = $('#game-area');

    var divs = parent.children();

    while(divs.length){
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
});
