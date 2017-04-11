'use strict';

(function() {
   var addButton = document.querySelector('.btn-add');
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
   
   function ajaxRequest(method, url, postParams, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      
      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };
      
      xmlhttp.send(JSON.stringify(postParams));
   }
   
   /*function populateDropdown(data) {
      var pollsObject = JSON.parse(data);
      
      pollsObject.forEach(function(poll) {
         console.log(poll);
      });
      //clickNbr.innerHTML = clicksObject.clicks;
   }*/
   
   //ready(ajaxRequest('GET', pollsApiUrl, populateDropdown));
   
   addButton.addEventListener('click', function () {
      var newPollName = document.getElementById('pollName').value;
      var options = [];
      var i=0;
      
      do{
         options.push(document.getElementById('option' + i).value);
         i++;
      }while(document.getElementById('option' + i) !== null);
      
      ajaxRequest('POST', pollsApiUrl, {pollname: newPollName, polloptions: options}, function () {
         window.location.href = "/";
      });

   }, false);
})();