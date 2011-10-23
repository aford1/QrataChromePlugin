//Content script for Qrata Extension



function showRatings() {

    console.log("showRatings called");
    
    var results = $('.vsc').get();
    console.log("results: "+results.length);
   
    //Create new html elements for our ratings and append them to the vsc classes
    for(var i=0; i<results.length; i++){
        var rating = $("<div/>", {
            "id": i,
            "class": "qRataRating",
            //rating will go here*********************************************************************
            text: "100"
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
        qrataPopup(event.target.id);
    });
    //mouse has left the rating icon
    $(".qRataRating").mouseout(function(){
        leavePopup();
    });
}


//When the dom finishes loading, run the showRatings function
$(document).ready(function() {
    showRatings();
});

//this popup window appears when the user mouses over the qrata rating
function qrataPopup(id){
    $("#"+id+".qRataRating").css("background-color","lime");
    
    //create a new html element for our popup
    $("<div/>", {
        "class": "qrataPopup",
        text: "QRata Rating for id: "+id
    }).appendTo('body');
    //add the css for the html element
    var position = $("#"+id+".qRataRating").position();
    $(".qrataPopup").css({
        "background-color":"black", 
        "height":"500px", 
        "width":"400px", 
        "color":"white",
        "position":"absolute",
        "left":position.left+25,
        "top":position.top,
        "z-index":"5002"
    });
}
//when the users mouse leaves the rating, hide the popup
function leavePopup(){
    $(".qRataRating").css("background-color","green");  
    $(".qrataPopup").remove();
}