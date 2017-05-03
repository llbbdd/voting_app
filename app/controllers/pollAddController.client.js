'use strict';

(function() {
   var addOptionButton = document.getElementById('add-option-button');
   var optionListDiv = document.getElementById("optionlist");
   
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
   
   addOptionButton.addEventListener('click', function () {
      optionListDiv.appendChild(document.createTextNode("Option " + (3 + optionsCounter)));
      
      var optionTextInput = document.createElement("input");
      optionTextInput.type = "text";
      optionTextInput.name = "option" + (2 + optionsCounter);
      optionListDiv.appendChild(optionTextInput);
      
      optionListDiv.appendChild(document.createElement("br"));
      
      optionsCounter++;
   }, false);
})();