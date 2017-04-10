'use strict';

(function() {
   var addButton = document.querySelector('.btn-add');
   var resetButton = document.querySelector('.btn-delete');
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
      
      pollsObject.forEach(function(poll) {
         console.log(poll);
      });
      //clickNbr.innerHTML = clicksObject.clicks;
   }
   
   ready(ajaxRequest('GET', pollsApiUrl, populateDropdown));
   
   addButton.addEventListener('click', function () {
      ajaxRequest('POST', pollsApiUrl, function () {
         ajaxRequest('GET', pollsApiUrl, populateDropdown);
      });

   }, false);
   
   resetButton.addEventListener('click', function () {
      ajaxRequest('DELETE', pollsApiUrl, function () {
         ajaxRequest('GET', pollsApiUrl, populateDropdown);
      });

   }, false);
})();