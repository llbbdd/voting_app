'use strict';
/* global httpRequest*/

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
   
   var QueryString = function () {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      
      for (var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         
         if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
         } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
         } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
         }
      }
      
      return query_string;
   }();
   
   function getExistingPoll(pollId, callback){
      httpRequest('POST', pollsApiUrl + "getpoll", {pollId: pollId}, callback);
   }
   
   function populatePoll(){
      if(QueryString){
         getExistingPoll(QueryString.poll, function(pollData){
            var poll = JSON.parse(pollData);
            
            pollNameText.value = poll.pollname;
            
            for(var i=0; i<poll.pollOptions.length; i++){
               if(i>1){
                  addOption();
               }
               
               document.getElementById('option' + i).value = poll.pollOptions[i];
            }
         });
      }
   }
   
   ready(populatePoll());
   
   addOptionButton.addEventListener('click', function () {
      addOption();
      optionsCounter++;
   }, false);
   
   function addOption(){
      optionListDiv.appendChild(document.createTextNode("Option " + (3 + optionsCounter)));
      
      var optionTextInput = document.createElement("input");
      optionTextInput.type = "text";
      optionTextInput.name = "option" + (2 + optionsCounter);
      optionTextInput.id = "option" + (2 + optionsCounter);
      optionListDiv.appendChild(optionTextInput);
      
      optionListDiv.appendChild(document.createElement("br"));
   }
})();