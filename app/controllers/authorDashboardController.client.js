'use strict';
/* global httpRequest*/

(function() {
   var deleteButton = document.getElementById('delete-button');
   var editButton = document.getElementById('edit-button');
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
         var optionRadioInput = document.createElement("input");
         optionRadioInput.type = "radio";
         optionRadioInput.value = pollsObject[i]._id;
         optionRadioInput.name = "polls";

         docfrag.appendChild(optionRadioInput);
         docfrag.appendChild(document.createTextNode(pollsObject[i].pollname));
         docfrag.appendChild(document.createElement("br"));
      }
      
      pollDiv.appendChild(docfrag);
   }
   
   function getExistingPolls(){
      httpRequest('GET', pollsApiUrl + "getpolls", null, populatePollList);
   }
   
   ready(getExistingPolls());
   
   editButton.addEventListener('click', function () {
      var selectedPoll = document.querySelector('input[name = "polls"]:checked');
      
      window.location.href = "poll-edit.html?poll=" + selectedPoll.value;
   }, false);
   
   deleteButton.addEventListener('click', function () {
      var selectedPoll = document.querySelector('input[name = "polls"]:checked');
      
      httpRequest('POST', pollsApiUrl + "deletepoll", {selectedpoll: selectedPoll.value}, function () {
         getExistingPolls();
      });
      
   }, false);
})();