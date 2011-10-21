//Content script for Qrata Extension



function showRatings() {

    //alert("showRatings called");
    //Set the margin between search results to 0
    $(".g").css("margin-bottom","0");
    //$("vsc").css("z-index","5001");
    // var listNodes = document.getElementById('ires').childNodes[1].childNodes;
    //alert(listNodes.length);
    var gClasses = $('.g').get();
    //alert(gClasses.length);
   
    //Create new html elements for our ratings and append them to the vsc classes
    for(var i=0; i<gClasses.length; i++){
        $("<div/>", {
            "id": i,
            "class": "qRataRating",
            text: "QRata Rating:"
        }).appendTo(gClasses[i]);
    }
   
    //change the css for our html element
    $(".qRataRating").css({
        "background-color":"black", 
        "height":"16px", 
        "width":"120px", 
        "color":"white"
    });
    //give the elements some mousover event and mouse out events
    $(".qRataRating").mouseover(function(event){
        qrataPopup(event.target.id);
    });
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
    $("#"+id+".qRataRating").css("background-color","grey");
    
    //create a new html element for our popup
    $("<div/>", {
        "class": "qrataPopup",
        text: "QRata Rating for id: "+id
    }).appendTo("body");
    //add the css for the html element
    var position = $("#"+id+".qRataRating").position();
    $(".qrataPopup").css({
        "background-color":"black", 
        "height":"200px", 
        "width":"500px", 
        "color":"white",
        "position":"absolute",
        "left":position.left,
        "top":position.top+195,
        "z-index":"5002"
    });
}
//when the users mouse leaves the rating, hide the popup
function leavePopup(){
    $(".qRataRating").css("background-color","black");  
    $(".qrataPopup").remove();
}