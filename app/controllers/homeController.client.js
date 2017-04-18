'use strict';
/* global httpRequest*/

(function() {
   var pollDiv = document.getElementById("pollList");
   var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
   
   function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function populatePollList(data) {
      var pollsObject = JSON.parse(data);
      var docfrag = document.createDocumentFragment();
      
      while(pollDiv.firstChild){
         pollDiv.removeChild(pollDiv.firstChild);
      }
      
      for(var i=0; i<pollsObject.length; i++){
        var link = document.createElement("a");
        var linkText = document.createTextNode(pollsObject[i].pollname);
        link.appendChild(linkText);
        link.href = 'poll-choice?' + pollsObject[i]._id;
        link.name = "polls";

        docfrag.appendChild(link);
        docfrag.appendChild(document.createElement("br"));
      }
      
      pollDiv.appendChild(docfrag);
   }
   
   function getExistingPolls(){
      httpRequest('GET', pollsApiUrl + "getpolls", null, populatePollList);
   }
   
   ready(getExistingPolls());
})();