//Content script for Qrata Extension

//When the dom finishes loading, run the showRatings function
$(document).ready(function() {
    timeout = setTimeout(showRatings, 2000);  
});

var timeout;
//Catch the search ajax call and show our ratings
$("#tsf").submit(function(){
    console.log("submit event triggered for search form");
    $(".qRataRating").remove();
    $(document).ready(function() {
        timeout = setTimeout(showRatings, 2000);  
    });
})

//if the user pressed enter inside the search form, run the ratings
$("#tsf").change(function(){  
    console.log("change event triggered for search form");
    $(".qRataRating").remove();
    $(document).ready(function() {
        timeout = setTimeout(showRatings, 2000);  
    });
});

//reload the plugin when the user moves to the next page of the search
$(document).delegate("#pnnext", "click", function(){ 
    console.log("next button pressed");
    $(".qRataRating").remove();
 
    timeout = setTimeout(showRatings, 2000);  
});

//reload the plugin when the user moves to a different page of the search
$(document).delegate(".fl", "click", function(){ 
    console.log("different page selected");
    $(".qRataRating").remove();
 
    timeout = setTimeout(showRatings, 2000);  
});

//global variables to manage the status of the popup
var onPopup = false;
var onRating = false;
var popupExists = false;
var timeoutID;
var ratingColor;
var currentRatingID;


//***************************************************************************************************
//This function shows rating icons for each google search result
function showRatings() {
    console.log("showRatings called");
    
    //get the result elements and store them in a variable
    var g = $('li.g').not('#lclbox, #newsbox').get();
    console.log("g: "+g.length);
    
   
    var sites = new Array(100);
   
    //Create new html elements for each rating and append them to the proper elements
    for(var i=0; i<g.length; i++){
        var vsc = g[i].childNodes[0];
        if(vsc.className == "vsc"){
            if(vsc.childNodes[0].className == "r"){
                var vspib = g[i].childNodes[0].childNodes[1];
                sites[i] = g[i].childNodes[0].childNodes[2].childNodes[0].childNodes[0];
            
                var position = $(vspib).position();
     
                console.log("site: "+sites[i].textContent);
                console.log("vspib positon: "+position.left+"   "+position.top);
            
                //simulate different ratings by getting a random number for a rating
                var rating = Math.floor(Math.random()*11);
                console.log("rating: "+rating);
                if(rating >= 8){
                    ratingColor = "green";
                }
                else if(rating >= 6){
                    ratingColor = "#CD8500";
                }
                else{
                    ratingColor = "#CD0000";
                }


                //Append the rating to one of googles html elements
                $("<div/>", {
                    "id": i,
                    "class": "qRataRating",
            
                    //********rating will go here********
                    text: rating
                //**********************************
            
                }).appendTo(vsc);
                //set the css for our html element
                $("#"+i+".qRataRating").css({
                    "font-size":"20px",
                    "position":"absolute",
                    "left":position.left+10,
                    "top":position.top,
                    "z-index":"5002",
                    "background-color":ratingColor, 
                    "opacity":".6",
                    "height":"25px", 
                    "width":"27px", 
                    "color":"white"
                });
            }
        }
    }
   
    //give the elements some mousover event and mouse out events
    $(".qRataRating").mouseover(function(event){
        //console.log("mouseover event for Rating fired");
        if (onPopup || onRating) {
            return false;
        }
        
        //close any existing popup that may be open
        leavePopup();
        onRating = true;
        currentRatingID = event.target.id;
        ratingColor = $("#"+currentRatingID+".qRataRating").css("background-color");
        qrataPopup(currentRatingID, sites[event.target.id].textContent);
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

    $("#"+id+".qRataRating").css("background-color","black");
    
    //create a new html element for our popup
    $("<div/>", {
        "class": "qrataPopup",
        text: "QRata Rating for: "+site
    }).mouseover(keepOpen).mouseout(letClose).appendTo('body');
    //add the css for the html element
    var position = $("#search").position();
    $(".qrataPopup").css({
        "background-color":"black", 
        "height":"500px", 
        "width":"456px", 
        "color":"white",
        "position":"absolute",
        "left":position.left+565,
        "top":window.screenTop+window.pageYOffset+100,
        "z-index":"5002",
        "overflow":"hidden"
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
    $("#"+currentRatingID+".qRataRating").css("background-color",ratingColor);  
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