'use strict';
/* global httpRequest*/

(function() {
   var addButton = document.getElementById('add-button');
   var deleteButton = document.getElementById('delete-button');
   var select = document.getElementById("existing-poll-list");
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
   
   function populateDropdown(data) {
      var pollsObject = JSON.parse(data);
      var docfrag = document.createDocumentFragment();
      
      for(var i=0; i<pollsObject.length; i++){
         var optionElement = document.createElement("option");
         
         optionElement.value = i;
         optionElement.text = pollsObject[i].pollname;
         docfrag.appendChild(optionElement);
      }
      
      select.appendChild(docfrag);
   }
   
   function getExistingPolls(){
      httpRequest('GET', pollsApiUrl + "getpolls", null, populateDropdown);
   }
   
   ready(getExistingPolls());
   
   addButton.addEventListener('click', function () {
      window.location.href = "poll-add.html";

   }, false);
   
   deleteButton.addEventListener('click', function () {
      var selectedPoll = document.getElementById("existing-poll-list");
      
      httpRequest('POST', pollsApiUrl + "deletepoll", {selectedpoll: selectedPoll.value}, function () {
         getExistingPolls();
      });
      
   }, false);
})();