'use strict';
/* global httpRequest*/
/* global ready */

(function() {
   var deleteButton = document.getElementById('delete-button');
   var editButton = document.getElementById('edit-button');
   var pollDiv = document.getElementById("pollList");
   var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
   
   var optionsCounter = 0;
   
   function populatePollList(data) {
      var pollsObject = JSON.parse(data);
      
      while(pollDiv.firstChild){
         pollDiv.removeChild(pollDiv.firstChild);
      }
      
      for(var i=0; i<pollsObject.length; i++){
         addOption(pollsObject[i].pollname, pollsObject[i]._id);
      }
   }
   
   function addOption(optionText, optionId){
      var optionDiv = document.createElement("div");
      optionDiv.setAttribute("class", "form-group");
      
      var optionLabel = document.createElement("label");
      optionLabel.setAttribute("for", "option" + optionsCounter);
      optionLabel.appendChild(document.createTextNode(optionText));
      
      var optionInput = document.createElement("input");
      optionInput.setAttribute("type", "radio");
      optionInput.setAttribute("name", "polls");
      optionInput.setAttribute("id", "option" + optionsCounter);
      optionInput.setAttribute("value", optionId);
      
      optionDiv.appendChild(optionInput);
      optionDiv.appendChild(optionLabel);
      pollDiv.appendChild(optionDiv);
      
      optionsCounter++;
   }
   
   function getExistingPolls(){
      httpRequest('GET', pollsApiUrl + "getpolls", null, populatePollList);
   }
   
   ready(getExistingPolls());
   
   editButton.addEventListener('click', function () {
      var selectedPoll = document.querySelector('input[name = "polls"]:checked');
      
      window.location.href = "poll-edit?poll=" + selectedPoll.value;
   }, false);
   
   deleteButton.addEventListener('click', function () {
      var selectedPoll = document.querySelector('input[name = "polls"]:checked');
      
      httpRequest('POST', pollsApiUrl + "deletepoll", {selectedpoll: selectedPoll.value}, function () {
         getExistingPolls();
      });
      
      optionsCounter--;
   }, false);
})();