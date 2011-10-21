//Content script for Qrata Extension



function showRatings() {

    var Ratings_dom = document.createElement('div');
    var link_dom = document.createElement('img');
    link_dom.setAttribute('src', "http://profile.ak.fbcdn.net/hprofile-ak-snc4/50416_179682112479_2087232_n.jpg");
    link_dom.setAttribute('href', "www.google.com");
    Ratings_dom.appendChild(link_dom);
        
    /**var childNode = document.getElementById("ires").childNodes[1];
    var listNodes1 = document.getElementById('ires').childNodes[1].childNodes[1];
    var listNodes2 = document.getElementById('ires').childNodes[1].childNodes[2];
    alert(listNodes1.toString());
     alert(listNodes2.toString());
    var x = document.createTextNode(' A new text node has been appended!');
    var y = document.createTextNode(' A new text node has been appended!');
    listNodes1.appendChild(x);
    listNodes2.appendChild(y);
    */
   
    var listNodes = document.getElementById('ires').childNodes[1].childNodes;
    alert(listNodes.length);
    for(var i=1; i<listNodes.length; i++) {
        listNodes[i].appendChild(document.createTextNode(' A new text node has been appended!'));
    }
   

    //alert (childNode.firstChild.firstChild.toString());
    /**
    Ratings_dom.style.cssText = [
    'background-color: #ffd700;',
    'background-image: -webkit-repeating-linear-gradient(' +
    '45deg, transparent, transparent 35px,' +
    'rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 50px);',
    'color: #000;',
    'padding: 10px;',
    'font: 14px Arial;'
    ].join(' ');
    */
    document.body.style.cssText = 'position: relative';
   
    document.body.parentElement.insertBefore(Ratings_dom, document.body);
   
};


//When the dom finishes loading, run the showRatings function
$(document).ready(function() {
    showRatings();
});

