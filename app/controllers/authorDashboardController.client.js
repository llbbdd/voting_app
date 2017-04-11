'use strict';

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
   
   function ajaxRequest(method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
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
   
   ready(ajaxRequest('GET', pollsApiUrl, populateDropdown));
   
   addButton.addEventListener('click', function () {
      window.location.href = "poll-add.html";

   }, false);
   
   deleteButton.addEventListener('click', function () {
      ajaxRequest('DELETE', pollsApiUrl, function () {
         ajaxRequest('GET', pollsApiUrl, populateDropdown);
      });

   }, false);
})();