//Content script for Qrata Extension

//When the dom finishes loading, run the showRatings function
$(document).ready(function() {
    showRatings();
});

var timeout;
//Catch the search ajax call and show our ratings
$("#tsf").submit(function(){
    console.log("submit event triggered for search form");
    $(".qRataRating").remove();
    $(document).ready(function() {
       showRatings();
    });
})

//if the user pressed enter inside the search form, run the ratings
$("#tsf").change(function(e){
    
    console.log("change event triggered for search form");
    $(".qRataRating").remove();
    $(document).ready(function() {
        timeout = setTimeout(showRatings, 5000);  
    });
});

//global variables to manage the status of the popup
var onPopup = false;
var onRating = false;
var popupExists = false;
var timeoutID;


//***************************************************************************************************
//This function shows rating icons for each google search result
function showRatings() {
    console.log("showRatings called");
    
    //get the result elements and store them in a variable
    var results = $('.vsc').get();
    var sites = $('.l').get();
    //console.log("results: "+results.length);
    
   
    //Create new html elements for each rating and append them to the proper elements
    for(var i=0; i<sites.length; i++){
        //console.log(sites[i].href);
        $("<div/>", {
            "id": i,
            "class": "qRataRating",
            
            //********rating will go here********
            text: 100
            //**********************************
            
        }).appendTo("#center_col");
        //get the position of this vsc element
        var vscPosition = $(results[i]).position();
        $("#"+i+".qRataRating").css({
            "font-size":"16px",
            "position":"absolute",
            "left":vscPosition.left+518,
            "top":vscPosition.top-2,
            "z-index":"5002"
        });
    }
   
    //change the css for our html element
    $(".qRataRating").css({
        "background-color":"green", 
        "opacity":".6",
        "height":"25px", 
        "width":"28px", 
        "color":"white"
    });
   
    //give the elements some mousover event and mouse out events
    $(".qRataRating").mouseover(function(event){
        //console.log("mouseover event for Rating fired");
        if (onPopup || onRating) {
            return false;
        }
        onRating = true;
        qrataPopup(event.target.id, sites[event.target.id].href);
    }).mouseout(function(){
        //console.log("mousout event for Rating fired");
        onRating = false;
        timeoutID = setTimeout(leavePopup, 500);
        //console.log("onPopup: "+onPopup+"   onRating: "+onRating);
    });

}

//********************************************************************************************
//this popup window appears when the user mouses over the qrata rating
function qrataPopup(id, site){

    if(popupExists){
        leavePopup();
    }

    $("#"+id+".qRataRating").css("background-color","lime");
    
    //create a new html element for our popup
    $("<div/>", {
        "class": "qrataPopup",
        text: "QRata Rating for: "+site
    }).mouseover(keepOpen).mouseout(letClose).appendTo('body');
    //add the css for the html element
    var position = $("#"+id+".qRataRating").position();
    $(".qrataPopup").css({
        "background-color":"black", 
        "height":"500px", 
        "width":"400px", 
        "color":"white",
        "position":"absolute",
        "left":position.left+28,
        "top":position.top,
        "z-index":"5002"
    });
    popupExists=true;
}

//***********************************************************************************************
//Functions to manage whether to keep the popup open or not
function keepOpen() {
    onPopup = true;
    //console.log("onPopup is true");
}
function letClose() {
    onPopup = false;
    timeoutID = setTimeout(leavePopup, 500);
}
//***********************************************************************************************
//if the users mouse leaves the rating and the popup, then remove the popup
function leavePopup(){
    $(".qRataRating").css("background-color","green");  
    clearTimeout(timeoutID);
    //if the popup exists and the users mouse isn't on the rating or the popup, then remove the popup
    if (popupExists && !onRating && !onPopup) {
        $(".qrataPopup").remove();
        popupExists = false;
    }
    
}
//***********************************************************************************************

function addRateButton(){
    
}