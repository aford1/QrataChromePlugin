//Content script for Qrata Extension
/**
$(document).ready(function() {
    showRatings();
});

$("#tsf").submit(function() {
    showRatings();
});
*/


function showRatings() {
    alert("showRatings called");

    //Locate the list nodes of the google search and append an html element to each.
    var listNodes = document.getElementById('ires').childNodes[1].childNodes;
    var ratingsBox = new Array();
    for(var i=1; i<listNodes.length; i++) {      
        ratingsBox[i] = document.createElement('a');
        ratingsBox[i].setAttribute('href', "www.google.com");
        //listNodes[i].appendChild(document.createTextNode(' A new text node has been appended!'));
        //listNodes[i].appendChild(ratingsBox[i]);
        $(listNodes[i]).append("Rating for this result Here!");
    }
    
};



