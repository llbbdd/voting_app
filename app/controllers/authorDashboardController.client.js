'use strict';
/* global httpRequest*/

(function() {
   var addButton = document.getElementById('add-button');
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
   
   addButton.addEventListener('click', function () {
      var newPollName = document.getElementById("newpoll");
      
      httpRequest('POST', pollsApiUrl + "addpoll", {selectedpoll: newPollName.value}, function () {
         getExistingPolls();
      });
   }, false);
   
   editButton.addEventListener('click', function () {
      window.location.href = "poll-edit.html";
   }, false);
   
   deleteButton.addEventListener('click', function () {
      var selectedPoll = document.querySelector('input[name = "polls"]:checked');
      
      httpRequest('POST', pollsApiUrl + "deletepoll", {selectedpoll: selectedPoll.value}, function () {
         getExistingPolls();
      });
      
   }, false);
})();