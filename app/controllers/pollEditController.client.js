'use strict';
/* global httpRequest */
/* global GetParameters */

(function() {
   var addOptionButton = document.getElementById('add-option-button');
   var optionListDiv = document.getElementById("optionlist");
   var pollNameText = document.getElementById('pollname');
   var pollsApiUrl = 'http://dynamic-web-application-projects-generalwellbeing.c9users.io/api/polls/';
   
   var optionsCounter = 0;
   
   function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function populatePoll(){
      if(GetParameters){
         httpRequest('GET', pollsApiUrl + "getpoll?pollId=" + GetParameters.poll, null, function(pollData){
            var poll = JSON.parse(pollData);
            
            pollNameText.value = poll.pollname;
            
            for(var i=0; i<poll.pollOptions.length; i++){
               addOption(poll.pollOptions[i]);
            }
         });
      }
   }
   
   ready(populatePoll());
   
   addOptionButton.addEventListener('click', function () {
      addOption("");
   }, false);
                    
   function addOption(optionText){
      var optionDiv = document.createElement("div");
      optionDiv.setAttribute("class", "form-group");
      
      var optionLabel = document.createElement("label");
      optionLabel.setAttribute("for", "option" + optionsCounter);
      optionLabel.appendChild(document.createTextNode("Option " + (optionsCounter + 1) + ":"));
      
      var optionInput = document.createElement("input");
      optionInput.setAttribute("type", "text");
      optionInput.setAttribute("class", "form-control");
      optionInput.setAttribute("name", "option" + optionsCounter);
      optionInput.setAttribute("id", "option" + optionsCounter);
      optionInput.value = optionText;
      
      optionDiv.appendChild(optionLabel);
      optionDiv.appendChild(optionInput);
      optionListDiv.appendChild(optionDiv);
      
      optionsCounter++;
   }
})();