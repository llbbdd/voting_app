'use strict';

function httpRequest(method, url, postParams, callback) {
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
        }
    };
    
    xmlhttp.send(JSON.stringify(postParams));
}