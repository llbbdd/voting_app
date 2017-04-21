'use strict';
/* global httpRequest*/

(function() {
   var pollId = findGetParameter("pollId");
   window.alert(pollId);
   var pollName = document.getElementById("pollName");
   var pollDiv = document.getElementById("pollOptions");
   var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
   
   function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = window.location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

   function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function populatePoll(data) {
      var pollObject = JSON.parse(data);
      var pollName = pollObject.name;
      var pollOptions = pollObject.options;
      var docfrag = document.createDocumentFragment();
      
      while(pollDiv.firstChild){
         pollDiv.removeChild(pollDiv.firstChild);
      }
      
      for(var i=0; i<pollOptions.length; i++){
         var optionRadioInput = document.createElement("input");
         optionRadioInput.type = "radio";
         optionRadioInput.value = i;
         optionRadioInput.name = "pollOption";

         docfrag.appendChild(optionRadioInput);
         docfrag.appendChild(document.createTextNode(pollOptions[i]));
         docfrag.appendChild(document.createElement("br"));
      }
      
      pollDiv.appendChild(docfrag);
   }
   
   function getPoll(){
      httpRequest('GET', pollsApiUrl + "getpoll", null, populatePoll);
   }
   
   ready(getPoll());
})();